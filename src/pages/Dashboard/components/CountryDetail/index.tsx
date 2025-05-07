import React from 'react';
import { Country } from '../../../../shared/types';
import { useCountryStore } from '../../../../shared/store/countryStore';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

interface CountryDetailProps {
  country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  const navigate = useNavigate();
  const { selectedCountries, toggleCountrySelection } = useCountryStore();
  const isSelected = selectedCountries.some(c => c.cca3 === country.cca3);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCompareClick = () => {
    toggleCountrySelection(country);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-8 bg-white dark:bg-gray-800 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <IoArrowBack />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full h-96 md:h-auto">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `${country.name.common} flag`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
            <p className="text-gray-600 dark:text-gray-300">{country.name.official}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Region:</span>
                <span className="ml-2">{country.region}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Subregion:</span>
                <span className="ml-2">{country.subregion}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Population:</span>
                <span className="ml-2">{country.population.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Area:</span>
                <span className="ml-2">{country.area.toLocaleString()} km²</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Capital:</span>
                <span className="ml-2">{country.capital.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Languages:</span>
                <div className="ml-2 text-center">
                  {Object.values(country.languages).join(', ')}
                </div>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Timezones:</span>
                <div className="ml-2 text-center">
                  {country.timezones.join(', ')}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleCompareClick}
              className={`px-6 py-2 rounded-lg shadow-md transition-colors ${
                isSelected
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isSelected ? 'Remove from Comparison' : 'Add to Comparison'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail; 