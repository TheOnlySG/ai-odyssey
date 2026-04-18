const API_BASE = 'http://localhost:3001/api';

export const generateBlueprint = async (idea) => {
    const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.details || error.error || 'Failed to generate');
    }
    return res.json();
};

export const getHistory = async () => {
    const res = await fetch(`${API_BASE}/history`);
    if (!res.ok) throw new Error('Failed to load history');
    return res.json();
};

export const getHistoryItem = async (id) => {
    const res = await fetch(`${API_BASE}/history/${id}`);
    if (!res.ok) throw new Error('Failed to load item');
    return res.json();
};

export const chatWithAssistant = async (message, blueprintContext, history) => {
    const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, blueprintContext, history })
    });
    if (!res.ok) {
        throw new Error('Failed to send message');
    }
    return res.json();
};
