import React from "react";
import { useCountryStore } from "../../../shared/store/countryStore";
import { Country, Currency } from "../../../shared/types";

const Metrics = [
  {
    label: "Population",
    getValue: (country: Country) => country.population.toLocaleString(),
  },
  {
    label: "Area",
    getValue: (country: Country) => `${country.area.toLocaleString()} km²`,
  },
  {
    label: "Region",
    getValue: (country: Country) => country.region,
  },
  {
    label: "Subregion",
    getValue: (country: Country) => country.subregion,
  },
  {
    label: "Languages",
    getValue: (country: Country) => Object.values(country.languages).join(", "),
  },
  {
    label: "Currencies",
    getValue: (country: Country) =>
      Object.entries(country.currencies)
        .map(
          ([_, currency]: [string, Currency]) =>
            `${currency.name} (${currency.symbol})`
        )
        .join(", "),
  },
  {
    label: "Capital",
    getValue: (country: Country) => country.capital?.join(", "),
  },
  {
    label: "Timezones",
    getValue: (country: Country) => country.timezones.join(", "),
  },
];

const CountryComparison: React.FC = () => {
  const { selectedCountries, removeFromComparison, clearComparison } =
    useCountryStore();

  if (selectedCountries.length === 0) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-blue-800">비교할 국가를 선택해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Country Comparison</h2>
        <button
          onClick={clearComparison}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <colgroup>
            <col span={5} className="w-1/6" />
          </colgroup>
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4"></th>
              {selectedCountries.map((country: Country) => (
                <th
                  key={country.cca3}
                  className="py-2 px-4 text-right whitespace-nowrap"
                >
                  <div className="flex justify-end items-center gap-1">
                    <img
                      src={country.flags.png}
                      alt={
                        country.flags.alt || `Flag of ${country.name.common}`
                      }
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span>{country.name.common}</span>
                    <button
                      onClick={() => removeFromComparison(country)}
                      className=" text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Metrics.map(metric => (
              <tr key={metric.label} className="border-b">
                <th
                  scope="low"
                  className="w-[140px] py-2 px-4 text-left border-r"
                >
                  {metric.label}
                </th>
                {selectedCountries.map((country: Country) => (
                  <td key={country.cca3} className="py-2 px-4 text-right">
                    {metric.getValue(country)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryComparison;
