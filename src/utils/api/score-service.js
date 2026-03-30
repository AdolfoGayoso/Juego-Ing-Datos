import axios from "axios";
import { ScoreMapper } from "./ScoreMapper";

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || "http://127.0.0.1:8080") + "/api/scores",
    headers: {
        "Content-Type": "application/json"
    }
});

export const scoreApi = {
    getTopScores: async () => {
        try {
            const response = await api.get('/top');
            if (response.data.status === 200) {
                return ScoreMapper.toDomain(response.data);
            }
            return [];
        } catch (error) {
            return [];
        }
    },

    searchScores: async (username) => {
        try {
            const response = await api.get('', { params: { username } });
            if (response.data.status === 200) {
                return ScoreMapper.toDomain(response.data);
            }
            return [];
        } catch (error) {
            return [];
        }
    },

    getAllScores: async () => {
        try {
            const response = await api.get('/all');
            if (response.data.status === 200) {
                return ScoreMapper.toDomain(response.data);
            }
            return [];
        } catch (error) {
            console.error("Failed to fetch all scores:", error);
            throw error;
        }
    },

    saveScore: async (username, points) => {
        try {
            const response = await api.post('', { username, points });
            if (response.data.status === 201 || response.data.status === 200) {
                return ScoreMapper.toDomain(response.data);
            }
            return null;
        } catch (error) {
            return null;
        }
    }
};