"use client";
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Home() {
  
  const [legs, setLegs] = useState([{ type: '', action: '', strike: '', expiration: '', premium: '' }]);
  const [targetPrice, setTargetPrice] = useState('');
  const [expectedProfit, setExpectedProfit] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const handleAddLeg = () => {
    setLegs([...legs, { type: '', action: '', strike: '', expiration: '', premium: '' }]);
  };

  const handleLegChange = (index: number, field: string, value: string) => {
    const newLegs = legs.map((leg, i) => (i === index ? { ...leg, [field]: value } : leg));
    setLegs(newLegs);
  };

  const handleRemoveLeg = (index: number) => {
    setLegs(legs.filter((_, i) => i !== index));
  };

  const handleClearLegs = () => {
    setLegs([{ type: '', action: '', strike: '', expiration: '', premium: '' }]);
    setTargetPrice('');
    setExpectedProfit(null);
    setChartData(null);
  };

  const calculateExpectedProfit = (price: number) => {
    return legs.reduce((totalProfit, leg) => {
      const strike = parseFloat(leg.strike);
      const premium = parseFloat(leg.premium);
      if (leg.type === 'call') {
        if (leg.action === 'buy') {
          return totalProfit + 100 * Math.max(0, price - strike) - premium;
        } else if (leg.action === 'sell') {
          return totalProfit - 100 * Math.max(0, price - strike) + premium;
        }
      } else if (leg.type === 'put') {
        if (leg.action === 'buy') {
          return totalProfit + 100 * Math.max(0, strike - price) - premium;
        } else if (leg.action === 'sell') {
          return totalProfit - 100 * Math.max(0, strike - price) + premium;
        }
      }
      return totalProfit;
    }, 0);
  };

  const handleCalculateProfit = () => {
    const price = parseFloat(targetPrice);
    if (!isNaN(price)) {
      const profit = calculateExpectedProfit(price);
      setExpectedProfit(profit);
      generateChartData(price);
    }
  };

  const generateChartData = (price: number) => {
    const minPrice = price * 0.5;
    const maxPrice = price * 1.5;
    const step = (maxPrice - minPrice) / 100;
    const prices = [];
    const profits = [];

    for (let p = minPrice; p <= maxPrice; p += step) {
      prices.push(p);
      profits.push(calculateExpectedProfit(p));
    }

    setChartData({
      labels: prices,
      datasets: [
        {
          label: 'Profit/Loss',
          data: profits,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });
  };

  useEffect(() => {
    if (legs.length > 0) {
      const price = parseFloat(targetPrice) || 100; // Default price if targetPrice is not set
      generateChartData(price);
    }
  }, [legs]);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Options Strategy Calculator</h1>
      <div className="mb-4 p-4 border border-gray-700 rounded bg-gray-800">
        <div className="mb-2">
          <label className="block text-sm font-medium">Stock Price</label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
          />
        </div>
      </div>
      {legs.map((leg, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-700 rounded bg-gray-800">
          <div className="mb-2">
            <label className="block text-sm font-medium">Type</label>
            <select
              value={leg.type}
              onChange={(e) => handleLegChange(index, 'type', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
            >
              <option value="">Select Type</option>
              <option value="call">Call</option>
              <option value="put">Put</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Action</label>
            <select
              value={leg.action}
              onChange={(e) => handleLegChange(index, 'action', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
            >
              <option value="">Select Action</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Strike Price</label>
            <input
              type="number"
              value={leg.strike}
              onChange={(e) => handleLegChange(index, 'strike', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Expiration Date</label>
            <input
              type="date"
              value={leg.expiration}
              onChange={(e) => handleLegChange(index, 'expiration', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Premium</label>
            <input
              type="number"
              value={leg.premium}
              onChange={(e) => handleLegChange(index, 'premium', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            onClick={() => handleRemoveLeg(index)}
            className="mt-2 bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            Remove Leg
          </button>
        </div>
      ))}
      <button
        onClick={handleAddLeg}
        className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Leg
      </button>
      <button
        onClick={handleClearLegs}
        className="mt-4 bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 ml-2"
      >
        Clear All Legs
      </button>
      <div className="mt-6">
        {expectedProfit !== null && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Expected Profit: ${expectedProfit.toFixed(2)}</h2>
          </div>
        )}
        {chartData && (
          <div className="mt-6">
            <Line data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
