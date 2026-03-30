import Phaser from 'phaser'
import Base from './Base'
import { ASSETS } from '../utils/assets-paths'
import { KEYS } from '../utils/keys'
import { TextStyles } from '../ui-utils/TextStyles';

export default class Settings extends Base {

    constructor() {
        super(KEYS.SCENES.SETTINGS)
    }

    init(data) {
        this.returnScene = (data && data.returnScene) ? data.returnScene : KEYS.SCENES.MAIN_MENU;
    }

    create() {
        super.create();

        const musicVolume = this.registry.get(KEYS.REGISTRY.MUSIC_VOLUME);
        const sfxVolume = this.registry.get(KEYS.REGISTRY.SFX_VOLUME);

        this.addBackground(ASSETS.BACKGROUNDS.SETTINGS.KEY);

        this.backButton(70, 70, 1, () => {
            if (this.returnScene === KEYS.SCENES.PAUSE) {
                this.scene.stop();
                this.scene.wake(KEYS.SCENES.PAUSE);
                this.scene.bringToTop(KEYS.SCENES.PAUSE);
            } else {
                this.scene.start(this.returnScene);
            }
        });
        this.createVolumeSlider(this.width * 0.5, this.height * 0.5, musicVolume, KEYS.REGISTRY.MUSIC_VOLUME, KEYS.REGISTRY.EVENTS.CHANGE_MUSIC_VOLUME, KEYS.LOCAL_STORAGE.MUSIC_VOLUME);

        this.createVolumeSlider(this.width * 0.5, this.height * 0.7, sfxVolume, KEYS.REGISTRY.SFX_VOLUME, KEYS.REGISTRY.EVENTS.CHANGE_SFX_VOLUME, KEYS.LOCAL_STORAGE.SFX_VOLUME);
    }

    createVolumeSlider(x, y, initialValue, registryKey, eventKey, localStorageKey) {
        const sliderWidth = 1000;
        const trackColor = 0xAAAAAA;
        const thumbColor = 0xFFFFFF;

        const minX = x - sliderWidth / 2;
        const maxX = x + sliderWidth / 2;
        const thumbX = Phaser.Math.Linear(minX, maxX, initialValue);

        const track = this.add.graphics();
        track.lineStyle(8, trackColor, 1);
        track.lineBetween(minX, y, maxX, y);

        const valueText = this.add.text(x, y + 60, `${Math.round(initialValue * 100)}%`, TextStyles.UI.VOLUME_VALUE).setOrigin(0.5);

        const thumb = this.add.circle(thumbX, y, 25, thumbColor)
            .setStrokeStyle(4, 0x000000)
            .setInteractive({ draggable: true, useHandCursor: true });

        thumb.setData('config', {
            minX: minX,
            maxX: maxX,
            valueText: valueText,
            key: registryKey,
            eventKey: eventKey,
            lastPercentage: Math.round(initialValue * 100),
            localStorageKey: localStorageKey
        });

        this.input.setDraggable(thumb);

        thumb.on('drag', (pointer, dragX) => {
            const config = thumb.getData('config');
            const clampedX = Phaser.Math.Clamp(dragX, config.minX, config.maxX);
            thumb.x = clampedX;

            const normalized = (clampedX - config.minX) / (config.maxX - config.minX);
            const currentPercentage = Math.round(normalized * 100);

            if (currentPercentage !== config.lastPercentage) {
                config.valueText.setText(`${currentPercentage}%`);
                this.registry.set(config.key, normalized);
                localStorage.setItem(config.localStorageKey, normalized.toString());

                this.sound.play(ASSETS.AUDIO.SFX.UI.VOLUME_CHANGE.KEY, {
                    volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME)
                });

                config.lastPercentage = currentPercentage;
                this.registry.events.emit(config.eventKey);
            }
        });
    }
}