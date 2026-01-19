import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
        userName: action.payload.userName,
        role: action.payload.role,
        token: action.payload.token
      };
    case 'LOGOUT':
      return {
        isLoggedIn: false,
        userName: '',
        role: '',
        token: ''
      };
    default:
      return state;
  }
};

const initialState = {
  isLoggedIn: false,
  userName: '',
  role: '',
  token: ''
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userName, role = 'user') => {
    const token = `token_${Date.now()}`;
    dispatch({
      type: 'LOGIN',
      payload: { userName, role, token }
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};