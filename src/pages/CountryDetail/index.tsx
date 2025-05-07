import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Country } from '../../shared/types';
import { useCountryStore } from '../../shared/store/countryStore';
import CountryDetailSkeleton from './skeletons/CountryDetailSkeleton';

const CountryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { addToComparison } = useCountryStore();

  const { data: country, isLoading, error } = useQuery<Country>({
    queryKey: ['country', code],
    queryFn: async () => {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      if (!response.ok) throw new Error('Failed to fetch country');
      const data = await response.json();
      return data[0];
    },
  });

  if (isLoading) return <CountryDetailSkeleton />;
  if (error) return <div className="text-red-500 p-10">Error: {error.message}</div>;
  if (!country) return <div className="text-center p-10">Country not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
              <p className="text-gray-600">{country.name.official}</p>
            </div>
            <button
              onClick={() => addToComparison(country)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <p><span className="font-semibold">Capital:</span> {country.capital?.join(', ')}</p>
                <p><span className="font-semibold">Region:</span> {country.region}</p>
                <p><span className="font-semibold">Subregion:</span> {country.subregion}</p>
                <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                <p><span className="font-semibold">Area:</span> {country.area.toLocaleString()} km²</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.values(country.languages).map((lang: string) => (
                    <span key={lang} className="px-3 py-1 bg-gray-100 rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Currencies</h2>
                <div className="space-y-2">
                  {Object.entries(country.currencies).map(([code, currency]) => (
                    <p key={code}>
                      <span className="font-semibold">{currency.name}</span> ({code}) - {currency.symbol}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Timezones</h2>
                <div className="flex flex-wrap gap-2">
                  {country.timezones.map((timezone: string) => (
                    <span key={timezone} className="px-3 py-1 bg-gray-100 rounded-full">
                      {timezone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail; 