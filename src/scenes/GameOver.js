import Base from './Base';
import { ASSETS } from '../utils/assets-paths';
import { KEYS } from '../utils/keys';
import { scoreApi } from '../utils/api/score-service';

import InputText from '../ui-utils/InputText';
import { TextStyles } from '../ui-utils/TextStyles';

export default class GameOver extends Base {

    skullImage;
    nameInput;
    uploadMessage;
    isUploading;

    constructor() {
        super(KEYS.SCENES.GAME_OVER);
    }

    init(data) {
        this.stats = data.stats;
    }

    create() {
        super.create();
        this.addBackground(ASSETS.BACKGROUNDS.GAME_OVER.KEY);
        this.input.setDefaultCursor('default');

        // this.setupInputText();
        this.setupButtons();
        this.setupMessages();

        this.skullImage = this.add.image(this.width * 0.78, this.height * 0.5, ASSETS.BUTTONS.GAME_OVER.SKULL_OFF.KEY).setOrigin(0.5);

        this.displayStats();
        this.isUploading = false;
    }

    // setupInputText() {
    //     const uploadScoreY = this.height * 0.845;
    //     const lastUsername = localStorage.getItem(KEYS.LOCAL_STORAGE.LAST_USERNAME) || '';

    //     this.nameInput = new InputText(this, this.width * 0.155, uploadScoreY, 400, 70, {
    //         placeholder: 'Nombre...',
    //         maxLength: 20
    //     });

    //     if (lastUsername) {
    //         this.nameInput.setText(lastUsername);
    //     }
    // }

    setupButtons() {
        const uploadScoreY = this.height * 0.845;
        // this.backButton();

        // this.btnUpload = this.createButton(
        //     this.width * 0.51,
        //     uploadScoreY,
        //     ASSETS.BUTTONS.GAME_OVER.UPLOAD_SCORE.KEY,
        //     ASSETS.BUTTONS.GAME_OVER.UPLOAD_SCORE_HOVER.KEY,
        //     () => this.uploadScore()
        // );

        this.btnPlayAgain = this.createButton(
            this.width * 0.78,
            this.height * 0.8,
            ASSETS.BUTTONS.GAME_OVER.PLAY_AGAIN.KEY,
            ASSETS.BUTTONS.GAME_OVER.PLAY_AGAIN_HOVER.KEY,
            KEYS.SCENES.TUTORIAL
        );

        this.btnPlayAgain.on('pointerover', () => {
            this.skullImage.setTexture(ASSETS.BUTTONS.GAME_OVER.SKULL_ON.KEY);
        });

        this.btnPlayAgain.on('pointerout', () => {
            this.skullImage.setTexture(ASSETS.BUTTONS.GAME_OVER.SKULL_OFF.KEY);
        });
    }

    setupMessages() {
        const uploadScoreY = this.height * 0.845;
        this.uploadMessage = this.add.text(this.width * 0.3, uploadScoreY * 1.1, '', TextStyles.GAME_OVER.TITLE);
        this.uploadMessage.setOrigin(0.5);
        this.uploadMessage.setVisible(false);
    }

    displayStats() {
        const startX = this.width * 0.06;
        let startY = this.height * 0.35;
        const spacingY = 70;

        const statsConfig = [
            { key: 'score', label: 'Puntuación' },
            { key: 'killCount', label: 'Zombies Eliminados' },
            { key: 'headshotCount', label: 'Disparos a la cabeza' },
            { key: 'bestStreak', label: 'Mejor Racha' },
            { key: 'timePlayed', label: 'Tiempo Sobrevivido', isTime: true }
        ];

        statsConfig.forEach((stat, index) => {
            const finalValue = this.stats[stat.key];

            const statText = this.add.text(
                startX - 50,
                startY,
                `${stat.label}: 0`,
                TextStyles.GAME_OVER.SCORE_LABEL
            ).setAlpha(0);

            this.tweens.add({
                targets: statText,
                x: startX,
                alpha: 1,
                duration: 500,
                delay: index * 400,
                onStart: () => {
                    this.registry.events.emit(KEYS.REGISTRY.EVENTS.SOUNDS.STAT_LOAD);

                    this.animateValue(
                        statText,
                        stat.label,
                        0,
                        finalValue,
                        800,
                        stat.isTime
                    );
                }
            });

            startY += spacingY;
        });
    }

    animateValue(textObject, label, startValue, endValue, duration, isTime = false) {
        this.tweens.add({
            targets: { val: startValue },
            val: endValue,
            duration: duration,
            ease: 'Power1',
            onUpdate: (tween, target) => {
                const currentVal = Math.floor(target.val);
                const displayValue = isTime ? this.formatTime(currentVal) : currentVal;

                textObject.setText(`${label}: ${displayValue}`);
            }
        });
    }

    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    showMessage(text, color) {
        this.uploadMessage.setText(text);
        this.uploadMessage.setColor(color);
        this.uploadMessage.setVisible(true);
    }

    async uploadScore() {
        if (this.isUploading) return;

        const userName = this.nameInput.getText().trim();

        if (userName === "") {
            this.showMessage('El nombre no puede estar vacío', '#ff0000');
            return;
        }

        this.setUploadState(true);
        this.showMessage('Enviando Puntuación...', '#ffffff');

        try {
            const result = await scoreApi.saveScore(userName, this.stats.score);

            if (result) {
                this.showMessage('Puntuación enviada con éxito', '#00ff00');
                localStorage.setItem(KEYS.LOCAL_STORAGE.LAST_USERNAME, userName);
                this.btnUpload.disableInteractive();
                this.nameInput.setEnabled(false);
            } else {
                throw new Error("Respuesta de API inválida");
            }
        } catch (error) {
            this.showMessage('No se ha podido enviar la puntuación', '#ff0000');
            this.setUploadState(false);
        }
    }

    setUploadState(isUploading) {
        this.isUploading = isUploading;
        if (isUploading) {
            this.btnUpload.disableInteractive();
            this.btnUpload.setAlpha(0.5);
        } else {
            this.btnUpload.setInteractive();
            this.btnUpload.setAlpha(1);
        }
    }


}
