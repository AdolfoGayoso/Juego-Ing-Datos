import { KEYS } from "../utils/keys";

export default class StatsManager {
    constructor(scene, score = 0) {
        this.scene = scene;

        this.score = score;
        this.bestStreak = 0;
        this.killCount = 0;
        this.headshotCount = 0;

        this.startTime = this.scene.time.now;

        this.scene.game.events.on(KEYS.GAME_EVENTS.ZOMBIE_KILLED, () => {
            this.killCount++;
        });

        this.scene.game.events.on(KEYS.GAME_EVENTS.HEADSHOT_KILL, () => {
            this.headshotCount++;
        });
    }

    getStats(score, bestStreak) {
        const duration = this.scene.time.now - this.startTime;
        return {
            score: score,
            bestStreak: bestStreak,
            killCount: this.killCount,
            headshotCount: this.headshotCount,
            timePlayed: duration
        };
    }
}