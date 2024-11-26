'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeFrame, setTimeFrame] = useState('year');
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState('');
  const [month, setMonth] = useState('');
  const [office, setOffice] = useState('overall');

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('office', office);
      if (timeFrame === 'year') {
        params.append('year', year);
      } else if (timeFrame === 'quarter') {
        params.append('year', year);
        params.append('quarter', quarter);
      } else if (timeFrame === 'month') {
        params.append('year', year);
        params.append('month', month);
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

      {/* Form to select time frame and office */}
      <form onSubmit={handleSubmit} className='mb-4'>
        <div className='flex flex-col md:flex-row items-center justify-start md:space-y-0 gap-10 mb-4'>
          <div className='flex items-center'>
            <label className='mr-2'>Office:</label>
            <select
              value={office}
              onChange={(e) => setOffice(e.target.value)}
              className='p-2 border border-gray-300 rounded'
            >
              <option value='overall'>Overall</option>
              <option value='accountings'>Accountings</option>
              <option value='affairsoffices'>Affairs Offices</option>
              <option value='alumnis'>Alumnis</option>
              <option value='awards'>Awards</option>
              <option value='bacs'>BACs</option>
              <option value='budgets'>Budgets</option>
              <option value='campusadmins'>Campus Admins</option>
              <option value='cashiers'>Cashiers</option>
              <option value='culturals'>Culturals</option>
              <option value='educes'>Educes</option>
              <option value='genderdevelopments'>Gender Developments</option>
              <option value='generalservices'>General Services</option>
              <option value='guidances'>Guidances</option>
              <option value='hrmos'>HRMOs</option>
              <option value='icts'>ICTs</option>
              <option value='industrialteches'>Industrial Teches</option>
              <option value='libraries'>Libraries</option>
              <option value='medicals'>Medicals</option>
              <option value='mis'>MIS</option>
              <option value='nstps'>NSTPs</option>
              <option value='osas'>OSAs</option>
              <option value='pdus'>PDUs</option>
              <option value='personalinformations'>Personal Informations</option>
              <option value='physicalplants'>Physical Plants</option>
              <option value='publicaffairs'>Public Affairs</option>
              <option value='qualityassurances'>Quality Assurances</option>
              <option value='recordsoffices'>Records Offices</option>
              <option value='registrars'>Registrars</option>
              <option value='researches'>Researches</option>
              <option value='rmos'>RMOs</option>
              <option value='sbms'>SBMs</option>
              <option value='securities'>Securities</option>
              <option value='sobms'>SOBMs</option>
              <option value='soicts'>SOICTs</option>
              <option value='sportsoffices'>Sports Offices</option>
              <option value='studentaffairs'>Student Affairs</option>
              <option value='supplybuildings'>Supply Buildings</option>
            </select>
          </div>

          <div className='flex items-center'>
            <label className='mr-2'>Time Frame:</label>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className='p-2 border border-gray-300 rounded'
            >
              <option value='year'>Year</option>
              <option value='quarter'>Quarter</option>
              <option value='month'>Month</option>
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

          {timeFrame === 'quarter' && (
            <div className='flex items-center'>
              <label className='mr-2'>Quarter:</label>
              <select
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                className='p-2 border border-gray-300 rounded'
              >
                <option value=''>Select</option>
                <option value='1'>Q1 (Jan - Mar)</option>
                <option value='2'>Q2 (Apr - Jun)</option>
                <option value='3'>Q3 (Jul - Sep)</option>
                <option value='4'>Q4 (Oct - Dec)</option>
              </select>
            </div>
          )}

          {timeFrame === 'month' && (
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
        </div>

        <button
          type='submit'
          className='md:w-auto px-4 py-2 border flex bg-black rounded-md w-fit text-white'
        >
          Generate Report
        </button>
      </form>

      {loading && (
        <p className='text-center mt-9'>
          Loading / Fetching might take 1 min - 5 mins : Main Factor Wifi Speed
        </p>
      )}
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
                  <td className='border border-gray-200 px-4 py-2'>
                    {getQuestionLabel(item.name)}
                  </td>
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
