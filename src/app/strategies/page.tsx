'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { strategies, Strategy } from '@/data/strategies';

export default function StrategiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [profitFilter, setProfitFilter] = useState('all');

  const filteredStrategies = strategies.filter((strategy: Strategy) => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || strategy.riskLevel.toLowerCase() === riskFilter;
    const matchesProfit = profitFilter === 'all' || strategy.profitPotential.toLowerCase() === profitFilter;
    return matchesSearch && matchesRisk && matchesProfit;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Options Strategies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore and customize options strategies to optimize your trades
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search strategies..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                     dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 
                   dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
        <select
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 
                   dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={profitFilter}
          onChange={(e) => setProfitFilter(e.target.value)}
        >
          <option value="all">All Profit Types</option>
          <option value="limited">Limited Profit</option>
          <option value="unlimited">Unlimited Profit</option>
        </select>
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStrategies.map((strategy) => (
          <div
            key={strategy.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                     border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 relative mr-4">
                  <Image
                    src={strategy.icon}
                    alt={strategy.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {strategy.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {strategy.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {strategy.riskLevel} Risk
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {strategy.profitPotential} Profit
                </span>
              </div>
              <Link
                href={`/strategies/${strategy.id}`}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors"
              >
                View Strategy
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
