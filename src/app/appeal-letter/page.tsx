'use client'

import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'

const mockData = [
    {
      year: 2017,
      company: 'Alabama and Gulf Coast Railway LLC',
      state: 'AL',
      assessor: 'Wilcox County Tax Collector',
      account: '1.87060',
      date: 'June 25',
    },
    {
      year: 2018,
      company: 'First Coast Railroad Inc.',
      state: 'GA',
      assessor: 'Camden County Tax',
      account: 'UTIL150, Camden County',
      date: 'June 25',
    },
    {
      year: 2019,
      company: 'Buffalo and Pittsburgh Railroad, Inc.',
      state: 'NY',
      assessor: 'City Of Buffalo Assessor',
      account: '10782900',
      date: 'June 25',
    },
    {
      year: 2020,
      company: 'Conecuh Valley Railway, LLC',
      state: 'OH',
      assessor: 'Ellicottville Tax Collector',
      account: '043689 38.004-1-31',
      date: 'June 25',
    },
    {
      year: 2021,
      company: 'Georgia Central Railway LP',
      state: 'KY',
      assessor: 'Pike County Revenue Commissioner',
      account: 'PUBUT - 000780 (TROY)-50054',
      date: 'June 25',
    },
    {
      year: 2022,
      company: 'KWT Railway Inc.',
      state: 'UT',
      assessor: 'City Of Dublin',
      account: '400 294 400 294',
      date: 'June 25',
    },
  ]
  
export default function AppealLetterPage() {
  const [search, setSearch] = useState('')

  const filtered = mockData.filter((row) =>
    row.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Appeal Letter <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">05</span>
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute top-2.5 left-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Property, Jurisdiction..."
              className="pl-10 pr-3 py-2 rounded border text-sm w-72 focus:outline-none focus:ring"
            />
          </div>
          <button className="p-2 rounded hover:bg-gray-100">
            <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50 text-gray-600">
            <tr>
              <th className="px-3 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-3 py-2">Tax Year</th>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">State</th>
              <th className="px-3 py-2">Assessor</th>
              <th className="px-3 py-2">Account Number</th>
              <th className="px-3 py-2">Appealee</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-3 py-2">{row.year}</td>
                <td className="px-3 py-2">{row.company}</td>
                <td className="px-3 py-2">{row.state}</td>
                <td className="px-3 py-2">{row.assessor}</td>
                <td className="px-3 py-2">{row.account}</td>
                <td className="px-3 py-2">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (mocked) */}
      <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
        <span>1–10 of 120</span>
        <div className="space-x-1">
          <button className="px-2 py-1 rounded hover:bg-gray-100">Previous</button>
          <button className="px-2 py-1 rounded bg-blue-50 text-blue-600 font-medium">1</button>
          <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
          <button className="px-2 py-1 rounded hover:bg-gray-100">3</button>
          <span>...</span>
          <button className="px-2 py-1 rounded hover:bg-gray-100">10</button>
          <button className="px-2 py-1 rounded hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  )
}
