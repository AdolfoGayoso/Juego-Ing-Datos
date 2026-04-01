import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import { KEYS } from '../utils/keys'; // Asegúrate de tener las rutas correctas

export default class GestureManager {
    constructor(scene) {
        this.scene = scene;
        this.gestureRecognizer = null;
        this.video = null;

        // Variables de suavizado
        this.smoothedX = this.scene.scale.width / 2;
        this.smoothedY = this.scene.scale.height / 2;
        this.smoothingFactor = 0.2;

        this.wasPinching = false;
        this.isReloadingAction = false;

        this.init();
    }

    async init() {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                // Asegúrate de tener este archivo en tu carpeta public/
                modelAssetPath: "/mediapipe/gesture_recognizer.task",
                delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 1
        });

        this.createHiddenVideo();
    }

    createHiddenVideo() {
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', '');
        this.video.setAttribute('playsinline', '');
        // Ocultamos el video para que no se vea en el HTML del juego
        this.video.style.display = 'none';
        document.body.appendChild(this.video);

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.video.srcObject = stream;
                this.video.addEventListener("loadeddata", () => this.predictWebcam());
            })
            .catch(err => console.error("Error accediendo a la cámara:", err));
    }

    async predictWebcam() {
        if (!this.gestureRecognizer || !this.video) return;

        const results = this.gestureRecognizer.recognizeForVideo(this.video, Date.now());

        if (results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];

            const isReloading = this.detectReloading(landmarks);
            const isAiming = this.detectOpenPalm(landmarks);

            if (isAiming && !isReloading) {
                if (this.isReloadingAction) {
                    this.isReloadingAction = false;
                    this.scene.events.emit('GESTURE_STOP_RELOAD');
                }
                this.handleAiming(landmarks);
                this.handleShooting(landmarks);
            } else if (isReloading) {
                if (!this.isReloadingAction) {
                    this.isReloadingAction = true;
                    this.scene.events.emit('GESTURE_START_RELOAD');
                }
                this.wasPinching = false;
            }
        } else {
            // Si no hay manos, interrumpimos recarga si estaba ocurriendo
            if (this.isReloadingAction) {
                this.isReloadingAction = false;
                this.scene.events.emit('GESTURE_STOP_RELOAD');
            }
            this.wasPinching = false;
        }

        // Bucle continuo
        requestAnimationFrame(() => this.predictWebcam());
    }

    detectOpenPalm(landmarks) {
        const fingers = [8, 12, 16, 20];
        for (let tip of fingers) {
            const mcp = tip - 3;
            if (landmarks[tip].y > landmarks[mcp].y) return false;
        }
        return true;
    }

    detectReloading(landmarks) {
        const fingers = [8, 12, 16, 20];
        for (let tip of fingers) {
            const mcp = tip - 3;
            if (landmarks[tip].y < landmarks[mcp].y) return false;
        }
        return true;
    }

    handleAiming(landmarks) {
        const middleTip = landmarks[12];
        const wrist = landmarks[0];

        // Promedio para estabilidad
        let normalizedX = (middleTip.x + wrist.x) / 2;
        let normalizedY = (middleTip.y + wrist.y) / 2;

        // Mapear coordenadas de MediaPipe (0 a 1) al tamaño del juego en Phaser
        // Invertimos la X (1 - normalizedX) para hacer el efecto espejo de la cámara
        const targetX = (1 - normalizedX) * this.scene.scale.width;
        const targetY = normalizedY * this.scene.scale.height;

        this.smoothedX = targetX * this.smoothingFactor + this.smoothedX * (1 - this.smoothingFactor);
        this.smoothedY = targetY * this.smoothingFactor + this.smoothedY * (1 - this.smoothingFactor);

        this.scene.events.emit('GESTURE_AIM', { x: this.smoothedX, y: this.smoothedY });
    }

    handleShooting(landmarks) {
        const thumb = landmarks[4];
        const index = landmarks[8];

        const dx = thumb.x - index.x;
        const dy = thumb.y - index.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const isPinching = distance < 0.05; // Umbral de disparo

        if (!this.wasPinching && isPinching) {
            this.scene.events.emit('GESTURE_SHOOT');
        }

        this.wasPinching = isPinching;
    }
}