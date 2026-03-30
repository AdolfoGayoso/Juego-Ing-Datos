import Phaser from 'phaser';

import { KEYS } from '../utils/keys';
import { TextStyles } from '../ui-utils/TextStyles';

export default class ScoreBoard extends Phaser.GameObjects.Text {
    currentScore = 0;

    constructor(scene, x, y) {
        super(scene, x, y, '0', TextStyles.SCORE_BOARD.MAIN);

        scene.add.existing(this);

        scene.game.events.on(KEYS.GAME_EVENTS.ADD_SCORE, this.handleScoreAdded, this);

        this.on('destroy', () => {
            scene.game.events.off(KEYS.GAME_EVENTS.ADD_SCORE, this.handleScoreAdded, this);
        });
    }

    getScore() {
        return this.currentScore;
    }

    handleScoreAdded(points, streak) {
        if (streak === 0) streak = 1;

        const scoreToAdd = points * streak;
        this.currentScore += scoreToAdd;

        this.setText(this.currentScore.toString());

        this.displayFlyingScore(scoreToAdd);

        this.scene.tweens.add({
            targets: this,
            scale: 1.1,
            duration: 100,
            yoyo: true
        });
    }

    displayFlyingScore(points) {
        const flyDistance = 100;
        const angleDegrees = Phaser.Math.Between(-45, 45);
        const angleRadians = Phaser.Math.DegToRad(angleDegrees);

        const startX = this.x + (this.width * (1 - this.originX)) + 10;
        const startY = this.y;

        const targetX = startX + Math.cos(angleRadians) * flyDistance;
        const targetY = startY + Math.sin(angleRadians) * flyDistance;

        const scoreText = this.scene.add.text(startX, startY, `+${points.toFixed(0)}`, TextStyles.SCORE_BOARD.FLYING)
            .setOrigin(0.5)
            .setDepth(this.depth);

        this.scene.tweens.add({
            targets: scoreText,
            x: targetX,
            y: targetY,
            alpha: 0,
            ease: 'Cubic.easeOut',
            duration: 1000,
            scale: { from: 0.5, to: 1.2 },
            onComplete: () => scoreText.destroy()
        });
    }
}