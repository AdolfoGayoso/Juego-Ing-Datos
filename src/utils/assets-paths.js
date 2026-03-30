const BASE_PATH = 'assets'

const IMAGES_PATH = `${BASE_PATH}/images`
const AUDIO_PATH = `${BASE_PATH}/audio`

const BUTTONS_PATH = `${IMAGES_PATH}/buttons`

const SFX_PATH = `${AUDIO_PATH}/sfx`
const MUSIC_PATH = `${AUDIO_PATH}/music`

const FOLDERS = {
    BG: `${IMAGES_PATH}/backgrounds`,
    BTNS_MENU: `${BUTTONS_PATH}/main-menu`,
    BTNS_UI: `${BUTTONS_PATH}/ui`,
    BTNS_PAUSE: `${BUTTONS_PATH}/pause`,
    BTNS_SETTINGS: `${BUTTONS_PATH}/settings`,
    BTNS_GAME_OVER: `${BUTTONS_PATH}/game-over`,
    BTNS_RANKING: `${BUTTONS_PATH}/ranking`,

    SHEETS: `${IMAGES_PATH}/sprite-sheets`,

    MUSIC: MUSIC_PATH,
    SFX_GAME: `${SFX_PATH}/gameplay`,
    SFX_UI: `${SFX_PATH}/ui`,

    SFX_ZOMBIE_DEATHS: `${SFX_PATH}/zombie-deaths`,

    SPRITESHEETS: `${IMAGES_PATH}/sprite-sheets`
};

const getPath = (folder, fileName) => `${folder}/${fileName}`;

export const ASSETS = Object.freeze({
    BACKGROUNDS: {
        MENU: { KEY: 'menu-bg', PATH: getPath(FOLDERS.BG, 'menu-bg.png') },
        SETTINGS: { KEY: 'settings-bg', PATH: getPath(FOLDERS.BG, 'settings-bg.png') },
        RANKING: { KEY: 'ranking-bg', PATH: getPath(FOLDERS.BG, 'ranking-bg.png') },
        TUTORIAL: { KEY: 'tutorial-bg', PATH: getPath(FOLDERS.BG, 'tutorial-bg.png') },
        PAUSE: { KEY: 'pause-bg', PATH: getPath(FOLDERS.BG, 'pause-bg.png') },
        GAME: { KEY: 'game-bg', PATH: getPath(FOLDERS.BG, 'game-bg.png') },
        GAME_OVER: { KEY: 'game-over-bg', PATH: getPath(FOLDERS.BG, 'game-over-bg.png') }
    },

    BUTTONS: {
        MENU: {
            PLAY: { KEY: 'play-btn', PATH: getPath(FOLDERS.BTNS_MENU, 'play-btn.png') },
            PLAY_HOVER: { KEY: 'play-btn-hover', PATH: getPath(FOLDERS.BTNS_MENU, 'play-btn-hover.png') },

            SETTINGS: { KEY: 'settings-btn', PATH: getPath(FOLDERS.BTNS_MENU, 'settings-btn.png') },
            SETTINGS_HOVER: { KEY: 'settings-btn-hover', PATH: getPath(FOLDERS.BTNS_MENU, 'settings-btn-hover.png') },

            RANKING: { KEY: 'ranking-btn', PATH: getPath(FOLDERS.BTNS_MENU, 'ranking-btn.png') },
            RANKING_HOVER: { KEY: 'ranking-btn-hover', PATH: getPath(FOLDERS.BTNS_MENU, 'ranking-btn-hover.png') },

            FULLSCREEN_TOGGLE_ON: { KEY: 'fullscreen-toggle-on-btn', PATH: getPath(FOLDERS.BTNS_MENU, 'fullscreen-toggle-on-btn.png') },
            FULLSCREEN_TOGGLE_ON_HOVER: { KEY: 'fullscreen-toggle-on-btn-hover', PATH: getPath(FOLDERS.BTNS_MENU, 'fullscreen-toggle-on-btn-hover.png') },

            FULLSCREEN_TOGGLE_OFF: { KEY: 'fullscreen-toggle-off-btn', PATH: getPath(FOLDERS.BTNS_MENU, 'fullscreen-toggle-off-btn.png') },
            FULLSCREEN_TOGGLE_OFF_HOVER: { KEY: 'fullscreen-toggle-off-btn-hover', PATH: getPath(FOLDERS.BTNS_MENU, 'fullscreen-toggle-off-btn-hover.png') },

            PLAYER_COUNT: { KEY: 'player-count', PATH: getPath(FOLDERS.BTNS_MENU, 'player-count.png') },
        },
        UI: {
            BACK: { KEY: 'back-btn', PATH: getPath(FOLDERS.BTNS_UI, 'back-btn.png') },
            BACK_HOVER: { KEY: 'back-btn-hover', PATH: getPath(FOLDERS.BTNS_UI, 'back-btn-hover.png') },
        },
        PAUSE: {
            QUIT_GAME: { KEY: 'quit-game-btn', PATH: getPath(FOLDERS.BTNS_PAUSE, 'quit-game-btn.png') },
            QUIT_GAME_HOVER: { KEY: 'quit-game-btn-hover', PATH: getPath(FOLDERS.BTNS_PAUSE, 'quit-game-btn-hover.png') },
            RESUME_GAME: { KEY: 'resume-game-btn', PATH: getPath(FOLDERS.BTNS_PAUSE, 'resume-game-btn.png') },
            RESUME_GAME_HOVER: { KEY: 'resume-game-btn-hover', PATH: getPath(FOLDERS.BTNS_PAUSE, 'resume-game-btn-hover.png') },
            SETTINGS: { KEY: 'pause-settings-btn', PATH: getPath(FOLDERS.BTNS_PAUSE, 'pause-settings-btn.png') },
            SETTINGS_HOVER: { KEY: 'pause-settings-btn-hover', PATH: getPath(FOLDERS.BTNS_PAUSE, 'pause-settings-btn-hover.png') },
        },
        SETTINGS: {
            APPLY: { KEY: 'apply-btn', PATH: getPath(FOLDERS.BTNS_SETTINGS, 'apply-btn.png') },
            APPLY_HOVER: { KEY: 'apply-btn-hover', PATH: getPath(FOLDERS.BTNS_SETTINGS, 'apply-btn-hover.png') },
        },
        GAME_OVER: {
            UPLOAD_SCORE: { KEY: 'upload-score-btn', PATH: getPath(FOLDERS.BTNS_GAME_OVER, 'upload-score-btn.png') },
            UPLOAD_SCORE_HOVER: { KEY: 'upload-score-btn-hover', PATH: getPath(FOLDERS.BTNS_GAME_OVER, 'upload-score-btn-hover.png') },
            PLAY_AGAIN: { KEY: 'play-again-btn', PATH: getPath(FOLDERS.BTNS_GAME_OVER, 'play-again-btn.png') },
            PLAY_AGAIN_HOVER: { KEY: 'play-again-btn-hover', PATH: getPath(FOLDERS.BTNS_GAME_OVER, 'play-again-btn-hover.png') },
            SKULL_ON: { KEY: 'skull-on', PATH: getPath(FOLDERS.BTNS_GAME_OVER, 'skull-on.png') },
            SKULL_OFF: { KEY: 'skull-off', PATH: getPath(FOLDERS.BTNS_GAME_OVER, 'skull-off.png') },
        },
        RANKING: {
            SEE_ALL_SCORES: { KEY: 'see-all-scores-btn', PATH: getPath(FOLDERS.BTNS_RANKING, 'see-all-scores-btn.png') },
            SEE_ALL_SCORES_HOVER: { KEY: 'see-all-scores-btn-hover', PATH: getPath(FOLDERS.BTNS_RANKING, 'see-all-scores-btn-hover.png') },
        }
    },

    AUDIO: {
        SFX: {
            UI: {
                BTN_CLICK: { KEY: 'btn-click', PATH: getPath(FOLDERS.SFX_UI, 'btn-click.mp3') },
                BTN_HOVER: { KEY: 'btn-hover', PATH: getPath(FOLDERS.SFX_UI, 'btn-hover.mp3') },
                VOLUME_CHANGE: { KEY: 'volume-change', PATH: getPath(FOLDERS.SFX_UI, 'volume-change.mp3') },
                // Special case for zombie deaths, as they are 96 files
                ZOMBIE_DEATHS: { BASE_NAME: 'zombie-death-sound-', FOLDER: FOLDERS.SFX_ZOMBIE_DEATHS, COUNT: 96 },
                STAT_LOAD: { KEY: 'stat-load', PATH: getPath(FOLDERS.SFX_UI, 'stat-load.mp3') },
            },
            GAMEPLAY: {
                SHOOT: { KEY: 'shoot', PATH: getPath(FOLDERS.SFX_GAME, 'shoot.mp3') },
                RELOAD: { KEY: 'reload', PATH: getPath(FOLDERS.SFX_GAME, 'reload.mp3') },
                NO_AMMO: { KEY: 'no-ammo', PATH: getPath(FOLDERS.SFX_GAME, 'no-ammo.mp3') },
                HEADSHOT_KILL: { KEY: 'headshot-kill', PATH: getPath(FOLDERS.SFX_GAME, 'headshot-kill.mp3') }
            }
        },
        MUSIC: {
            MENU: { KEY: 'menu-music', PATH: getPath(FOLDERS.MUSIC, 'menu-music.mp3') },
            GAMEPLAY: { KEY: 'gameplay-music', PATH: getPath(FOLDERS.MUSIC, 'gameplay-music.mp3') }
        }
    },

    SPRITESHEETS: {
        CROSSHAIR: {
            KEY: 'crosshair',
            PATH: getPath(FOLDERS.SPRITESHEETS, 'crosshair.png'),
        },
        AMMO_PANEL: {
            KEY: 'ammo-panel',
            PATH: getPath(FOLDERS.SPRITESHEETS, 'ammo-panel.png'),
        },
        BASE_HP_PANEL: {
            KEY: 'base-hp-panel',
            PATH: getPath(FOLDERS.SPRITESHEETS, 'base-hp-panel.png'),
        },
        FLAG_HP_PANEL: {
            KEY: 'base-hp-panel-flag',
            PATH: getPath(FOLDERS.SPRITESHEETS, 'base-hp-panel-flag.png'),
        },
        ZOMBIE_DESPAWN: {
            KEY: 'zombie-despawn',
            PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-despawn.png'),
        },
        ZOMBIE_1: {
            WALK: {
                KEY: 'zombie-1-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-1-walk.png'),
            },
            DEATH: {
                KEY: 'zombie-1-death-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-1-death.png'),
            }
        },
        ZOMBIE_2: {
            WALK: {
                KEY: 'zombie-2-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-2-walk.png'),
            },
            DEATH: {
                KEY: 'zombie-2-death-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-2-death.png'),
            }
        },
        ZOMBIE_3: {
            WALK: {
                KEY: 'zombie-3-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-3-walk.png'),
            },
            DEATH: {
                KEY: 'zombie-3-death-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-3-death.png'),
            }
        },
        ZOMBIE_4: {
            WALK: {
                KEY: 'zombie-4-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-4-walk.png'),
            },
            DEATH: {
                KEY: 'zombie-4-death-sprite',
                PATH: getPath(FOLDERS.SPRITESHEETS, 'zombie-4-death.png'),
            }
        }
    }

})