'use client';
import React, { useEffect, useState } from 'react';

const CommentsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
 
      try {
        const response = await fetch(`/api/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-center">No data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-10">Office Comments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((office) => (
          <div
            key={office.collection}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-4 capitalize">
              {office.collection}
            </h2>
            {office.comments && office.comments.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {office.comments.map((comment, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm border-b border-gray-100 pb-2"
                  >
                    {comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No comments available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
