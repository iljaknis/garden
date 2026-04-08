const API_BASE = "/api";

// --- Auth ---

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

// --- Notes ---

export type Tag = "TAG1" | "TAG2" | "TAG3";

export interface Note {
    id: string;
    title: string;
    content: string;
    tags: Tag[];
    creationDate: string;
    updateDate: string | null;
}

export interface NoteRequest {
    title: string;
    content: string;
    tags: Tag[];
}

export async function fetchNotes(sort?: string): Promise<Note[]> {
    const params = sort ? `?sort=${sort}` : "";
    const response = await fetch(`${API_BASE}/notes${params}`);
    if (!response.ok) throw new Error(`Failed to fetch notes: ${response.status}`);
    return response.json();
}

export async function searchNotes(q?: string, tag?: Tag, sort?: string): Promise<Note[]> {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (tag) params.set("tag", tag);
    if (sort) params.set("sort", sort);
    const response = await fetch(`${API_BASE}/notes/search?${params}`);
    return response.json();
}

export async function createNote(note: NoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function updateNote(id: string, note: NoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(id: string): Promise<void> {
    await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
}

