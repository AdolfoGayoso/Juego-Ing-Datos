import { KEYS } from "../utils/keys";
import { TextStyles } from "../ui-utils/TextStyles";

export default class StreakCounter extends Phaser.GameObjects.Text {

    currentStreak = 0;

    constructor(scene, x, y) {
        super(scene, x, y, 'x0', TextStyles.SCORE_BOARD.STREAK);
        scene.add.existing(this);
        this.initialY = y;
        this.setVisible(false);

        this.scene.game.events.on(KEYS.GAME_EVENTS.UPDATE_STREAK, this.updateStreak, this);
        this.on('destroy', () => {
            this.scene.game.events.off(KEYS.GAME_EVENTS.UPDATE_STREAK, this.updateStreak, this);
        });

    }

    updateStreak(value) {
        if (!this.active || !this.scene) return;
        this.currentStreak = value;

        this.setText(`x${this.currentStreak}`);

        this.scene.tweens.killTweensOf(this);

        if (this.currentStreak > 0) {
            this.setVisible(true);
            this.setAlpha(1);
            this.setScale(1);

            this.y = this.initialY;

            this.scene.tweens.add({
                targets: this,
                scale: 1.2,
                duration: 100,
                yoyo: true
            });
        } else {
            this.brokenStreak();
        }
    }

    brokenStreak() {
        this.scene.tweens.add({
            targets: this,
            x: this.x + 5,
            duration: 50,
            repeat: 3,
            yoyo: true,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this,
                    y: this.y + 20,
                    alpha: 0,
                    scale: 0.8,
                    duration: 400,
                    ease: 'Power2',
                    onComplete: () => {
                        this.setVisible(false);
                        this.y -= 20;
                        this.setText('x0');
                    }
                });
            }
        });
    }
}