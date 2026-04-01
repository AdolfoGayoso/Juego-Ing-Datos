import './style.css'
import Phaser from 'phaser'

import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import Boot from './scenes/Boot'
import Audio from './scenes/Audio'
import MainMenu from './scenes/MainMenu'
import Settings from './scenes/Settings'
import Ranking from './scenes/Ranking'
import Tutorial from './scenes/Tutorial'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import Pause from './scenes/Pause'

const sizes = {
  width: 1920,
  height: 1080
}

const isDebug = import.meta.env.VITE_DEBUG_MODE === 'true';

const config = {
  type: Phaser.WEBGL,
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
      }
    ]
  },
  dom: {
    createContainer: true
  },
  parent: 'game-container',
  width: sizes.width,
  height: sizes.height,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  canvas: document.getElementById('gameCanvas'),
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    Boot,
    Audio,
    //MainMenu,
    Settings,
    //Ranking,
    Tutorial,
    Game,
    GameOver,
    Pause
  ]
}

const game = new Phaser.Game(config)
