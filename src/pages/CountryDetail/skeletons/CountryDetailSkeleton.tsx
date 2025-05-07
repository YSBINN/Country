import React from 'react';

const CountryDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 w-24 h-10 bg-gray-200 rounded-lg animate-pulse" />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="w-64 h-8 bg-gray-200 rounded-lg animate-pulse mb-2" />
              <div className="w-48 h-4 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 animate-pulse" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-20 h-4 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="w-32 h-4 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="w-24 h-6 bg-gray-200 rounded-lg animate-pulse mb-2" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>

              <div>
                <div className="w-24 h-6 bg-gray-200 rounded-lg animate-pulse mb-2" />
                <div className="space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="w-48 h-4 bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>

              <div>
                <div className="w-24 h-6 bg-gray-200 rounded-lg animate-pulse mb-2" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
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

export default CountryDetailSkeleton; 