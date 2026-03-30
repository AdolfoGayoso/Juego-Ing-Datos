import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { KEYS } from "../keys";

let stompClient = null;

export const playerCountSocket = {
    connect: (scene) => {
        if (stompClient && stompClient.connected) return;
        const socket = new SockJS((import.meta.env.VITE_API_URL || "http://127.0.0.1:8080") + "/ws-players");
        stompClient = Stomp.over(socket);
        stompClient.debug = null;

        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/players", (message) => {
                let count = parseInt(message.body);
                if (count == 0) count = 1;
                scene.registry.set(KEYS.REGISTRY.ONLINE_PLAYERS_COUNT, count);
            });
        });
    }
};