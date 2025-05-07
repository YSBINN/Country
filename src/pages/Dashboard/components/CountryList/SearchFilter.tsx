import React, { useEffect } from 'react';
import { FilterOptions } from '../../../../shared/types';

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  regions: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange, regions }) => {
  const [filters, setFilters] = React.useState<FilterOptions>({
    region: '',
    sortBy: 'name',
    searchTerm: '',
    capital: '',
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search by name
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter country name..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by region
          </label>
          <select
            className="select"
            value={filters.region}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search by capital
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter capital city..."
            value={filters.capital}
            onChange={(e) => setFilters({ ...filters, capital: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort by
          </label>
          <select
            className="select"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
          >
            <option value="name">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
            <option value="population">Population (High to Low)</option>
            <option value="populationDesc">Population (Low to High)</option>
            <option value="area">Area (High to Low)</option>
            <option value="areaDesc">Area (Low to High)</option>
            <option value="region">Region (A-Z)</option>
            <option value="regionDesc">Region (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter; 