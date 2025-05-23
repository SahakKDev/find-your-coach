let timer = null;

export default {
  login(context, payload) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    return context.dispatch('handleAuth', {
      ...payload,
      url,
    });
  },
  signup(context, payload) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    return context.dispatch('handleAuth', {
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

    const expiresIn = responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      didLogout: false,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        didLogout: false,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
      didLogout: true,
    });
  },
};
