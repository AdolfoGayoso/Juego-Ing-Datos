import Base from './Base'

import { ASSETS } from '../utils/assets-paths'
import { KEYS } from '../utils/keys'

import PlayerCounter from '../ui-utils/PlayerCounter'

export default class MainMenu extends Base {
    constructor() {
        super(KEYS.SCENES.MAIN_MENU)
    }

    create() {

        super.create();

        this.addBackground(ASSETS.BACKGROUNDS.MENU.KEY);

        this.createButton(this.width * 0.5, this.height * 0.45, ASSETS.BUTTONS.MENU.PLAY.KEY, ASSETS.BUTTONS.MENU.PLAY_HOVER.KEY, KEYS.SCENES.TUTORIAL);
        this.createButton(this.width * 0.5, this.height * 0.6, ASSETS.BUTTONS.MENU.SETTINGS.KEY, ASSETS.BUTTONS.MENU.SETTINGS_HOVER.KEY, KEYS.SCENES.SETTINGS);
        this.createButton(this.width * 0.5, this.height * 0.75, ASSETS.BUTTONS.MENU.RANKING.KEY, ASSETS.BUTTONS.MENU.RANKING_HOVER.KEY, KEYS.SCENES.RANKING);

        this.createFullscreenButton(this.width * 0.95, this.width * 0.05);

        this.playerCounter = new PlayerCounter(this, this.width * 0.05, this.height * 0.08);
        this.registry.events.on(KEYS.REGISTRY.EVENTS.CHANGE_ONLINE_PLAYERS_COUNT, (parent, value) => {
            if (this.playerCounter && this.playerCounter.active) {
                this.playerCounter.updateCount(value);
            }
        });
    }
}