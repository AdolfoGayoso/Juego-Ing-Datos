export const TextStyles = {
    RANKING: {
        PODIUM_NAME: { fontFamily: 'Courier, monospace', fontSize: '70px', color: '#ffffff', stroke: '#000000', strokeThickness: 10 },
        LIST_ITEM: { fontFamily: 'Courier, monospace', fontSize: '35px', color: '#ffffff', stroke: '#000000', strokeThickness: 3 },
        TOOLTIP: { fontFamily: 'Courier, monospace', fontSize: '35px', color: '#ffffff', backgroundColor: '#000000', padding: { x: 8, y: 4 } }
    },
    GAME_OVER: {
        TITLE: { fontFamily: 'Courier, monospace', fontSize: '50px', fontWeight: 'bold', align: 'center', stroke: '#000000', strokeThickness: 10 },
        SCORE_LABEL: { fontFamily: 'Courier, monospace', fontSize: '50px', color: '#ffffff', stroke: '#000000', strokeThickness: 10, align: 'left' }
    },
    SCORE_BOARD: {
        MAIN: {
            fontFamily: '"Press Start 2P"',
            fontSize: '50px',
            color: '#c90f0f',
            stroke: '#000000',
            strokeThickness: 8,
            shadow: { offsetX: 4, offsetY: 4, color: '#000', blur: 0, stroke: true, fill: true }
        },
        FLYING: { fontFamily: '"Press Start 2P"', fontSize: '45px', color: '#c90f0fff', stroke: '#000000', strokeThickness: 8 },
        STREAK: { fontFamily: '"Press Start 2P"', fontSize: '40px', color: '#c90f0fff', stroke: '#000000', strokeThickness: 8 }
    },
    UI: {
        INPUT_TEXT: { fontFamily: 'Courier, monospace', fontSize: '30px', color: '#f8f8f8' },
        INPUT_PLACEHOLDER: { fontFamily: 'Courier, monospace', fontSize: '30px', color: '#999999' },
        PLAYER_COUNT: { fontSize: '20px', fill: '#000000' },
        PLAYER_TOOLTIP: { fontSize: '25px', fill: '#fff', backgroundColor: '#000000', padding: { x: 8, y: 4 } },
        LOADING: { fontFamily: 'Courier, monospace', fontSize: '30px', fill: '#ffffff' },
        LOADING_PERCENT: { fontFamily: 'Courier, monospace', fontSize: '24px', fill: '#ffffff' },
        VOLUME_VALUE: { fontSize: '60px', color: '#ffffff' }
    }
};
