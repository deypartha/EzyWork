import React, { useState } from "react";
import { FaMicrophone, FaCamera, FaStar, FaMapMarkerAlt } from "react-icons/fa";

function User() {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState("");
  const [workerSuggestions, setWorkerSuggestions] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [history, setHistory] = useState([]);
  const [otp, setOtp] = useState("");

  const handleProblemSubmit = () => {
    setWorkerSuggestions([
      {
        id: 1,
        name: "John Doe",
        skill: "Electrician",
        rating: 4.8,
        distance: "2.1 km",
        price: "$50 - $70",
      },
      {
        id: 2,
        name: "Jane Smith",
        skill: "Plumber",
        rating: 4.5,
        distance: "3.5 km",
        price: "$40 - $60",
      },
    ]);
    setStep(2);
  };

  const handleWorkerAccept = (worker) => {
    setSelectedWorker(worker);
    setStep(3);
  };

  const handlePayment = (method) => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setHistory((prev) => [
      ...prev,
      {
        worker: selectedWorker,
        problem,
        status: "Pending",
        otp: generatedOtp,
      },
    ]);
    setStep(4);
  };

  const cancelWork = (historyItem) => {
    setHistory((prev) => prev.filter((item) => item !== historyItem));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center px-6 md:px-16">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-[#0b2545]">EzyWork</h1>
        <nav className="flex gap-8 text-gray-700">
          <button
            onClick={() => setStep(5)}
            className="hover:text-black font-medium"
          >
            History
          </button>
          <button
            onClick={() => setStep(6)}
            className="hover:text-black font-medium"
          >
            Pending
          </button>
        </nav>
      </header>

      {/* Step 1: Problem Description */}
      {step === 1 && (
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#0b2545] mb-6">
            Describe Your Problem
          </h2>
          <textarea
            placeholder="Describe your problem (e.g., AC not cooling, tap leaking...)"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b2545] mb-4"
          />
          <div className="flex gap-4">
            <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaMicrophone className="text-[#0b2545]" />
            </button>
            <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaCamera className="text-[#0b2545]" />
            </button>
          </div>
          <button
            onClick={handleProblemSubmit}
            className="bg-[#0b2545] text-white px-6 py-3 rounded-md hover:bg-[#14365b] font-semibold mt-4"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Worker Suggestions */}
      {step === 2 && (
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-[#0b2545] mb-6">
            Available Workers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workerSuggestions.map((worker) => (
              <div
                key={worker.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0b2545]">
                      {worker.name}
                    </h3>
                    <p className="text-gray-600">{worker.skill}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-500 mb-4">
                  <FaStar />
                  <span>{worker.rating}</span>
                </div>
                <div className="text-gray-600 mb-4">
                  <FaMapMarkerAlt className="inline-block mr-2" />
                  {worker.distance}
                </div>
                <div className="text-gray-600 mb-4">{worker.price}</div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleWorkerAccept(worker)}
                    className="bg-[#0b2545] text-white px-4 py-2 rounded-md hover:bg-[#14365b] font-semibold"
                  >
                    Accept
                  </button>
                  <button className="bg-gray-200 text-[#0b2545] px-4 py-2 rounded-md hover:bg-gray-300 font-semibold">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && selectedWorker && (
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#0b2545] mb-6">
            Confirm Your Booking
          </h2>
          <p className="text-gray-600 mb-4">
            Worker: <strong>{selectedWorker.name}</strong>
          </p>
          <p className="text-gray-600 mb-4">
            Problem: <strong>{problem}</strong>
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handlePayment("Pay Now")}
              className="bg-[#0b2545] text-white px-6 py-3 rounded-md hover:bg-[#14365b] font-semibold"
            >
              Pay Now
            </button>
            <button
              onClick={() => handlePayment("Pay Later")}
              className="bg-gray-200 text-[#0b2545] px-6 py-3 rounded-md hover:bg-gray-300 font-semibold"
            >
              Pay Later
            </button>
          </div>
        </div>
      )}

      {/* Step 4: OTP Generation */}
      {step === 4 && (
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-[#0b2545] mb-6">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Your OTP: <strong>{otp}</strong>
          </p>
          <p className="text-gray-600">
            Share this OTP with the worker after the work is completed.
          </p>
        </div>
      )}

      {/* Step 5: History */}
      {step === 5 && (
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-[#0b2545] mb-6">History</h2>
          <div className="grid grid-cols-1 gap-6">
            {history
              .filter((item) => item.status === "Completed")
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <p className="text-gray-600 mb-2">
                    Problem: <strong>{item.problem}</strong>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Worker: <strong>{item.worker.name}</strong>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Status: <strong className="text-green-500">Completed</strong>
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Step 6: Pending */}
      {step === 6 && (
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-[#0b2545] mb-6">Pending</h2>
          <div className="grid grid-cols-1 gap-6">
            {history
              .filter((item) => item.status === "Pending")
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <p className="text-gray-600 mb-2">
                    Problem: <strong>{item.problem}</strong>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Worker: <strong>{item.worker.name}</strong>
                  </p>
                  <p className="text-gray-600 mb-2">
                    OTP: <strong>{item.otp}</strong>
                  </p>
                  <button
                    onClick={() => cancelWork(item)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default User;