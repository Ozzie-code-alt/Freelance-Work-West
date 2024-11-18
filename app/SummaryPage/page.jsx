'use client';
import React, { useEffect, useState } from 'react';

const SummaryAllPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await fetch('/api/summaryAll');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
      setLoading(false);
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-xl font-semibold'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-3xl font-bold text-center mb-10'>Summary for All Offices</h1>
      <div className='flex flex-col gap-10'>
        {data.map((officeSummary) => (
          <div key={officeSummary.collection} className=' flex flex-col  '>
            <h2 className='text-xl font-semibold text-blue-600  capitalize border-b '>
              {officeSummary.collection.replace(/s$/, '')} Summary
            </h2>
            <div className='overflow-x-auto'>
              <table className='min-w-full border-collapse border border-gray-300'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Office</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Total Responses</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Overall Score</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD0</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD1</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD2</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD3</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD4</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD5</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD6</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD7</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Avg SQD8</th>
                  </tr>
                </thead>
                <tbody>
                  {officeSummary.data.map((row, index) => (
                    <tr key={index} className='odd:bg-white even:bg-gray-50'>
                      <td className='border border-gray-300 px-4 py-2'>{row.office}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.totalResponses}</td>
                      <td className='border border-gray-300 px-4 py-2'>
                        {row.overallScore || '-'}
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd0 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd1 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd2 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd3 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd4 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd5 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd6 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd7 || '-'}</td>
                      <td className='border border-gray-300 px-4 py-2'>{row.avgSqd8 || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryAllPage;
