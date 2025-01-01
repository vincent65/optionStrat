"use client";
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const erf = (x: number): number => {
  const t = 1.0 / (1.0 + 0.3275911 * Math.abs(x));
  const d = 1.0 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return x >= 0 ? d : -d;
};

function calculateOptionPrice(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  optionType: 'call' | 'put'
) {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const normDist = (x: number) => (1.0 + erf(x / Math.sqrt(2.0))) / 2.0;

  if (optionType === 'call') {
    return S * normDist(d1) - K * Math.exp(-r * T) * normDist(d2);
  } else if (optionType === 'put') {
    return K * Math.exp(-r * T) * normDist(-d2) - S * normDist(-d1);
  }
  return 0;
}

function calculateGreeks(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number,
  optionType: 'call' | 'put'
) {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const normDist = (x: number) => (1.0 + erf(x / Math.sqrt(2.0))) / 2.0;
  const pdf = (x: number) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);

  const delta = optionType === 'call' ? normDist(d1) : normDist(d1) - 1;
  const gamma = pdf(d1) / (S * sigma * Math.sqrt(T));
  const vega = S * pdf(d1) * Math.sqrt(T);
  const theta = optionType === 'call'
    ? (-S * pdf(d1) * sigma / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normDist(d2))
    : (-S * pdf(d1) * sigma / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * normDist(-d2));
  const rho = optionType === 'call'
    ? K * T * Math.exp(-r * T) * normDist(d2)
    : -K * T * Math.exp(-r * T) * normDist(-d2);

  return { delta, gamma, vega, theta, rho };
}

export default function PricerPage() {
  const [S, setS] = useState('');
  const [K, setK] = useState('');
  const [T, setT] = useState('');
  const [r, setR] = useState('');
  const [sigma, setSigma] = useState('');
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [optionPrice, setOptionPrice] = useState<number | null>(null);
  const [greeks, setGreeks] = useState<{ delta: number, gamma: number, vega: number, theta: number, rho: number } | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const handleCalculate = () => {
    const price = calculateOptionPrice(
      parseFloat(S),
      parseFloat(K),
      parseFloat(T),
      parseFloat(r),
      parseFloat(sigma),
      optionType
    );
    const greeks = calculateGreeks(
      parseFloat(S),
      parseFloat(K),
      parseFloat(T),
      parseFloat(r),
      parseFloat(sigma),
      optionType
    );
    setOptionPrice(price);
    setGreeks(greeks);
  };

  const handleGenerateGraphs = () => {
    const S_val = parseFloat(S);
    const K_val = parseFloat(K);
    const r_val = parseFloat(r);
    const sigma_val = parseFloat(sigma);
    const optionType_val = optionType;
    const T_val = parseFloat(T);

    const times = Array.from({ length: 100 }, (_, i) => (i / 100) * T_val);
    const prices = times.map(t => calculateOptionPrice(S_val, K_val, t, r_val, sigma_val, optionType_val));
    const deltas = times.map(t => calculateGreeks(S_val, K_val, t, r_val, sigma_val, optionType_val).delta);
    const gammas = times.map(t => calculateGreeks(S_val, K_val, t, r_val, sigma_val, optionType_val).gamma);
    const vegas = times.map(t => calculateGreeks(S_val, K_val, t, r_val, sigma_val, optionType_val).vega);
    const thetas = times.map(t => calculateGreeks(S_val, K_val, t, r_val, sigma_val, optionType_val).theta);
    const rhos = times.map(t => calculateGreeks(S_val, K_val, t, r_val, sigma_val, optionType_val).rho);

    setChartData({
      labels: times,
      datasets: [
        {
          label: 'Option Price',
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Delta',
          data: deltas,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: 'Gamma',
          data: gammas,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
        {
          label: 'Vega',
          data: vegas,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          fill: true,
        },
        {
          label: 'Theta',
          data: thetas,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Rho',
          data: rhos,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        },
      ],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Option Pricer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Calculate the price and Greeks of an option using the Black-Scholes model
        </p>
      </div>

      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
        <input
          type="number"
          placeholder="Stock Price (S)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={S}
          onChange={(e) => setS(e.target.value)}
        />
        <input
          type="number"
          placeholder="Strike Price (K)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={K}
          onChange={(e) => setK(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time to Maturity (T)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={T}
          onChange={(e) => setT(e.target.value)}
        />
        <input
          type="number"
          placeholder="Risk-Free Rate (r)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={r}
          onChange={(e) => setR(e.target.value)}
        />
        <input
          type="number"
          placeholder="Volatility (σ)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={sigma}
          onChange={(e) => setSigma(e.target.value)}
        />
        <select
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={optionType}
          onChange={(e) => setOptionType(e.target.value as 'call' | 'put')}
        >
          <option value="call">Call Option</option>
          <option value="put">Put Option</option>
        </select>
      </div>

      <button
        onClick={handleCalculate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Calculate Price and Greeks
      </button>

      <div className="mt-4"></div> {/* Added space between the buttons */}

      <button
        onClick={handleGenerateGraphs}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Generate Graphs
      </button>

      {optionPrice !== null && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Option Price: ${optionPrice.toFixed(2)}
          </h2>
        </div>
      )}

      {greeks !== null && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Greeks:
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Delta: {greeks.delta.toFixed(4)}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Gamma: {greeks.gamma.toFixed(4)}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Vega: {greeks.vega.toFixed(4)}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Theta: {greeks.theta.toFixed(4)}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Rho: {greeks.rho.toFixed(4)}
          </p>
        </div>
      )}

      {chartData && (
        <div className="mt-8">
          <Line data={chartData} />
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Example Inputs for Testing
        </h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          <li>Call Option: S = 100, K = 100, T = 1, r = 0.05, σ = 0.2</li>
          <li>Put Option: S = 100, K = 100, T = 1, r = 0.05, σ = 0.2</li>
          <li>Call Option: S = 150, K = 100, T = 0.5, r = 0.03, σ = 0.25</li>
          <li>Put Option: S = 80, K = 100, T = 2, r = 0.04, σ = 0.3</li>
        </ul>
      </div>
    </div>
  );
}
