import React from 'react';
import { Country } from '../../../../shared/types';
import { useCountryStore } from '../../../../shared/store/countryStore';
import { useNavigate } from 'react-router-dom';

interface CountryCardProps {
  country: Country;
  isCompareMode: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, isCompareMode }) => {
  const navigate = useNavigate();
  const { selectedCountries, addToComparison, removeFromComparison } = useCountryStore();
  const isSelected = selectedCountries.some(c => c.cca3 === country.cca3);

  const handleClick = () => {
    if (isCompareMode) {
      if (isSelected) {
        removeFromComparison(country);
      } else if (selectedCountries.length < 4) {
        addToComparison(country);
      }
    } else {
      navigate(`/country/${country.cca3}`);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 shadow-md cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-16 h-12 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-semibold">{country.name.common}</h2>
          <p className="text-sm text-gray-600">{country.name.official}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-sm text-gray-500">Population:</span>
          <p className="font-medium">{country.population.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Area:</span>
          <p className="font-medium">{country.area.toLocaleString()} km²</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Region:</span>
          <p className="font-medium">{country.region}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Capital:</span>
          <p className="font-medium">{country.capital?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard; 