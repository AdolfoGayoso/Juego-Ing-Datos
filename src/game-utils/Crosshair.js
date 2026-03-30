import { ASSETS } from '../utils/assets-paths';
import { KEYS } from '../utils/keys';

const MAX_AMMO = 5;
const SHOOT_COOLDOWN = 500;
const RELOAD_TIME = 1700;
const FAILED_RELOAD_TIME = 500;

export default class Crosshair extends Phaser.Physics.Arcade.Sprite {
    ammoCount = MAX_AMMO;
    isReloading = false;
    isCoolingDown = false;

    reloadTimer = null;
    resetTimer = null;

    streak = 0;
    bestStreak = 0;

    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.SPRITESHEETS.CROSSHAIR.KEY);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setFrame(0);
        this.setScale(1.5);
        this.setDepth(1500);

        const radius = 10;
        this.body.setCircle(radius);

        const offsetX = (this.width * 0.5) - radius;
        const offsetY = (this.height * 0.5) - radius;

        this.body.setOffset(offsetX, offsetY);

        this.audioScene = scene.scene.get(KEYS.SCENES.AUDIO);
    }

    getAmmoCount() {
        return this.ammoCount;
    }

    update() {
        this.x = this.scene.input.activePointer.x;
        this.y = this.scene.input.activePointer.y;
    }

    checkHit() {
        const zombies = this.scene.spawnerManager.getZombies();
        const { x, y } = this.scene.input.activePointer;

        let hit = false;

        for (let i = zombies.length - 1; i >= 0; i--) {
            const zombie = zombies[i];

            if (zombie.isDead) continue;

            const headCircle = new Phaser.Geom.Circle(
                zombie.headHitBox.x,
                zombie.headHitBox.y,
                zombie.zombieConfig.HEAD_HITBOX_RADIUS
            );

            if (Phaser.Geom.Circle.Contains(headCircle, x, y)) {
                zombie.onHit(true, this.streak);
                hit = true;
            }

            if (zombie.body.hitTest(x, y)) {
                zombie.onHit(false, this.streak);
                hit = true;
            }
        }

        if (hit) {
            this.streak += 1;
        } else {
            if (this.streak > this.bestStreak) {
                this.bestStreak = this.streak;
            }
            this.streak = 0;
        }
        this.scene.game.events.emit(KEYS.GAME_EVENTS.UPDATE_STREAK, this.streak);
    }

    getBestStreak() {
        return this.bestStreak;
    }

    shoot() {
        if (this.ammoCount <= 0) {
            this.audioScene.playNoAmmoSound();
            this.scene.events.emit(KEYS.REGISTRY.EVENTS.NO_AMMO);
            return;
        }
        if (this.isReloading || this.isCoolingDown) return;

        if (this.resetTimer) this.resetTimer.remove();

        this.audioScene.playShootSound();
        this.play(KEYS.ANIMATIONS.CROSSHAIR_SHOT);
        this.ammoCount--;

        this.scene.events.emit(KEYS.REGISTRY.EVENTS.CHANGE_AMMO_COUNT, this.ammoCount);

        this.checkHit();

        this.isCoolingDown = true;
        this.scene.time.delayedCall(SHOOT_COOLDOWN, () => {
            this.isCoolingDown = false;
            this.reset();
        });
    }

    startReload() {
        if (this.isReloading || this.isCoolingDown) return;

        if (this.resetTimer) this.resetTimer.remove();

        this.audioScene.playReloadSound();
        this.isReloading = true;
        this.play(KEYS.ANIMATIONS.CROSSHAIR_RELOAD);

        this.reloadTimer = this.scene.time.delayedCall(RELOAD_TIME, () => {
            this.ammoCount = MAX_AMMO;
            this.isReloading = false;
            this.scene.events.emit(KEYS.REGISTRY.EVENTS.CHANGE_AMMO_COUNT, this.ammoCount);
            this.reset();
        });
    }

    interruptReload() {
        if (!this.isReloading) return;

        if (this.reloadTimer) this.reloadTimer.remove();
        this.isReloading = false;
        this.audioScene.stopReloadSound();
        this.audioScene.playNoAmmoSound();

        this.anims.stop();
        this.setFrame(21);

        this.resetTimer = this.scene.time.delayedCall(FAILED_RELOAD_TIME, () => {
            this.reset();
        });
    }

    reset() {
        this.setFrame(0);
        this.resetTimer = null;
    }
}