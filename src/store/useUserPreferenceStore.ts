import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserType = "tenant" | "landlord";

interface UserPreferenceState {
  userType: UserType | null;
  setUserType: (type: UserType) => void;
  clearUserType: () => void;
}

export const useUserPreferenceStore = create<UserPreferenceState>()(
  persist(
    (set) => ({
      userType: null,
      setUserType: (type) => set({ userType: type }),
      clearUserType: () => set({ userType: null }),
    }),
    {
      name: "user-preference-storage", // unique name for localStorage
      storage: createJSONStorage(() => sessionStorage), // use sessionStorage instead of localStorage
    }
  )
);
