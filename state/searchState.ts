import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

interface RecentSearchState {
  recentSearches: string[];
  addRecentSearch: (search: string) => void;
}

interface IngredientState {
  ingredient: string;
  data: Recipe[];
  fetchData: (ingredients: string) => void;
  addIngredient: (ingredient: string) => void;
}

export const useRecentSearch = create<RecentSearchState>()(
  persist<RecentSearchState>(
    (set) => ({
      recentSearches: [],
      addRecentSearch: (search: string) => {
        const recent = search.split(",");
        return set(() => ({
          recentSearches: recent.length > 3 ? recent.slice(-3) : recent,
        }));
      },
    }),
    {
      name: "recent-searches",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useIngredient = create<IngredientState>()((set) => ({
  ingredient: "",
  data: [],
  fetchData: async (ingredient) => {
    const query = ingredient.replaceAll(",", "&&");
    const api_url = `https://api.api-ninjas.com/v1/recipe?query=${query}`;
    try {
      const result = await fetch(api_url, {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.EXPO_PUBLIC_API_KEY as string,
        },
      });
      const data = await result.json();

      set({ data });
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  addIngredient: (ingredient: string) => {
    set(() => ({ ingredient: ingredient }));
  },
}));
