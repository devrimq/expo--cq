// lib/types.ts

export interface Message {
    sender: string;
    avatar: string;
    text: string;
    timestamp: string;
}

export interface User {
    username: string;
    avatar: string;
    id?: string;
}

// 👇 Bu kısmı ekle
export type RootStackParamList = {
    Auth: undefined;
    Chat: { username: string; avatar: string };
};
