import { api } from '@/lib/axios';
import { Message } from '@/components/chat/ChatMessages';

export interface SendMessagePayload {
    sessionId: string;
    content: string;
    type: 'text' | 'audio';
    audioBlob?: Blob;
}

export interface AiResponse {
    content: string;
    audioUrl?: string;
}

export interface CreateChatPayload {
    title: string;
    type: ChatType;
    tags: string[];
}

export interface ChatSession {
    id: string;
    title: string;
    type: ChatType;
    tags: string[];
    createdAt: string;
}

export enum ChatType {
    TECH_INTERVIEW = 'TECH_INTERVIEW',
    ENGLISH_PRACTICE = 'ENGLISH_PRACTICE',
}


export const chatService = {
    async createSession(data: CreateChatPayload): Promise<ChatSession> {
        const response = await api.post<ChatSession>('/chats', data);
        return response.data;
    },

    async getMessagesChatById(id: string): Promise<Message[]> {
        const response = await api.get<Message[]>(`/messages/chat/${id}`);
        return response.data;
    },

    async getChatById(id: string): Promise<ChatSession> {
        const response = await api.get<ChatSession>(`/chats/${id}`);
        return response.data;
    },

    async sendMessage(payload: SendMessagePayload): Promise<Message> {

        let response;

        if (payload.type === 'audio' && payload.audioBlob) {
            const formData = new FormData();
            formData.append('sessionId', payload.sessionId);

            formData.append('file', payload.audioBlob, 'recording.webm');

            response = await api.post<AiResponse>('/chat/audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        else {
            response = await api.post<AiResponse>('/chat/text', {
                sessionId: payload.sessionId,
                content: payload.content,
            });
        }

        return {
            id: Date.now().toString(),
            role: 'ai',
            type: response.data.audioUrl ? 'audio' : 'text',
            content: response.data.content,
            audioUrl: response.data.audioUrl,
            createdAt: new Date(),
        };
    }
};