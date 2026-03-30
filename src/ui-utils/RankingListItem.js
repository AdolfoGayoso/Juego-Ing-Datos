import { TextStyles } from './TextStyles';

export default class RankingListItem extends Phaser.GameObjects.Container {
    constructor(scene, x, y, rank, score) {
        super(scene, x, y);

        this.score = score;
        this.rank = rank;

        const fullName = score.getUserName();
        const displayName = this.truncateName(fullName);

        this.nameText = scene.add.text(0, 0, `${rank}.${displayName}`, TextStyles.RANKING.LIST_ITEM)
            .setOrigin(0.5);

        this.pointsText = scene.add.text(0, 35, String(score.getPoints()), TextStyles.RANKING.LIST_ITEM)
            .setOrigin(0.5);

        this.tooltip = scene.add.text(0, -40, fullName, TextStyles.RANKING.TOOLTIP)
            .setOrigin(0.5, 1)
            .setAlpha(0);

        this.add([this.nameText, this.pointsText, this.tooltip]);

        this.setSize(80, 80);
        this.setInteractive()
            .on('pointerover', () => this.showTooltip(true))
            .on('pointerout', () => this.showTooltip(false));

        scene.add.existing(this);
    }

    truncateName(name) {
        if (name.length > 5) {
            return name.substring(0, 5) + '...';
        }
        return name;
    }

    showTooltip(isVisible) {
        this.scene.tweens.add({
            targets: this.tooltip,
            alpha: isVisible ? 1 : 0,
            y: isVisible ? -50 : -40,
            duration: 200,
            overwrite: true
        });
    }
}
