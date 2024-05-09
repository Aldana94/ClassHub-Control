class AuthService {
  // Asegúrate de que estas rutas y métodos correspondan con tu backend.
  static loginEndpoint = 'http://localhost:5002/login';

  static async login(username, password) {
    try {
      const response = await fetch(this.loginEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(data));
        return data;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
  }

  static isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}

export default AuthService;
