import React from 'react';

const CountryListSkeleton: React.FC = () => {
  return (
    <div className="container">
      <div className="grid-container">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card">
            <div className="skeleton h-40 w-full" />
            <div className="p-4 space-y-3">
              <div className="skeleton h-6 w-3/4" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryListSkeleton; 