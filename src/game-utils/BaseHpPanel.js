import { ASSETS } from '../utils/assets-paths';
import { KEYS } from '../utils/keys';

export default class BaseHpPanel extends Phaser.Physics.Arcade.Sprite {

    flagAnim;
    hp = 5;

    constructor(scene, x, y) {
        super(scene, x, y, ASSETS.SPRITESHEETS.BASE_HP_PANEL.KEY);

        scene.add.existing(this);

        this.setScale(0.75)

        this.setFrame(0);
        this.setDepth(1000);

        this.flagAnim = scene.add.sprite(x + 34, y - 200, ASSETS.SPRITESHEETS.FLAG_HP_PANEL.KEY);
        this.flagAnim.setScale(1.5);
        this.flagAnim.setDepth(999);
        this.flagAnim.play(KEYS.ANIMATIONS.FLAG_HP_PANEL);

    }

    takeDamage() {
        const offsetX = Phaser.Math.Between(-20, 20);
        const offsetY = Phaser.Math.Between(-20, 20);

        this.shakeHPPanel(offsetX, offsetY);
        this.shakeFlag(offsetX, offsetY);
        this.hp--;
        this.setBaseHpFrame(this.hp);

        if (this.hp <= 0) {
            this.scene.game.events.emit(KEYS.GAME_EVENTS.GAME_OVER);
        }
    }

    setBaseHpFrame(baseHp) {
        if (baseHp <= 0) return;
        this.setFrame(5 - baseHp);
    }

    shakeHPPanel(offsetX, offsetY) {
        if (this.scene.tweens.isTweening(this)) return;

        this.scene.tweens.add({
            targets: this,
            x: this.x + offsetX,
            y: this.y + offsetY,
            duration: 50,
            yoyo: true,
            repeat: 3,
            ease: 'Sine.easeInOut'
        });
    }

    shakeFlag(offsetX, offsetY) {
        if (this.scene.tweens.isTweening(this.flagAnim)) return;

        this.scene.tweens.add({
            targets: this.flagAnim,
            x: this.flagAnim.x + offsetX,
            y: this.flagAnim.y + offsetY,
            duration: 50,
            yoyo: true,
            repeat: 3,
            ease: 'Sine.easeInOut'
        });
    }
}   