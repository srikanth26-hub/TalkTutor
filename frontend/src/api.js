import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getVoices = async () => {
    try {
        const response = await axios.get(`${API_URL}/voices`);
        return response.data.voices;
    } catch (error) {
        console.error("Error fetching voices:", error);
        return null;
    }
};

export const generateAudio = async (text, voice, mood, pitch) => {
    try {
        const response = await axios.post(`${API_URL}/generate_audio`, {
            text, voice, mood, pitch
        });
        return response.data;
    } catch (error) {
        console.error("Error generating audio:", error);
        return null;
    }
};
export const chatWithAI = async (text, voice, mood, pitch) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, {
            text, voice, mood, pitch
        });
        return response.data;
    } catch (error) {
        console.error("Error chatting with AI:", error);
        return { error: "Failed to connect to AI" };
    }
};
