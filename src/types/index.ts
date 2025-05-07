export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      }
    }
  };
  cca2: string;
  cca3: string;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    }
  };
  languages: {
    [code: string]: string;
  };
  borders: string[];
  timezones: string[];
  continents: string[];
}

export interface CountryStore {
  selectedCountries: Country[];
  compareMode: boolean;
  addToComparison: (country: Country) => void;
  removeFromComparison: (countryCode: string) => void;
  toggleCompareMode: () => void;
  clearComparison: () => void;
}

export interface FilterOptions {
  region: string;
  sortBy: string;
  searchTerm: string;
} 