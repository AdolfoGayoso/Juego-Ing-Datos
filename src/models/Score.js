export class Score {
    constructor(username, points, date) {
        this.username = username;
        this.points = points;
        this.date = date;
    }

    getUserName() {
        return this.username;
    }

    getPoints() {
        return this.points;
    }

    getDate() {
        return this.date;
    }
}