import { create } from 'zustand';
import { IUser } from '../utils/types';
import { produce } from 'immer';
import { fetchMeApi } from '../api/request';
import { authStore } from '../../auth/store/authStore';

interface IUserStore {
  me: IUser | null;
  getMe: (me: IUser) => void;
  fetchMe: (accessToken: string) => void
}

export const userStore = create<IUserStore>(set => ({
  me: null,

  getMe: (me: IUser) => {
    set(produce((store: IUserStore) => {
      store.me = me;
    }));
  },
  fetchMe: async (accessToken: string) => {
    try {
      const data = await fetchMeApi(accessToken);
      set(produce((store: IUserStore) => {
        store.me = data;
      }));

      authStore.getState().setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  }
}));