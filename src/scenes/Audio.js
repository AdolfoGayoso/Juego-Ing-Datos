import Phaser from 'phaser'

import { ASSETS } from '../utils/assets-paths'
import { KEYS } from '../utils/keys'


export default class Audio extends Phaser.Scene {

    menuMusic = null;
    gameplayMusic = null;

    currentMusicKey = null;

    reloadSound = null;

    constructor() {
        super(KEYS.SCENES.AUDIO)
    }

    create() {

        this.menuMusic = this.sound.add(ASSETS.AUDIO.MUSIC.MENU.KEY, { loop: true, volume: this.registry.get(KEYS.REGISTRY.MUSIC_VOLUME) });
        this.gameplayMusic = this.sound.add(ASSETS.AUDIO.MUSIC.GAMEPLAY.KEY, { loop: true, volume: this.registry.get(KEYS.REGISTRY.MUSIC_VOLUME) });

        this.reloadSound = this.sound.add(ASSETS.AUDIO.SFX.GAMEPLAY.RELOAD.KEY, { loop: false, volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });

        this.registry.events.on(KEYS.REGISTRY.EVENTS.CHANGE_MUSIC_VOLUME, this.updateMusicVolume, this);
        this.registry.events.on(KEYS.REGISTRY.EVENTS.CHANGE_SFX_VOLUME, this.updateSfxVolume, this);

        this.registry.events.on(KEYS.REGISTRY.EVENTS.SOUNDS.ZOMBIE_DEATH, this.playRandomZombieDeath, this);
        this.registry.events.on(KEYS.REGISTRY.EVENTS.SOUNDS.HEADSHOT_KILL, this.playHeadshotKillSound, this);
        this.registry.events.on(KEYS.REGISTRY.EVENTS.SOUNDS.STAT_LOAD, this.playStatLoadSound, this);

        this.menuMusic.play();
    }

    playRandomZombieDeath() {
        const count = ASSETS.AUDIO.SFX.UI.ZOMBIE_DEATHS.COUNT;
        const baseName = ASSETS.AUDIO.SFX.UI.ZOMBIE_DEATHS.BASE_NAME;

        const randomIndex = Phaser.Math.Between(100, 100 + count - 1);
        const soundKey = `${baseName}${randomIndex}`;

        this.sound.play(soundKey, {
            volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME)
        });
    }

    playStatLoadSound() {
        this.sound.play(ASSETS.AUDIO.SFX.UI.STAT_LOAD.KEY, { volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });
    }

    playHeadshotKillSound() {
        this.sound.play(ASSETS.AUDIO.SFX.GAMEPLAY.HEADSHOT_KILL.KEY, { volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });
    }

    playShootSound() {
        this.sound.play(ASSETS.AUDIO.SFX.GAMEPLAY.SHOOT.KEY, { volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });
    }

    playReloadSound() {
        this.reloadSound.play({ volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });
    }

    stopReloadSound() {
        this.reloadSound.stop();
    }

    playNoAmmoSound() {
        this.sound.play(ASSETS.AUDIO.SFX.GAMEPLAY.NO_AMMO.KEY, { volume: this.registry.get(KEYS.REGISTRY.SFX_VOLUME) });
    }

    updateMusicVolume() {
        this.menuMusic.setVolume(this.registry.get(KEYS.REGISTRY.MUSIC_VOLUME));
        this.gameplayMusic.setVolume(this.registry.get(KEYS.REGISTRY.MUSIC_VOLUME));
    }

    updateSfxVolume() {
        const sfxVolume = this.registry.get(KEYS.REGISTRY.SFX_VOLUME);
        if (sfxVolume === undefined || sfxVolume === null) return;

        this.sound.getAllPlaying().forEach(sound => {
            if (sound !== this.menuMusic && sound !== this.gameplayMusic) {
                if (sound) {
                    sound.setVolume(sfxVolume);
                }
            }
        });
    }

    stopAllMusic() {
        if (this.menuMusic && this.menuMusic.isPlaying) {
            this.menuMusic.stop();
        }
        if (this.gameplayMusic && this.gameplayMusic.isPlaying) {
            this.gameplayMusic.stop();
        }
        this.currentMusicKey = null;
    }

    stopMenuMusic() {
        if (this.menuMusic && this.menuMusic.isPlaying) {
            this.menuMusic.stop();
        }
        this.currentMusicKey = null;
    }

    pauseAllMusic() {
        if (this.menuMusic && this.menuMusic.isPlaying) {
            this.menuMusic.pause();
        }
        if (this.gameplayMusic && this.gameplayMusic.isPlaying) {
            this.gameplayMusic.pause();
        }
    }

    resumeMusic() {
        if (this.currentMusicKey === ASSETS.AUDIO.MUSIC.MENU.KEY && this.menuMusic && this.menuMusic.isPaused) {
            this.menuMusic.resume();
        } else if (this.currentMusicKey === ASSETS.AUDIO.MUSIC.GAMEPLAY.KEY && this.gameplayMusic && this.gameplayMusic.isPaused) {
            this.gameplayMusic.resume();
        }
    }

    playMenuMusic() {
        if (this.currentMusicKey === ASSETS.AUDIO.MUSIC.MENU.KEY && this.menuMusic.isPlaying) {
            return;
        }
        this.stopAllMusic();
        this.menuMusic.play();
        this.currentMusicKey = ASSETS.AUDIO.MUSIC.MENU.KEY;
    }

    playGameplayMusic() {
        if (this.currentMusicKey === ASSETS.AUDIO.MUSIC.GAMEPLAY.KEY && this.gameplayMusic.isPlaying) {
            return;
        }
        this.stopAllMusic();
        this.gameplayMusic.play();
        this.currentMusicKey = ASSETS.AUDIO.MUSIC.GAMEPLAY.KEY;
    }

    shutdown() {
        this.registry.events.off(KEYS.REGISTRY.EVENTS.CHANGE_MUSIC_VOLUME, this.updateMusicVolume, this);
        this.registry.events.off(KEYS.REGISTRY.EVENTS.CHANGE_SFX_VOLUME, this.updateSfxVolume, this);
        this.stopAllMusic();
    }
}
