import { ASSETS } from '../utils/assets-paths';
import { KEYS } from '../utils/keys';

export default class AmmoPanel extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.SPRITESHEETS.AMMO_PANEL.KEY);

        scene.add.existing(this);

        this.setFrame(0);
        this.setDepth(1000);

        scene.events.on(KEYS.REGISTRY.EVENTS.CHANGE_AMMO_COUNT, this.setAmmoFrame, this);
        scene.events.on(KEYS.REGISTRY.EVENTS.NO_AMMO, this.shakeAmmoPanel, this);

        this.on('destroy', () => {
            this.scene.events.off(KEYS.REGISTRY.EVENTS.CHANGE_AMMO_COUNT);
            this.scene.events.off(KEYS.REGISTRY.EVENTS.NO_AMMO);
        });
    }

    setAmmoFrame(ammoCount) {
        this.setFrame(5 - ammoCount);
    }

    shakeAmmoPanel() {
        if (this.scene.tweens.isTweening(this)) return;
        this.scene.tweens.add({
            targets: this,
            x: this.x + Phaser.Math.Between(-20, 20),
            y: this.y + Phaser.Math.Between(-20, 20),
            duration: 20,
            yoyo: true,
            repeat: 2,
            ease: 'Sine.easeInOut',
        });
    }
}