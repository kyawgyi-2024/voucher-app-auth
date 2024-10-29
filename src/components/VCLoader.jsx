import React from "react";

const VCLoader = () => {
  return (
    <div className="flex gap-5">
      <div
        id="printArea"
        className="w-[14.8cm] bg-[#f3f0f0] p-5 shadow-lg rounded mt-3"
      >
        <div className="flex justify-between items-start mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="text-right animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-24 mb-1"></div>
            <div className="h-6 bg-gray-300 rounded w-32 mb-1"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 text-sm animate-pulse h-4 bg-gray-300 rounded"></th>
              <th className="text-left py-2 text-sm animate-pulse h-4 bg-gray-300 rounded"></th>
              <th className="text-right py-2 text-sm animate-pulse h-4 bg-gray-300 rounded"></th>
              <th className="text-right py-2 text-sm animate-pulse h-4 bg-gray-300 rounded"></th>
              <th className="text-right py-2 text-sm animate-pulse h-4 bg-gray-300 rounded"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="border-b border-gray-200 mb-3">
                <td className="mb-2 py-2 animate-pulse h-4 bg-gray-300 rounded"></td>
                <td className="mb-2 py-2 animate-pulse h-4 bg-gray-300 rounded"></td>
                <td className="mb-2 text-right py-2 animate-pulse h-4 bg-gray-300 rounded"></td>
                <td className="mb-2 text-right py-2 animate-pulse h-4 bg-gray-300 rounded"></td>
                <td className="mb-2 text-right py-2 animate-pulse h-4 bg-gray-300 rounded"></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b border-gray-200">
              <td
                className="py-2 text-right animate-pulse h-4 bg-gray-300 rounded"
                colSpan={4}
              ></td>
              <td className="py-2 text-right animate-pulse h-4 bg-gray-300 rounded"></td>
            </tr>
            <tr className="border-b border-gray-200">
              <td
                className="py-2 text-right animate-pulse h-4 bg-gray-300 rounded"
                colSpan={4}
              ></td>
              <td className="py-2 text-right animate-pulse h-4 bg-gray-300 rounded"></td>
            </tr>
            <tr className="border-b border-gray-200">
              <td
                className="py-2 text-right animate-pulse h-4 bg-gray-300 rounded"
                colSpan={4}
              ></td>
              <td className="py-2 text-right animate-pulse h-4 bg-gray-300 rounded"></td>
            </tr>
          </tfoot>
        </table>

        <div className="text-xs flex justify-between mb-8 animate-pulse">
          <div className="items-center">
            <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-1"></div>

          </div>
          <div className="items-center justify-between">
            <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 pt-4 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default VCLoader;
