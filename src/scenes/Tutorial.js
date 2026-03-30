import Base from './Base'

import { ASSETS } from '../utils/assets-paths'
import { KEYS } from '../utils/keys'

export default class Tutorial extends Base {
    constructor() {
        super(KEYS.SCENES.TUTORIAL)
    }

    create() {
        this.addBackground(ASSETS.BACKGROUNDS.TUTORIAL.KEY);
        this.input.once('pointerdown', this.startGame, this);
    }

    startGame() {
        this.scene.start(KEYS.SCENES.GAME);
    }
}
