import Zombie from '../game-utils/Zombie';
import { ZOMBIE_TYPES_CONFIG } from '../game-utils/zombie-config';

import { KEYS } from '../utils/keys';

export default class SpawnerManager {
    constructor(scene) {
        this.scene = scene;
        this.baseDelay = 2000;
        this.difficultyFactor = 0.9;
        this.isActive = true;

        this.startTime = this.scene.time.now;
        this.killCount = 0;

        this.scene.game.events.on(KEYS.GAME_EVENTS.ZOMBIE_KILLED, () => {
            this.killCount++;
        });

        this.zombieGroup = this.scene.physics.add.group({
            classType: Zombie,
            runChildUpdate: true,
            immovable: false,
            allowGravity: false,
            createCallback: (zombie) => {
                zombie.startMovement();
            }
        });
    }

    debugHitboxes() {
        let x = 200;
        ZOMBIE_TYPES_CONFIG.forEach(config => {
            const zombie = new Zombie(this.scene, x, 800, config);
            this.zombieGroup.add(zombie);

            zombie.speed = 0;
            zombie.body.setVelocity(0.5);
            if (zombie.headHitBox && zombie.headHitBox.body) {
                zombie.headHitBox.body.setVelocity(0);
            }

            x += 500;
        });
    }

    update() {
        const zombies = this.zombieGroup.getChildren();
        const screenWidth = this.scene.scale.width;

        for (let i = zombies.length - 1; i >= 0; i--) {
            const zombie = zombies[i];

            if (zombie.active && !zombie.isDead) {
                if (zombie.x > screenWidth + 100) {
                    this.scene.game.events.emit(KEYS.GAME_EVENTS.ZOMBIE_BREACH);
                    zombie.destroy();
                }
            }
        }
    }

    getZombies() {
        return this.zombieGroup.getChildren();
    }

    start() {
        this.spawnLoop();
    }

    stop() {
        this.isActive = false;
    }

    spawnLoop() {
        if (!this.isActive) return;

        const y = Phaser.Math.Between(750, 950);
        const zombie = new Zombie(this.scene, -50, y);
        this.zombieGroup.add(zombie);

        const difficultyLevel = Math.floor(this.killCount / 10);

        const nextDelay = this.baseDelay * Math.pow(this.difficultyFactor, difficultyLevel);

        this.scene.time.delayedCall(nextDelay, this.spawnLoop, [], this);
    }
}