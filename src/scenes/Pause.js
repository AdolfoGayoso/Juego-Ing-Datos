import Base from './Base';

import { ASSETS } from '../utils/assets-paths';
import { KEYS } from '../utils/keys';

export default class Pause extends Base {

    audioScene;

    constructor() {
        super(KEYS.SCENES.PAUSE);
    }

    create() {
        super.create();

        this.audioScene = this.scene.get(KEYS.SCENES.AUDIO);
        this.audioScene.pauseAllMusic();

        this.input.setDefaultCursor('default');

        this.add.image(this.width * 0.5, this.height * 0.5, ASSETS.BACKGROUNDS.PAUSE.KEY)
            .setOrigin(0.5);

        const x_pos = this.width * 0.5;
        const y_pos = this.height * 0.55;

        const delta_x = this.width * 0.15;

        // Quit
        this.createButton(
            x_pos - delta_x,
            y_pos,
            ASSETS.BUTTONS.PAUSE.QUIT_GAME.KEY,
            ASSETS.BUTTONS.PAUSE.QUIT_GAME_HOVER.KEY,
            () => {
                this.input.setDefaultCursor('default');
                this.scene.stop(KEYS.SCENES.GAME);
                this.audioScene.stopAllMusic();
                this.audioScene.playMenuMusic();
                this.scene.start(KEYS.SCENES.MAIN_MENU);
            }
        );

        // Resume
        this.createButton(
            x_pos,
            y_pos,
            ASSETS.BUTTONS.PAUSE.RESUME_GAME.KEY,
            ASSETS.BUTTONS.PAUSE.RESUME_GAME_HOVER.KEY,
            () => {
                this.input.setDefaultCursor('none');
                this.scene.resume(KEYS.SCENES.GAME);
                this.audioScene.resumeMusic();
                this.scene.stop();
            }
        );

        // Settings
        this.createButton(
            x_pos + delta_x,
            y_pos,
            ASSETS.BUTTONS.PAUSE.SETTINGS.KEY,
            ASSETS.BUTTONS.PAUSE.SETTINGS_HOVER.KEY,
            () => {
                this.input.setDefaultCursor('default');
                this.scene.sleep(KEYS.SCENES.PAUSE);
                this.scene.launch(KEYS.SCENES.SETTINGS, { returnScene: KEYS.SCENES.PAUSE });
                this.scene.bringToTop(KEYS.SCENES.SETTINGS);
            }
        )

    }
}