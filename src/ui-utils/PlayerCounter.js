import { ASSETS } from "../utils/assets-paths";
import { KEYS } from "../utils/keys";
import { TextStyles } from "./TextStyles";

export default class PlayerCounter extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.icon = scene.add.image(0, 0, ASSETS.BUTTONS.MENU.PLAYER_COUNT.KEY).setOrigin(0.5);

        this.statusRow = scene.add.container(0, 35);
        this.statusDot = scene.add.circle(0, 0, 5, 0x00ff00).setOrigin(0.5);
        const initialCount = scene.registry.get(KEYS.REGISTRY.ONLINE_PLAYERS_COUNT) || 1;
        this.countText = scene.add.text(12, 0, initialCount, TextStyles.UI.PLAYER_COUNT).setOrigin(0, 0.5);

        this.statusRow.add([this.statusDot, this.countText]);

        this.tooltip = scene.add.text(50, 0, "Jugadores Online", TextStyles.UI.PLAYER_TOOLTIP).setOrigin(0, 0.5).setAlpha(0);

        this.add([this.icon, this.statusRow, this.tooltip]);

        this.centerStatusRow();

        this.setSize(90, 90);
        this.setInteractive()
            .on('pointerover', () => this.showTooltip(true))
            .on('pointerout', () => this.showTooltip(false));

        scene.add.existing(this);
    }

    centerStatusRow() {
        const totalWidth = this.countText.x + this.countText.width;
        this.statusRow.x = -(totalWidth / 2);
    }

    showTooltip(isVisible) {
        this.scene.tweens.add({
            targets: this.tooltip,
            alpha: isVisible ? 1 : 0,
            x: isVisible ? 60 : 50,
            duration: 200,
            overwrite: true
        });
    }

    updateCount(value) {
        if (this.countText) {
            this.countText.setText(value);
            this.centerStatusRow();
        }
    }
}