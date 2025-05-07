import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Country } from '../types';

const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
};

const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
  return response.data[0];
};

export const useAllCountries = () => {
  return useQuery<Country[], Error>({
    queryKey: ['countries'],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useCountry = (code: string) => {
  return useQuery<Country, Error>({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code),
    enabled: !!code,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}; 