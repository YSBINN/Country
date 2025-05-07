import React, { useMemo } from 'react';
import { Country, FilterOptions } from '../../../../shared/types';
import { useCountryStore } from '../../../../shared/store/countryStore';
import CountryCard from './CountryCard';
import SearchFilter from './SearchFilter';
import CountryListSkeleton from './CountryListSkeleton';

interface CountryListProps {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const CountryList: React.FC<CountryListProps> = ({ countries, loading, error }) => {
  const { isComparisonMode } = useCountryStore();
  const [filters, setFilters] = React.useState<FilterOptions>({
    region: '',
    sortBy: 'name',
    searchTerm: '',
    capital: '',
  });

  const regions = useMemo(() => {
    const uniqueRegions = new Set(countries.map(country => country.region));
    return Array.from(uniqueRegions).sort();
  }, [countries]);

  const filteredCountries = useMemo(() => {
    let result = [...countries];

    if (filters.searchTerm) {
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.region) {
      result = result.filter(country => country.region === filters.region);
    }

    if (filters.capital) {
      result = result.filter(country =>
        country.capital.some(cap => 
          cap.toLowerCase().includes(filters.capital.toLowerCase())
        )
      );
    }

    switch (filters.sortBy) {
      case 'name':
        result.sort((a, b) => a.name.common.localeCompare(b.name.common));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.common.localeCompare(a.name.common));
        break;
      case 'population':
        result.sort((a, b) => b.population - a.population);
        break;
      case 'populationDesc':
        result.sort((a, b) => a.population - b.population);
        break;
      case 'area':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'areaDesc':
        result.sort((a, b) => a.area - b.area);
        break;
      case 'region':
        result.sort((a, b) => a.region.localeCompare(b.region));
        break;
      case 'regionDesc':
        result.sort((a, b) => b.region.localeCompare(a.region));
        break;
    }

    return result;
  }, [countries, filters]);

  if (loading) {
    return <CountryListSkeleton />;
  }

  if (error) {
    return (
      <div className="container">
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <SearchFilter
        onFilterChange={setFilters}
        regions={regions}
      />
      <div className="grid-container">
        {filteredCountries.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            No countries found matching your search criteria.
          </div>
        ) : (
          filteredCountries.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
              isCompareMode={isComparisonMode}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CountryList; 