import { IUser } from '../interfaces';

const APP_NAME_ON_LOCALSTORAGE = '@ProjectsManagerApp';

function getToken(): string | null {
  return localStorage.getItem(`${APP_NAME_ON_LOCALSTORAGE}:token`);
}

function getRefreshToken(): string | null {
  return localStorage.getItem(`${APP_NAME_ON_LOCALSTORAGE}:refresh`);
}

function getUser(): IUser | null {
  const userStr = localStorage.getItem(`${APP_NAME_ON_LOCALSTORAGE}:user`);

  if (userStr) {
    return JSON.parse(userStr);
  }

  return null;
}

function setToken(token: string): void {
  localStorage.removeItem(`${APP_NAME_ON_LOCALSTORAGE}:token`);
  localStorage.setItem(`${APP_NAME_ON_LOCALSTORAGE}:token`, token);
}

function setRefreshToken(refresh: string): void {
  localStorage.removeItem(`${APP_NAME_ON_LOCALSTORAGE}:refresh`);
  localStorage.setItem(`${APP_NAME_ON_LOCALSTORAGE}:refresh`, refresh);
}

function setUser(user: IUser): void {
  localStorage.removeItem(`${APP_NAME_ON_LOCALSTORAGE}:user`);
  localStorage.setItem(
    `${APP_NAME_ON_LOCALSTORAGE}:user`,
    JSON.stringify(user),
  );
}

function eraseLocalStorage(): void {
  localStorage.removeItem(`${APP_NAME_ON_LOCALSTORAGE}:token`);
  localStorage.removeItem(`${APP_NAME_ON_LOCALSTORAGE}:refresh`);
  localStorage.removeItem(`${APP_NAME_ON_LOCALSTORAGE}:user`);
}

export {
  getToken,
  getRefreshToken,
  getUser,
  setToken,
  setRefreshToken,
  setUser,
  eraseLocalStorage,
};
