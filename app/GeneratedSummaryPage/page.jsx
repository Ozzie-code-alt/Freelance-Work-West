'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeFrame, setTimeFrame] = useState('annual');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('');
  const [week, setWeek] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (timeFrame === 'annual') {
        params.append('year', year);
      } else if (timeFrame === 'monthly') {
        params.append('year', year);
        params.append('month', month);
      } else if (timeFrame === 'weekly') {
        params.append('year', year);
        params.append('week', week);
      }

      const response = await fetch(`/api/plesWorkAPI?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const getQuestionLabel = (name) => {
    switch (name) {
      case 'sqd0':
        return 'Responsiveness';
      case 'sqd1':
        return 'Reliability';
      case 'sqd2':
        return 'Access and Facilities';
      case 'sqd3':
        return 'Communication';
      case 'sqd4':
        return 'Costs';
      case 'sqd5':
        return 'Integrity';
      case 'sqd6':
        return 'Assurance';
      case 'sqd7':
        return 'Outcome';
      case 'sqd8':
        return 'Overall';
      default:
        return name;
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>Survey Results</h1>

      {/* Form to select time frame */}
      <form onSubmit={handleSubmit} className='mb-4 '>
        <div className='flex flex-col md:flex-row items-center justify-start md:space-y-0 gap-10 mb-4'>
          <div className='flex items-center'>
            <label className='mr-2'>Time Frame:</label>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className='p-2 border border-gray-300 rounded'
            >
              <option value='annual'>Annual</option>
              <option value='monthly'>Monthly</option>
              <option value='weekly'>Weekly</option>
            </select>
          </div>

          <div className='flex items-center'>
            <label className='mr-2'>Year:</label>
            <input
              type='number'
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder='Year'
              className='p-2 border border-gray-300 rounded'
            />
          </div>

          {timeFrame === 'monthly' && (
            <div className='flex items-center'>
              <label className='mr-2'>Month:</label>
              <input
                type='number'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder='Month (1-12)'
                className='p-2 border border-gray-300 rounded'
              />
            </div>
          )}

          {timeFrame === 'weekly' && (
            <div className='flex items-center'>
              <label className='mr-2'>Week:</label>
              <input
                type='number'
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                placeholder='Week (1-52)'
                className='p-2 border border-gray-300 rounded'
              />
            </div>
          )}
        </div>

        <button
          type='submit'
          className='md:w-auto px-4 py-2 border flex bg-black rounded-md w-fit text-white'
        >
          Generate Report
        </button>
      </form>

      {loading && <p className='text-center mt-9'>Loading / Fetching might take 1 min - 5 mins : Main Factor Wifi Speed</p>}
      {error && <p className='text-center mt-10 text-red-500'>{error}</p>}

      {/* Table to display survey results */}
      {!loading && !error && data.length > 0 && (
        <div className='overflow-x-auto'>
          <table className='table-auto w-full border-collapse border border-gray-200 shadow-md'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border border-gray-200 px-4 py-2 text-left'>Question</th>
                <th className='border border-gray-200 px-4 py-2 text-center'>Strongly Agree (5)</th>
                <th className='border border-gray-200 px-4 py-2 text-center'>Agree (4)</th>
                <th className='border border-gray-200 px-4 py-2 text-center'>
                  Neither Agree nor Disagree (3)
                </th>
                <th className='border border-gray-200 px-4 py-2 text-center'>Disagree (2)</th>
                <th className='border border-gray-200 px-4 py-2 text-center'>
                  Strongly Disagree (1)
                </th>
                <th className='border border-gray-200 px-4 py-2 text-center'>N/A</th>
                <th className='border border-gray-200 px-4 py-2 text-center'>Total Responses</th>
                <th className='border border-gray-200 px-4 py-2 text-center'>Overall (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className='border border-gray-200 px-4 py-2'>{getQuestionLabel(item.name)}</td>
                  <td className='border border-gray-200 px-4 py-2 text-center'>
                    {item.StronglyAgree}
                  </td>
                  <td className='border border-gray-200 px-4 py-2 text-center'>{item.Agree}</td>
                  <td className='border border-gray-200 px-4 py-2 text-center'>
                    {item.NeitherAgreeNorDisagree}
                  </td>
                  <td className='border border-gray-200 px-4 py-2 text-center'>{item.Disagree}</td>
                  <td className='border border-gray-200 px-4 py-2 text-center'>
                    {item.StronglyDisagree}
                  </td>
                  <td className='border border-gray-200 px-4 py-2 text-center'>{item.NA}</td>
                  <td className='border border-gray-200 px-4 py-2 text-center'>
                    {item.totalResponses}
                  </td>
                  <td className='border border-gray-200 px-4 py-2 text-center text-green-600 font-semibold'>
                    {item.Overall}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
