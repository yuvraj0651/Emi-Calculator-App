import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(5);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;

    if (p <= 0 || r <= 0 || n <= 0) return;

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPayable = emiValue * n;
    const interest = totalPayable - p;

    setEmi(emiValue.toFixed(0));
    setTotalAmount(totalPayable.toFixed(0));
    setTotalInterest(interest.toFixed(0));
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-IN");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-6">
            EMI Calculator
          </h1>

          {/* Loan Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(+e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(+e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Tenure */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(+e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded p-4 space-y-2">
            <p className="flex justify-between">
              <span>Monthly EMI</span>
              <span className="font-semibold">
                ₹ {formatCurrency(emi)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Total Interest</span>
              <span className="font-semibold">
                ₹ {formatCurrency(totalInterest)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Total Amount</span>
              <span className="font-semibold">
                ₹ {formatCurrency(totalAmount)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
