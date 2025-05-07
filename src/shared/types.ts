export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages: Record<string, string>;
  currencies: Record<string, {
    name: string;
    symbol: string;
  }>;
  timezones: string[];
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface FilterOptions {
  region: string;
  sortBy: 'name' | 'nameDesc' | 'population' | 'populationDesc' | 'area' | 'areaDesc' | 'region' | 'regionDesc';
  searchTerm: string;
  capital: string;
} 