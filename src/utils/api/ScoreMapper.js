import { Score } from '../../models/Score';

export class ScoreMapper {
    static toDomain(apiResponse) {
        const { data } = apiResponse;
        if (Array.isArray(data)) {
            return data.map(item => this._mapSingleItem(item));
        }
        return this._mapSingleItem(data);
    }

    static _mapSingleItem(item) {
        const username = item.username
        const points = item.points
        const date = item.date

        return new Score(username, points, date);
    }
}