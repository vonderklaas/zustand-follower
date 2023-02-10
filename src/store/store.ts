import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { User } from '../types/User';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

interface UserStore {
  followings: User[];
  followUser: (person: User) => void;
  unfollowUser: (id: User['id']) => void;
  unfollowAll: () => void;
}

export const useFollowingsStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        followings: [],
        followUser: (person: User) => {
          return set((state) => ({
            followings: [...state.followings, person],
          }));
        },
        unfollowUser: (id: User['id']) => {
          return set((state) => ({
            followings: [...state.followings.filter((user) => user.id !== id)],
          }));
        },
        unfollowAll: () => {
          return set(() => ({
            followings: [],
          }));
        },
      }),
      { name: 'followings' }
    )
  )
);

export const useThemeSettings = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => {
        return set((state) => ({
          isDark: !state.isDark,
        }));
      },
    }),
    { name: 'theme-settings' }
  )
);
