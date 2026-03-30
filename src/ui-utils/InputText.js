import { TextStyles } from './TextStyles';

export default class InputText {
    constructor(scene, x, y, width, height, config = {}) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = '';
        this.isFocused = false;
        this.cursorVisible = true;
        this.maxLength = config.maxLength || 50;
        this.isEnabled = true;

        this.background = scene.add.graphics();
        this.drawBackground();

        this.hitZone = scene.add.zone(x, y, width, height)
            .setInteractive({ useHandCursor: true });

        const textX = x - width / 2 + 10;
        const textY = y;

        this.displayText = scene.add.text(textX, textY, '', TextStyles.UI.INPUT_TEXT)
            .setOrigin(0, 0.5);

        this.cursor = scene.add.text(textX - 5, textY, '|', TextStyles.UI.INPUT_TEXT)
            .setOrigin(0, 0.5)
            .setVisible(false);

        this.placeholder = scene.add.text(textX, textY, config.placeholder || '', TextStyles.UI.INPUT_PLACEHOLDER).setOrigin(0, 0.5);

        this.hitZone.on('pointerdown', () => this.focus());
        scene.input.on('pointerdown', (pointer, gameObjects) => {
            if (!this.isEnabled) return;
            if (!gameObjects.includes(this.hitZone)) {
                this.blur();
            }
        });

        this.keyboardListener = (event) => this.handleKeydown(event);
        scene.input.keyboard.on('keydown', this.keyboardListener);

        this.cursorTimer = scene.time.addEvent({
            delay: 500,
            callback: () => {
                if (this.isFocused) {
                    this.cursorVisible = !this.cursorVisible;
                    this.cursor.setVisible(this.cursorVisible);
                }
            },
            loop: true
        });
    }

    setText(text) {
        this.text = text;
        this.updateDisplay();
    }

    drawBackground() {
        this.background.clear();

        this.background.fillStyle(0x000000);

        this.background.lineStyle(3, 0xe8e8e8);

        this.background.fillRoundedRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 12);
        this.background.strokeRoundedRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 12);
    }

    handleKeydown(event) {
        if (!this.isFocused || !this.isEnabled) return;

        if (event.key === 'Backspace') {
            this.text = this.text.slice(0, -1);
        } else if (event.key.length === 1 && this.text.length < this.maxLength) {
            this.text += event.key;
        }

        this.updateDisplay();
    }

    updateDisplay() {
        this.displayText.setText(this.text);
        this.placeholder.setVisible(this.text.length === 0);

        const textWidth = this.displayText.width;
        this.cursor.setX(this.displayText.x + textWidth - 5);
    }

    focus() {
        if (!this.isEnabled) return;
        this.isFocused = true;
        this.cursor.setVisible(true);
        this.drawBackground();
    }

    blur() {
        this.isFocused = false;
        this.cursor.setVisible(false);
        this.drawBackground();
    }

    getText() {
        return this.text;
    }

    setText(value) {
        this.text = value;
        this.updateDisplay();
    }

    setEnabled(enabled) {
        this.isEnabled = enabled;
        if (!enabled) {
            this.blur();
            this.hitZone.disableInteractive();
        } else {
            this.hitZone.setInteractive({ useHandCursor: true });
        }
    }

    destroy() {
        this.scene.input.keyboard.off('keydown', this.keyboardListener);
        if (this.cursorTimer) this.cursorTimer.remove();
        this.background.destroy();
        this.hitZone.destroy();
        this.displayText.destroy();
        this.placeholder.destroy();
        this.cursor.destroy();
    }
}