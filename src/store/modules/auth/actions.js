export default {
  async login(context, payload) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    await context.dispatch('handleAuth', {
      ...payload,
      url,
    });
  },
  async signup(context, payload) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    await context.dispatch('handleAuth', {
      ...payload,
      url,
    });
  },
  async handleAuth(context, payload) {
    const response = await fetch(payload.url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error.message || 'Failed to authenticate.');
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
