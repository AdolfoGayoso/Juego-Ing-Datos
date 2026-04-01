import Phaser from 'phaser';

import { ASSETS } from '../utils/assets-paths';
import { KEYS } from '../utils/keys';

import Crosshair from '../game-utils/Crosshair';
import AmmoPanel from '../game-utils/AmmoPanel';
import BaseHpPanel from '../game-utils/BaseHpPanel';
import ScoreBoard from '../game-utils/ScoreBoard';
import StreakCounter from '../game-utils/StreakCounter';

import SpawnerManager from '../game-utils/SpawnerManager';
import StatsManager from '../game-utils/StatsManager';

import GestureManager from '../game-utils/GestureManager';

export default class GameScene extends Phaser.Scene {

    audioScene;

    crosshair;
    ammoPanel;
    baseHpPanel;
    streakCounter;

    spawnerManager;

    gestureManager;

    constructor() {
        super(KEYS.SCENES.GAME);

        this.screenWidth = 0;
        this.screenHeith = 0;
    }

    create() {

        this.screenWidth = this.scale.width;
        this.screenHeith = this.scale.height;

        this.audioScene = this.scene.get(KEYS.SCENES.AUDIO);

        this.crosshair = new Crosshair(this, this.screenWidth * 0.5, this.screenHeith * 0.5);
        this.ammoPanel = new AmmoPanel(this, this.screenWidth * 0.1, this.screenHeith * 0.9);
        this.baseHpPanel = new BaseHpPanel(this, this.screenWidth * 0.95, this.screenHeith * 0.45);
        this.scoreBoard = new ScoreBoard(this, this.screenHeith * 0.05, this.screenHeith * 0.05);
        this.streakCounter = new StreakCounter(this, this.screenHeith * 0.05, this.screenHeith * 0.11);

        this.statsManager = new StatsManager(this);

        this.spawnerManager = new SpawnerManager(this);
        this.spawnerManager.start();
        // this.spawnerManager.debugHitboxes();

        this.setupBackground();

        // this.setupInputHandling();
        this.setupGestureHandling();

        this.game.events.on(KEYS.GAME_EVENTS.ZOMBIE_BREACH, () => {
            this.baseHpPanel.takeDamage();
        });

        this.game.events.on(KEYS.GAME_EVENTS.GAME_OVER, () => {
            this.handleGameOver();
        });

        this.audioScene.playGameplayMusic();

        this.events.once('shutdown', () => {
            this.game.events.off(KEYS.GAME_EVENTS.ADD_SCORE);
            this.game.events.off(KEYS.GAME_EVENTS.ZOMBIE_KILLED);
            this.game.events.off(KEYS.GAME_EVENTS.HEADSHOT_KILL);
            this.game.events.off(KEYS.GAME_EVENTS.GAME_OVER);
        });

    }

    update() {
        this.crosshair.update();
        this.spawnerManager.update();
    }

    setupGestureHandling() {
        this.gestureManager = new GestureManager(this);

        // Apuntado 
        this.events.on('GESTURE_AIM', (pos) => {
            this.crosshair.setPosition(pos.x, pos.y);
        });

        // Disparo
        this.events.on('GESTURE_SHOOT', () => {
            this.crosshair.shoot();
        });

        // Inicio de recarga (Puño)
        this.events.on('GESTURE_START_RELOAD', () => {
            this.crosshair.startReload();
        });

        // Interrupcion de recarga (Abrir la mano antes de tiempo)
        this.events.on('GESTURE_STOP_RELOAD', () => {
            this.crosshair.interruptReload();
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause(KEYS.SCENES.GAME);
            this.scene.launch(KEYS.SCENES.PAUSE);
            this.scene.bringToTop(KEYS.SCENES.PAUSE)
        });
    }

    getSpawnerManager() {
        return this.spawnerManager;
    }

    setupBackground() {
        this.add.image(this.screenWidth * 0.5, this.screenHeith * 0.5, ASSETS.BACKGROUNDS.GAME.KEY)
            .setOrigin(0.5)
            .setDisplaySize(this.screenWidth, this.screenHeith)
            .setDepth(-1);
    }

    handleGameOver() {

        this.game.events.off(KEYS.GAME_EVENTS.ZOMBIE_BREACH);
        this.game.events.off(KEYS.GAME_EVENTS.GAME_OVER);

        this.audioScene.stopAllMusic();
        this.audioScene.playMenuMusic();
        this.scene.stop(KEYS.SCENES.GAME);
        this.scene.start(KEYS.SCENES.GAME_OVER, { stats: this.statsManager.getStats(this.scoreBoard.getScore(), this.crosshair.getBestStreak()) });
    }

    setupInputHandling() {
        this.input.mouse.disableContextMenu();
        this.input.setDefaultCursor('none');

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) this.crosshair.shoot();
            if (pointer.rightButtonDown()) this.crosshair.startReload();
        });

        this.input.on('pointerup', (pointer) => {
            if (pointer.rightButtonReleased()) this.crosshair.interruptReload();
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause(KEYS.SCENES.GAME);
            this.scene.launch(KEYS.SCENES.PAUSE);
            this.scene.bringToTop(KEYS.SCENES.PAUSE)
        });
    }

}