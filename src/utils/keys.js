export const KEYS = {
    LOCAL_STORAGE: {
        MUSIC_VOLUME: 'music-volume',
        SFX_VOLUME: 'sfx-volume',
        LAST_USERNAME: 'last-username'
    },

    GAME_EVENTS: {
        ADD_SCORE: 'add-score',
        ZOMBIE_BREACH: 'zombie-breached',
        GAME_OVER: 'game-over',
        UPDATE_STREAK: 'update-streak',
        ZOMBIE_KILLED: 'zombie-killed',
        HEADSHOT_KILL: 'headshot-kill'
    },

    REGISTRY: {
        MUSIC_VOLUME: 'music-volume',
        SFX_VOLUME: 'sfx-volume',
        EVENTS: {
            CHANGE_MUSIC_VOLUME: 'changedata-music-volume',
            CHANGE_SFX_VOLUME: 'changedata-sfx-volume',
            CHANGE_AMMO_COUNT: 'changedata-ammo-count',
            NO_AMMO: 'changedata-no-ammo',
            SOUNDS: {
                ZOMBIE_DEATH: 'zombie-death-sound',
                HEADSHOT_KILL: 'headshot-kill-sound',
                STAT_LOAD: 'stat-load-sound'
            },
            CHANGE_ONLINE_PLAYERS_COUNT: 'changedata-online-players-count'
        },
        ONLINE_PLAYERS_COUNT: 'online-players-count'
    },
    SCENES: {
        BOOT: 'boot',
        AUDIO: 'audio',
        MAIN_MENU: 'main-menu',
        SETTINGS: 'settings',
        GAME: 'game',
        RANKING: 'ranking',
        TUTORIAL: 'tutorial',
        PAUSE: 'pause',
        GAME_OVER: 'game-over'
    },
    ANIMATIONS: {
        CROSSHAIR_SHOT: 'crosshair-shot',
        CROSSHAIR_RELOAD: 'crosshair-reload',
        FLAG_HP_PANEL: 'flag-hp-panel',

        ZOMBIES: {

            DESPAWN: 'zombie-despawn-anim',
            1: {
                WALK: 'zombie-1-walk-anim',
                DEATH: 'zombie-1-death-anim'
            },
            2: {
                WALK: 'zombie-2-walk-anim',
                DEATH: 'zombie-2-death-anim'
            },
            3: {
                WALK: 'zombie-3-walk-anim',
                DEATH: 'zombie-3-death-anim'
            },
            4: {
                WALK: 'zombie-4-walk-anim',
                DEATH: 'zombie-4-death-anim'
            }
        }
    },
}

