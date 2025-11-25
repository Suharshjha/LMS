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


// import { useAuth } from "@/contexts/AuthContext";
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
// src/lib/api.ts

// src/lib/api.ts

// export const API_BASE = "http://localhost:8080";
//
// export async function apiFetch(
//     endpoint: string,
//     options: RequestInit = {}
// ) {
//     const userStr = localStorage.getItem("lms_user");
//     const user = userStr ? JSON.parse(userStr) : null;
//
//     const token = user?.token; // <-- Correct token (jwtToken from AuthContext)
//
//     const headers: HeadersInit = {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//     };
//
//     // Attach JWT if present
//     if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//     }
//
//     const response = await fetch(`${API_BASE}${endpoint}`, {
//         ...options,
//         headers,
//     });
//
//     // ---- Handle Unauthorized ----
//     if (response.status === 401) {
//         console.error("❌ Unauthorized — Token missing or invalid");
//         return Promise.reject({ error: "Unauthorized", status: 401 });
//     }
//
//     // ---- Handle server errors ----
//     if (!response.ok) {
//         let err = {};
//         try {
//             err = await response.json();
//         } catch {
//             err = { error: "Unknown error", status: response.status };
//         }
//         console.error("❌ API Error:", err);
//         return Promise.reject(err);
//     }
//
//     // ---- Successful ----
//     try {
//         return await response.json();
//     } catch {
//         return {};
//     }
// }


const API_BASE = "http://localhost:8080";

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    // Read logged-in user from localStorage
    const userStr = localStorage.getItem("lms_user");
    const user = userStr ? JSON.parse(userStr) : null;

    // FIX: The token is saved as user.jwtToken (NOT user.token)
    const token = user?.jwtToken || user?.token || null;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    // Attach Bearer token if exists
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    // ❗ Handle Unauthorized
    if (response.status === 401) {
        console.error("❌ Unauthorized — Invalid or missing JWT");
        localStorage.removeItem("lms_user"); // clear corrupted token
        return Promise.reject({ error: "Unauthorized", status: 401 });
    }

    // ❗ Handle all non-OK responses
    if (!response.ok) {
        let err: any = {};
        try {
            err = await response.json();
        } catch {
            err = { error: "Unknown server error", status: response.status };
        }
        console.error("❌ API Error:", err);
        return Promise.reject(err);
    }

    // Return JSON if possible, or empty object
    try {
        return await response.json();
    } catch {
        return {};
    }
}

