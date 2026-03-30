import Base from './Base';
import { ASSETS } from '../utils/assets-paths';
import { KEYS } from '../utils/keys';
import { scoreApi } from '../utils/api/score-service';
import RankingListItem from '../ui-utils/RankingListItem';
import { TextStyles } from '../ui-utils/TextStyles';

export default class Ranking extends Base {


    constructor() {
        super(KEYS.SCENES.RANKING);
    }

    async create() {
        super.create();
        this.setupVisuals();
        await this.loadAndDisplayScores();
    }

    setupVisuals() {
        this.addBackground(ASSETS.BACKGROUNDS.RANKING.KEY);
        this.backButton()

        this.createButton(this.width * 0.95, this.height * 0.1, ASSETS.BUTTONS.RANKING.SEE_ALL_SCORES.KEY, ASSETS.BUTTONS.RANKING.SEE_ALL_SCORES_HOVER.KEY, () => {
            window.open('/leaderboard.html', '_blank');
        });
    }

    async loadAndDisplayScores() {
        try {
            const scores = await scoreApi.getTopScores();

            if (Array.isArray(scores) && scores.length > 0) {
                this.displayPodium(scores.slice(0, 3));
                if (scores.length > 3) {
                    this.displayRemainingList(scores.slice(3, 10));
                }
            } else {
                this.displayError('No hay puntajes');
            }
        } catch (error) {
            this.displayError('Error de conexión');
        }
    }

    displayError(message) {
        this.add.text(this.width * 0.5, this.height * 0.85, message, TextStyles.RANKING.PODIUM_NAME)
            .setOrigin(0.5)
    }

    displayPodium(topScores) {
        const podiumSettings = [
            { x: this.width * 0.5, y: this.height * 0.55, color: '#FFD700' },
            { x: this.width * 0.19, y: this.height * 0.63, color: '#C0C0C0' },
            { x: this.width * 0.81, y: this.height * 0.63, color: '#CD7F32' }
        ];

        topScores.forEach((score, i) => {
            const { x, y, color } = podiumSettings[i];

            this.add.text(x, y, score.getUserName(), TextStyles.RANKING.PODIUM_NAME)
                .setOrigin(0.5)

            this.add.text(x, y + 70, String(score.getPoints()), { ...TextStyles.RANKING.PODIUM_NAME, color })
                .setOrigin(0.5)
        });
    }

    displayRemainingList(remainingScores) {
        const count = remainingScores.length;

        const sideMargin = this.width * 0.07;
        const availableWidth = this.width - (sideMargin * 2);

        const spacingX = count > 1 ? availableWidth / (count - 1) : 0;
        const startX = count > 1 ? sideMargin : this.width * 0.5;

        const startY = this.height * 0.84;

        remainingScores.forEach((score, i) => {
            const posX = startX + (i * spacingX);
            const rank = i + 4;

            new RankingListItem(this, posX, startY, rank, score);
        });
    }
}