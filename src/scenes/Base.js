import Phaser from 'phaser'
import { ASSETS } from '../utils/assets-paths'
import { KEYS } from '../utils/keys'


export default class Base extends Phaser.Scene {
    constructor(key) {
        super({ key })

        this.width = 0;
        this.height = 0;
    }

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;
    }

    backButton(x = 70, y = 70, scale = 1, action = KEYS.SCENES.MAIN_MENU) {
        return this.createButton(x, y, ASSETS.BUTTONS.UI.BACK.KEY, ASSETS.BUTTONS.UI.BACK_HOVER.KEY, action).setScale(scale);
    }

    createButton(x, y, assetKey, hoverKey, action) {
        const btn = this.add.image(x, y, assetKey).setOrigin(0.5).setInteractive();

        btn.on('pointerup', () => {
            this.playClickSound();
            if (typeof action === 'function') {
                action();
            } else {
                this.scene.start(action);
            }
        });

        btn.on('pointerover', () => {
            this.playHoverSound();
            btn.setTexture(hoverKey);
        });

        btn.on('pointerout', () => {
            btn.setTexture(assetKey);
        });

        return btn;
    }

    playClickSound() {
        this.sound.play(ASSETS.AUDIO.SFX.UI.BTN_CLICK.KEY, { volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });
    }

    playHoverSound() {
        this.sound.play(ASSETS.AUDIO.SFX.UI.BTN_HOVER.KEY, { volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });
    }

    createFullscreenButton(x, y) {
        const btn = this.add.image(x, y, this.scale.isFullscreen ? ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF.KEY : ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON.KEY).setOrigin(0.5).setInteractive();

        btn.on('pointerup', () => {
            this.playClickSound();
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                btn.setTexture(ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON.KEY);
            } else {
                this.scale.startFullscreen();
                btn.setTexture(ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF.KEY);
            }
        });

        btn.on('pointerover', () => {
            this.playHoverSound();
            btn.setTexture(this.scale.isFullscreen ? ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF_HOVER.KEY : ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON_HOVER.KEY);
        });

        btn.on('pointerout', () => {
            btn.setTexture(this.scale.isFullscreen ? ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF.KEY : ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON.KEY);
        });

        return btn;
    }

    addBackground(assetKey) {
        const { width, height } = this.scale;
        return this.add.image(width * 0.5, height * 0.5, assetKey)
            .setOrigin(0.5)
            .setDisplaySize(width, height);
    }


}
