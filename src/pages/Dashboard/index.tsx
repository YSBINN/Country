import React from 'react';
import { useAllCountries } from '../../shared/hooks';
import { useCountryStore } from '../../shared/store/countryStore';
import CountryList from './components/CountryList';
import CountryComparison from './components/CountryComparison';

const Dashboard: React.FC = () => {
  const { data: countries, isLoading, error } = useAllCountries();
  const { isComparisonMode,  toggleComparisonMode } = useCountryStore();

  return (
    <div className="min-h-screen bg-gray-50 w-[1280px] mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Countries</h1>
          <button
            onClick={toggleComparisonMode}
            className={`btn ${isComparisonMode ? 'btn-primary' : 'btn-secondary'}`}
          >
            {isComparisonMode ? 'Exit Compare Mode' : 'Compare Countries'}
          </button>
        </div>

        {isComparisonMode &&  (
          <CountryComparison />
        )}

        <CountryList
          countries={countries || []}
          loading={isLoading}
          error={error?.message || null}
        />
      </div>
    </div>
  );
};

export default Dashboard; 