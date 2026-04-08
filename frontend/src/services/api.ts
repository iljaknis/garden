const API_BASE = "/api";

export interface LoginResponse {
    success: boolean;
    message: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

export async function fetchNotes(): Promise<unknown[]> {
    const response = await fetch(`${API_BASE}/notes`);
    return response.json();
}

