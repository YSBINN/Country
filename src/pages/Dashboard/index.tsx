import React from "react";
import { useAllCountries } from "../../shared/hooks";
import { useCountryStore } from "../../shared/store/countryStore";
import CountryList from "./components/CountryList";
import CountryComparison from "./components/CountryComparison";

const Dashboard: React.FC = () => {
  const { data: countries, isLoading, error } = useAllCountries();
  const { isComparisonMode, toggleComparisonMode } = useCountryStore();

  return (
    <div className="min-h-screen bg-gray-50 w-full px-4 sm:px-6 md:px-8 lg:max-w-7xl mx-auto">
      <div className="py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Countries
          </h1>
          <button
            onClick={toggleComparisonMode}
            className={`w-full sm:w-auto btn ${
              isComparisonMode ? "btn-primary" : "btn-secondary"
            }`}
          >
            {isComparisonMode ? "Exit Compare Mode" : "Compare Countries"}
          </button>
        </div>

        {isComparisonMode && <CountryComparison />}

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
