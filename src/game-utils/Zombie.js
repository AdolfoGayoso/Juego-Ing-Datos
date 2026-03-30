import Phaser from 'phaser'

import { KEYS } from '../utils/keys'

import { ZOMBIE_TYPES_CONFIG } from '../game-utils/zombie-config'

export default class Zombie extends Phaser.Physics.Arcade.Sprite {

    zombieConfig;
    speed;

    headHitBox;

    constructor(scene, x, y, config = null) {

        if (!config) {
            config = Phaser.Utils.Array.GetRandom(ZOMBIE_TYPES_CONFIG);
        }

        super(scene, x, y, config.SPRITE_SHEET_KEY);

        this.zombieConfig = config
        this.speed = this.calculateSpeed()

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(
            this.zombieConfig.BASE_FRAME_WIDTH * this.zombieConfig.HITBOX_WIDTH_RATIO,
            this.zombieConfig.BASE_FRAME_HEIGHT * this.zombieConfig.HITBOX_HEIGHT_RATIO
        );

        this.body.setOffset(
            this.zombieConfig.HITBOX_OFFSET_X,
            this.zombieConfig.HITBOX_OFFSET_Y
        );

        this.headHitBox = scene.add.circle(
            x + this.zombieConfig.HEAD_HITBOX_OFFSET_X,
            y + this.zombieConfig.HEAD_HITBOX_OFFSET_Y,
            this.zombieConfig.HEAD_HITBOX_RADIUS,
            0xff0000,
            0);
        scene.physics.add.existing(this.headHitBox);

        this.headHitBox.body.setAllowGravity(false);
        this.headHitBox.body.setCircle(this.zombieConfig.HEAD_HITBOX_RADIUS);

        this.setScale(this.zombieConfig.SCALE);
        this.setDepth(y);
        this.play(this.zombieConfig.WALK_ANIM_KEY);
    }

    getSpeed() {
        return this.speed;
    }

    onHit(isHeadshot, streak = 0) {
        if (this.isDead) return;

        this.isDead = true;
        this.body.setVelocity(0);

        if (this.headHitBox) {
            this.headHitBox.destroy();
        }

        if (isHeadshot) {
            this.scene.game.events.emit(KEYS.GAME_EVENTS.ADD_SCORE, 10, streak);
            this.scene.registry.events.emit(KEYS.REGISTRY.EVENTS.SOUNDS.HEADSHOT_KILL);
            this.scene.registry.events.emit(KEYS.REGISTRY.EVENTS.SOUNDS.ZOMBIE_DEATH);
            this.scene.game.events.emit(KEYS.GAME_EVENTS.HEADSHOT_KILL);
        } else {
            this.scene.game.events.emit(KEYS.GAME_EVENTS.ADD_SCORE, 5, streak);
            this.scene.registry.events.emit(KEYS.REGISTRY.EVENTS.SOUNDS.ZOMBIE_DEATH);
        }

        this.scene.game.events.emit(KEYS.GAME_EVENTS.ZOMBIE_KILLED);

        this.play(this.zombieConfig.DEATH_ANIM_KEY);
        this.setScale(this.zombieConfig.DEATH_SCALE);

        this.once('animationcomplete', () => {
            this.startDespawn();
        });
    }

    startMovement(multiplier = 1) {
        this.body.setVelocityX(this.speed * multiplier);
        this.headHitBox.body.setVelocityX(this.speed * multiplier);
    }

    calculateSpeed() {
        return this.zombieConfig.SPEED + Phaser.Math.Between(-50, 50);
    }

    startDespawn() {
        this.play(KEYS.ANIMATIONS.ZOMBIES.DESPAWN);

        this.setDepth(this.depth);
        this.setScale(1);

        this.once('animationcomplete', () => {
            this.destroy();
        });
    }

    destroy(fromScene) {
        if (this.headHitBox) {
            this.headHitBox.destroy();
        }

        super.destroy(fromScene);
    }
}   