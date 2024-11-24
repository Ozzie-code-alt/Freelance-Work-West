"use client"
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/plesWorkAPI");
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "An error occurred");
        }
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-9">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Survey Results</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">Question</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Strongly Agree (5)</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Agree (4)</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Neither Agree nor Disagree (3)</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Disagree (2)</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Strongly Disagree (1)</th>
              <th className="border border-gray-200 px-4 py-2 text-center">N/A</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Total Responses</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Overall (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.name}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border border-gray-200 px-4 py-2">{item.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.StronglyAgree}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.Agree}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.NeitherAgreeNorDisagree}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.Disagree}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.StronglyDisagree}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.NA}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{item.totalResponses}</td>
                <td className="border border-gray-200 px-4 py-2 text-center text-green-600 font-semibold">
                  {item.Overall}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
