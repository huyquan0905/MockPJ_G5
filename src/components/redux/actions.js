export const login = (token) => ({
    type: 'LOGIN',
    payload: { token },
  });

  export const register = (token) => ({
    type: 'REGISTER',
    payload: { token },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  