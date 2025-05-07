import { create } from 'zustand';
import { Country } from '../types';

interface CountryStore {
  selectedCountries: Country[];
  isComparisonMode: boolean;
  compareMode: boolean;
  addToComparison: (country: Country) => void;
  removeFromComparison: (country: Country) => void;
  clearComparison: () => void;
  toggleComparisonMode: () => void;
}

export const useCountryStore = create<CountryStore>((set) => ({
  selectedCountries: [],
  isComparisonMode: false,
  compareMode: false,
  addToComparison: (country) =>
    set((state) => {
      if (state.selectedCountries.length >= 4) return state;
      if (state.selectedCountries.some((c) => c.name.common === country.name.common)) return state;
      return { selectedCountries: [...state.selectedCountries, country] };
    }),
  removeFromComparison: (country) =>
    set((state) => ({
      selectedCountries: state.selectedCountries.filter(
        (c) => c.name.common !== country.name.common
      ),
    })),
  clearComparison: () => set({ selectedCountries: [] }),
  toggleComparisonMode: () =>
    set((state) => ({ isComparisonMode: !state.isComparisonMode, compareMode: !state.compareMode })),
})); 