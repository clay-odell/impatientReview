const BASE_URL = import.meta.env.VITE_API_URL || "https://api.impatientreview.com/api";

class API {
  static async request(endpoint, { method = "GET", data = null } = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
      method,
      credentials: "include", // IMPORTANT: sends/receives cookies
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    // Normalize errors
    if (!res.ok) {
      let message = "Unknown error";
      try {
        const errData = await res.json();
        message = errData.error || message;
      } catch (_) {}

      throw new Error(message);
    }

    // Parse JSON safely
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  // -------------------------
  // AUTH ROUTES
  // -------------------------
  static login(email, password) {
    return this.request("/admin/login", {
      method: "POST",
      data: { email, password },
    });
  }

  static logout() {
    return this.request("/admin/logout", { method: "POST" });
  }

  static getSession() {
    return this.request("/admin/session");
  }

  // -------------------------
  // CREDENTIAL ROUTES
  // -------------------------
  static listCredentials() {
    return this.request("/admin/credentials");
  }

  static deleteCredential(id) {
    return this.request(`/admin/credentials/${id}`, { method: "DELETE" });
  }

  // -------------------------
  // POEM ROUTES
  // -------------------------

  /** Create a new draft poem */
  static createPoemDraft({ title, author, body, citations }) {
    return this.request("/poems/draft", {
      method: "POST",
      data: { title, author, body, citations },
    });
  }

  /** List poems (optionally filter by status: 'draft' or 'published') */
  static listPoems(status = null) {
    const query = status ? `?status=${status}` : "";
    return this.request(`/poems${query}`);
  }

  /** Get a single poem by ID */
  static getPoem(id) {
    return this.request(`/poems/${id}`);
  }

  /** Update a draft poem */
  static updatePoemDraft(id, data) {
    return this.request(`/poems/${id}`, {
      method: "PATCH",
      data,
    });
  }

  /** Publish a poem */
  static publishPoem(id) {
    return this.request(`/poems/${id}/publish`, {
      method: "POST",
    });
  }

  /** Delete a poem */
  static deletePoem(id) {
    return this.request(`/poems/${id}`, {
      method: "DELETE",
    });
  }
}

export default API;
