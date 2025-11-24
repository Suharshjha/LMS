// // src/lib/api.ts
// export const API_BASE_URL = "http://localhost:8080";
//
// export async function apiFetch(
//     path: string,
//     options: RequestInit = {},
//     token?: string | null
// ) {
//     const headers: HeadersInit = {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//     };
//
//     if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//     }
//
//     const res = await fetch(`${API_BASE_URL}${path}`, {
//         ...options,
//         headers,
//     });
//
//     if (!res.ok) {
//         const msg = await res.text().catch(() => "Request failed");
//         throw new Error(msg || `Request failed with status ${res.status}`);
//     }
//
//     if (res.status === 204) return null; // no content
//     return res.json();
// }


import { useAuth } from "@/contexts/AuthContext";
//
// export const apiFetch = async (url: string, options: RequestInit = {}) => {
//     const userData = JSON.parse(localStorage.getItem("lms_user") || "null");
//     const token = userData?.token;
//
//     const headers = {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...options.headers,
//     };
//
//     const response = await fetch(`http://localhost:8080${url}`, {
//         ...options,
//         headers,
//     });
//
//     if (!response.ok) {
//         const text = await response.text();
//         throw new Error(text || "API Error");
//     }
//
//     let text = await response.text();
//
//     try {
//         return JSON.parse(text);  // if JSON → OK
//     } catch {
//         return text; // if plain text → return as string
//     }
//
// };

export const apiFetch = async (url: string, options: RequestInit = {}) => {
    const userData = JSON.parse(localStorage.getItem("lms_user") || "null");
    const token = userData?.token;

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    console.log("📡 API Request:", `http://localhost:8080${url}`);

    const response = await fetch(`http://localhost:8080${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const text = await response.text();
        console.error(" API Error:", text);
        throw new Error(text || "API Error");
    }

    // ---- FIX: some endpoints return empty or plain text ----
    const raw = await response.text();

    if (!raw) return "";                    // empty response
    if (raw.startsWith("{") || raw.startsWith("[")) {
        try {
            return JSON.parse(raw);         // valid JSON
        } catch {
            return raw;                     // fallback
        }
    }

    return raw;                             // plain text response
};
