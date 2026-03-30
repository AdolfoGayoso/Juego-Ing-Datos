import Phaser from 'phaser'

import { ASSETS } from '../utils/assets-paths'
import { KEYS } from '../utils/keys'
import { playerCountSocket } from '../utils/api/player-count-socket';
import { TextStyles } from '../ui-utils/TextStyles';

export default class Boot extends Phaser.Scene {
    constructor() {
        super(KEYS.SCENES.BOOT)
    }

    preload() {
        const { width, height } = this.scale;

        const delta = 50;

        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRoundedRect(width * 0.3, height * 0.5, width * 0.4, 50, 10);

        const progressBar = this.add.graphics();

        const loadingText = this.add.text(width * 0.5, height * 0.5 - delta, 'Cargando...', TextStyles.UI.LOADING).setOrigin(0.5);

        const percentText = this.add.text(width * 0.5, height * 0.5 + delta * 2, '0%', TextStyles.UI.LOADING_PERCENT).setOrigin(0.5);


        this.load.on('progress', (value) => {
            percentText.setText(`${Math.round(value * 100)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRoundedRect(
                width * 0.3 + 10,
                height * 0.5 + 10,
                (width * 0.4 - 20) * value,
                30,
                5
            );
        });

        this.load.on('fileprogress', (file) => {
            loadingText.setText(`Cargando: ${file.key}`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });


        this.loadSprites();
        this.loadAudio();
        this.loadImages();



        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {

        const savedMusic = localStorage.getItem(KEYS.LOCAL_STORAGE.MUSIC_VOLUME);
        const savedSfx = localStorage.getItem(KEYS.LOCAL_STORAGE.SFX_VOLUME);

        const musicVolume = (savedMusic !== null && !isNaN(parseFloat(savedMusic)))
            ? parseFloat(savedMusic)
            : (import.meta.env.VITE_MUSIC_VOLUME || 0.5);

        const sfxVolume = (savedSfx !== null && !isNaN(parseFloat(savedSfx)))
            ? parseFloat(savedSfx)
            : (import.meta.env.VITE_SFX_VOLUME || 0.5);

        this.registry.set(KEYS.REGISTRY.MUSIC_VOLUME, musicVolume);
        this.registry.set(KEYS.REGISTRY.SFX_VOLUME, sfxVolume);

        this.registry.set(KEYS.REGISTRY.ONLINE_PLAYERS_COUNT, 0);

        playerCountSocket.connect(this);

        this.setupAnimations();

        this.scene.launch(KEYS.SCENES.AUDIO);

        if (typeof WebFont !== 'undefined') {
            WebFont.load({
                google: {
                    families: ['Press Start 2P']
                },
                active: () => {
                    this.scene.start(KEYS.SCENES.TUTORIAL);
                },
                inactive: () => {
                    this.scene.start(KEYS.SCENES.TUTORIAL)
                }
            });
        } else {
            this.scene.start(KEYS.SCENES.TUTORIAL);
        }
    }

    loadSprites() {
        // crosshair 
        this.load.spritesheet(ASSETS.SPRITESHEETS.CROSSHAIR.KEY, ASSETS.SPRITESHEETS.CROSSHAIR.PATH, {
            frameWidth: 32,
            frameHeight: 32
        });
        // ammo panel 
        this.load.spritesheet(ASSETS.SPRITESHEETS.AMMO_PANEL.KEY, ASSETS.SPRITESHEETS.AMMO_PANEL.PATH, {
            frameWidth: 340,
            frameHeight: 176
        });
        // base hp panel flag
        this.load.spritesheet(ASSETS.SPRITESHEETS.FLAG_HP_PANEL.KEY, ASSETS.SPRITESHEETS.FLAG_HP_PANEL.PATH, {
            frameWidth: 60,
            frameHeight: 60
        });
        // base hp panel
        this.load.spritesheet(ASSETS.SPRITESHEETS.BASE_HP_PANEL.KEY, ASSETS.SPRITESHEETS.BASE_HP_PANEL.PATH, {
            frameWidth: 140,
            frameHeight: 445
        });
        // zombie despawn
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_DESPAWN.KEY, ASSETS.SPRITESHEETS.ZOMBIE_DESPAWN.PATH, {
            frameWidth: 226,
            frameHeight: 201
        });
        // zombie 1 walk
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_1.WALK.KEY, ASSETS.SPRITESHEETS.ZOMBIE_1.WALK.PATH, {
            frameWidth: 70,
            frameHeight: 79
        });
        // zombie 1 death
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_1.DEATH.KEY, ASSETS.SPRITESHEETS.ZOMBIE_1.DEATH.PATH, {
            frameWidth: 145,
            frameHeight: 114
        });
        // zombie 2 walk
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_2.WALK.KEY, ASSETS.SPRITESHEETS.ZOMBIE_2.WALK.PATH, {
            frameWidth: 131,
            frameHeight: 156
        });
        // zombie 2 death
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_2.DEATH.KEY, ASSETS.SPRITESHEETS.ZOMBIE_2.DEATH.PATH, {
            frameWidth: 166,
            frameHeight: 149
        });
        // zombie 3 walk
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_3.WALK.KEY, ASSETS.SPRITESHEETS.ZOMBIE_3.WALK.PATH, {
            frameWidth: 97,
            frameHeight: 120
        });
        // zombie 3 death
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_3.DEATH.KEY, ASSETS.SPRITESHEETS.ZOMBIE_3.DEATH.PATH, {
            frameWidth: 146,
            frameHeight: 150
        });
        // zombie 4 walk
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_4.WALK.KEY, ASSETS.SPRITESHEETS.ZOMBIE_4.WALK.PATH, {
            frameWidth: 135,
            frameHeight: 161
        });
        // zombie 4 death
        this.load.spritesheet(ASSETS.SPRITESHEETS.ZOMBIE_4.DEATH.KEY, ASSETS.SPRITESHEETS.ZOMBIE_4.DEATH.PATH, {
            frameWidth: 140,
            frameHeight: 198
        });
    }

    setupAnimations() {
        // crosshair shoot
        this.anims.create({
            key: KEYS.ANIMATIONS.CROSSHAIR_SHOT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.CROSSHAIR.KEY, { start: 0, end: 6 }),
            frameRate: 16,
            repeat: 0
        });
        // crosshair reload 
        this.anims.create({
            key: KEYS.ANIMATIONS.CROSSHAIR_RELOAD,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.CROSSHAIR.KEY, { start: 11, end: 20 }),
            frameRate: 5.5,
            repeat: 0
        });
        // base hp panel flag
        this.anims.create({
            key: KEYS.ANIMATIONS.FLAG_HP_PANEL,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.FLAG_HP_PANEL.KEY, { start: 0, end: 4 }),
            frameRate: 12,
            repeat: -1
        });
        // zombie despawn
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES.DESPAWN,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_DESPAWN.KEY, { start: 0, end: 18 }),
            frameRate: 24,
            repeat: 0,
            hideOnComplete: true
        });
        // zombie 1 walk
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[1].WALK,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_1.WALK.KEY, { start: 0, end: 15 }),
            frameRate: 12,
            repeat: -1
        });
        // zombie 1 death
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[1].DEATH,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_1.DEATH.KEY, { start: 0, end: 10 }),
            frameRate: 15,
            repeat: 0,
        });
        // zombie 2 walk
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[2].WALK,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_2.WALK.KEY, { start: 0, end: 13 }),
            frameRate: 13,
            repeat: -1
        });
        // zombie 2 death
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[2].DEATH,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_2.DEATH.KEY, { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 0,
        });
        // zombie 3 walk
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[3].WALK,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_3.WALK.KEY, { start: 0, end: 15 }),
            frameRate: 14,
            repeat: -1
        });
        // zombie 3 death
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[3].DEATH,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_3.DEATH.KEY, { start: 0, end: 13 }),
            frameRate: 15,
            repeat: 0,
        });
        // zombie 4 walk
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[4].WALK,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_4.WALK.KEY, { start: 0, end: 11 }),
            frameRate: 14,
            repeat: -1
        });
        // zombie 4 death
        this.anims.create({
            key: KEYS.ANIMATIONS.ZOMBIES[4].DEATH,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEETS.ZOMBIE_4.DEATH.KEY, { start: 0, end: 13 }),
            frameRate: 15,
            repeat: 0,
        });
    }

    loadAudio() {
        // UI Efects Sounds
        this.load.audio(ASSETS.AUDIO.SFX.UI.BTN_CLICK.KEY, ASSETS.AUDIO.SFX.UI.BTN_CLICK.PATH);
        this.load.audio(ASSETS.AUDIO.SFX.UI.BTN_HOVER.KEY, ASSETS.AUDIO.SFX.UI.BTN_HOVER.PATH);
        this.load.audio(ASSETS.AUDIO.SFX.UI.VOLUME_CHANGE.KEY, ASSETS.AUDIO.SFX.UI.VOLUME_CHANGE.PATH);
        this.load.audio(ASSETS.AUDIO.SFX.UI.STAT_LOAD.KEY, ASSETS.AUDIO.SFX.UI.STAT_LOAD.PATH);

        // Gameplay Sounds
        this.load.audio(ASSETS.AUDIO.SFX.GAMEPLAY.SHOOT.KEY, ASSETS.AUDIO.SFX.GAMEPLAY.SHOOT.PATH);
        this.load.audio(ASSETS.AUDIO.SFX.GAMEPLAY.RELOAD.KEY, ASSETS.AUDIO.SFX.GAMEPLAY.RELOAD.PATH);
        this.load.audio(ASSETS.AUDIO.SFX.GAMEPLAY.NO_AMMO.KEY, ASSETS.AUDIO.SFX.GAMEPLAY.NO_AMMO.PATH);
        this.load.audio(ASSETS.AUDIO.SFX.GAMEPLAY.HEADSHOT_KILL.KEY, ASSETS.AUDIO.SFX.GAMEPLAY.HEADSHOT_KILL.PATH);

        // Music
        this.load.audio(ASSETS.AUDIO.MUSIC.MENU.KEY, ASSETS.AUDIO.MUSIC.MENU.PATH);
        this.load.audio(ASSETS.AUDIO.MUSIC.GAMEPLAY.KEY, ASSETS.AUDIO.MUSIC.GAMEPLAY.PATH);

        // Zombie Deaths
        for (let i = 0; i < ASSETS.AUDIO.SFX.UI.ZOMBIE_DEATHS.COUNT; i++) {
            const file_num = 100 + i
            this.load.audio(`${ASSETS.AUDIO.SFX.UI.ZOMBIE_DEATHS.BASE_NAME}${file_num}`, `${ASSETS.AUDIO.SFX.UI.ZOMBIE_DEATHS.FOLDER}/zombie-death-sound-${file_num}.ogg`);
        }
    }

    loadImages() {
        //  BASE
        this.load.image(ASSETS.BUTTONS.UI.BACK.KEY, ASSETS.BUTTONS.UI.BACK.PATH);
        this.load.image(ASSETS.BUTTONS.UI.BACK_HOVER.KEY, ASSETS.BUTTONS.UI.BACK_HOVER.PATH);
        //  GAME
        this.load.image(ASSETS.BACKGROUNDS.GAME.KEY, ASSETS.BACKGROUNDS.GAME.PATH);
        //  GAME OVER
        this.load.image(ASSETS.BACKGROUNDS.GAME_OVER.KEY, ASSETS.BACKGROUNDS.GAME_OVER.PATH);

        this.load.image(ASSETS.BUTTONS.GAME_OVER.UPLOAD_SCORE.KEY, ASSETS.BUTTONS.GAME_OVER.UPLOAD_SCORE.PATH);
        this.load.image(ASSETS.BUTTONS.GAME_OVER.UPLOAD_SCORE_HOVER.KEY, ASSETS.BUTTONS.GAME_OVER.UPLOAD_SCORE_HOVER.PATH);
        this.load.image(ASSETS.BUTTONS.GAME_OVER.PLAY_AGAIN.KEY, ASSETS.BUTTONS.GAME_OVER.PLAY_AGAIN.PATH);
        this.load.image(ASSETS.BUTTONS.GAME_OVER.PLAY_AGAIN_HOVER.KEY, ASSETS.BUTTONS.GAME_OVER.PLAY_AGAIN_HOVER.PATH);

        this.load.image(ASSETS.BUTTONS.GAME_OVER.SKULL_ON.KEY, ASSETS.BUTTONS.GAME_OVER.SKULL_ON.PATH);
        this.load.image(ASSETS.BUTTONS.GAME_OVER.SKULL_OFF.KEY, ASSETS.BUTTONS.GAME_OVER.SKULL_OFF.PATH);
        // MAIN MENU
        this.load.image(ASSETS.BACKGROUNDS.MENU.KEY, ASSETS.BACKGROUNDS.MENU.PATH)

        this.load.image(ASSETS.BUTTONS.MENU.PLAY.KEY, ASSETS.BUTTONS.MENU.PLAY.PATH)
        this.load.image(ASSETS.BUTTONS.MENU.PLAY_HOVER.KEY, ASSETS.BUTTONS.MENU.PLAY_HOVER.PATH)

        this.load.image(ASSETS.BUTTONS.MENU.SETTINGS.KEY, ASSETS.BUTTONS.MENU.SETTINGS.PATH)
        this.load.image(ASSETS.BUTTONS.MENU.SETTINGS_HOVER.KEY, ASSETS.BUTTONS.MENU.SETTINGS_HOVER.PATH)

        this.load.image(ASSETS.BUTTONS.MENU.RANKING.KEY, ASSETS.BUTTONS.MENU.RANKING.PATH)
        this.load.image(ASSETS.BUTTONS.MENU.RANKING_HOVER.KEY, ASSETS.BUTTONS.MENU.RANKING_HOVER.PATH)

        this.load.image(ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON.KEY, ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON.PATH)
        this.load.image(ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON_HOVER.KEY, ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_ON_HOVER.PATH)

        this.load.image(ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF.KEY, ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF.PATH)
        this.load.image(ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF_HOVER.KEY, ASSETS.BUTTONS.MENU.FULLSCREEN_TOGGLE_OFF_HOVER.PATH)

        this.load.image(ASSETS.BUTTONS.MENU.PLAYER_COUNT.KEY, ASSETS.BUTTONS.MENU.PLAYER_COUNT.PATH)
        // PAUSE
        this.load.image(ASSETS.BACKGROUNDS.PAUSE.KEY, ASSETS.BACKGROUNDS.PAUSE.PATH);

        this.load.image(ASSETS.BUTTONS.PAUSE.QUIT_GAME.KEY, ASSETS.BUTTONS.PAUSE.QUIT_GAME.PATH);
        this.load.image(ASSETS.BUTTONS.PAUSE.QUIT_GAME_HOVER.KEY, ASSETS.BUTTONS.PAUSE.QUIT_GAME_HOVER.PATH);
        this.load.image(ASSETS.BUTTONS.PAUSE.RESUME_GAME.KEY, ASSETS.BUTTONS.PAUSE.RESUME_GAME.PATH);
        this.load.image(ASSETS.BUTTONS.PAUSE.RESUME_GAME_HOVER.KEY, ASSETS.BUTTONS.PAUSE.RESUME_GAME_HOVER.PATH);
        this.load.image(ASSETS.BUTTONS.PAUSE.SETTINGS.KEY, ASSETS.BUTTONS.PAUSE.SETTINGS.PATH);
        this.load.image(ASSETS.BUTTONS.PAUSE.SETTINGS_HOVER.KEY, ASSETS.BUTTONS.PAUSE.SETTINGS_HOVER.PATH);
        // RANKING
        this.load.image(ASSETS.BACKGROUNDS.RANKING.KEY, ASSETS.BACKGROUNDS.RANKING.PATH);

        this.load.image(ASSETS.BUTTONS.RANKING.SEE_ALL_SCORES.KEY, ASSETS.BUTTONS.RANKING.SEE_ALL_SCORES.PATH);
        this.load.image(ASSETS.BUTTONS.RANKING.SEE_ALL_SCORES_HOVER.KEY, ASSETS.BUTTONS.RANKING.SEE_ALL_SCORES_HOVER.PATH);
        // SETTINGS
        this.load.image(ASSETS.BACKGROUNDS.SETTINGS.KEY, ASSETS.BACKGROUNDS.SETTINGS.PATH);
        // TUTORIAL
        this.load.image(ASSETS.BACKGROUNDS.TUTORIAL.KEY, ASSETS.BACKGROUNDS.TUTORIAL.PATH)

    }


} 