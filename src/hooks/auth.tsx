import React, { createContext, useCallback, useState, useContext } from 'react';
import produce from 'immer';

import { IUser, IPhoto } from '../interfaces';

import api from '../services/api';
import singletonFunctions from '../services/singletonFunctions';
import {
  setToken,
  setRefreshToken,
  setUser,
  eraseLocalStorage,
} from '../services/localStorage';

interface IAuthState {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface IAuthCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn(authCredentials: IAuthCredentials): Promise<void>;
  signOut(): void;
  updatePhoto(_photo: IPhoto): void;
  updateName(_name: string): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const accessToken = localStorage.getItem('@ProjectsManagerApp:token');
    const refreshToken = localStorage.getItem('@ProjectsManagerApp:refresh');
    const user = localStorage.getItem('@ProjectsManagerApp:user');

    if (accessToken && refreshToken && user) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      return { accessToken, refreshToken, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  singletonFunctions.saveCredentials = useCallback(
    ({ user, accessToken, refreshToken }) => {
      setToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);

      api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      setData({ accessToken, refreshToken, user });
    },
    [],
  );

  singletonFunctions.signOut = useCallback(() => {
    eraseLocalStorage();

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth/signin', {
      email,
      password,
    });

    singletonFunctions.saveCredentials(response.data);
  }, []);

  const updatePhoto = useCallback(
    (_photo: IPhoto) => {
      setUser({ ...data.user, photo: _photo });

      setData((state) => {
        return produce(state, (draft) => {
          draft.user = { ...draft.user, photo: { ..._photo } };
        });
      });
    },
    [data],
  );

  const updateName = useCallback(
    (_name: string) => {
      setUser({ ...data.user, name: _name });

      setData((state) => {
        return produce(state, (draft) => {
          draft.user = { ...draft.user, name: _name };
        });
      });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut: singletonFunctions.signOut,
        updatePhoto,
        updateName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
