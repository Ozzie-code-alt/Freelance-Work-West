"use client"

import React from 'react';

async function fetchComments() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Use environment variable or fallback to localhost

  const res = await fetch(`/api/generateComments`);
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }
  const data = await res.json();
  return data;
}

export default async function CommentsPage() {
  const { data } = await fetchComments();

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No data available</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Office Comments
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((office) => (
          <div
            key={office.collection}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {office.collection.toUpperCase()}
            </h2>
            {office.comments.length > 0 ? (
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
}
