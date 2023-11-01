import { create } from 'zustand';
import { produce } from 'immer';
import { IAuthUserParameters, loginApi, registrationApi } from '../api/request';
import { userStore } from '../../user/store/userStore';

interface IAuthStore {
  isAuth: boolean;
  setIsAuth: (flag: boolean) => void;
  registration: (parameters: IAuthUserParameters) => Promise<{message: string} | undefined>;
  login: (parameters: IAuthUserParameters) => void;
  logout: () => void;
}

export const authStore = create<IAuthStore>((set) => ({
  isAuth: false,

  setIsAuth: (flag: boolean) => {
    set(produce((store: IAuthStore) => {
      store.isAuth = flag
    }));
  },
  registration: async (parameters: IAuthUserParameters): Promise<{message: string} | undefined> => {
    try {
      const data = await registrationApi(parameters)
      return data
    } catch (error) {
      console.log(error);
    }
  },
  login: async (parameters: IAuthUserParameters) => {
    try {
      const user = await loginApi(parameters);      
      const accessToken = user.access_token;

      if (user && accessToken) {
        set(produce((store: IAuthStore) => {
          localStorage.setItem('accessToken', accessToken);
          store.isAuth = true;
        }));
      }
      userStore.getState().getMe(user);
    } catch (error) {
      console.log(error);
    }
  },
  logout: async () => {
    set(produce((store: IAuthStore) => {
      localStorage.clear();
      store.isAuth = false;
    }));
  },
}));