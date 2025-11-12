import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sign() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const [workerDetails, setWorkerDetails] = useState({
    fullName: "",
    location: "",
    yearsOfExperience: "",
    typeOfWork: [],
  });

  const handleWorkerDetailsChange = (e) => {
    const { name, value } = e.target;
    setWorkerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeOfWorkChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setWorkerDetails((prev) => ({
      ...prev,
      typeOfWork: options,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "User") {
      navigate("/user");
    } else if (role === "Worker" && isSignUp) {
      navigate("/worker-details");
    } else if (role === "Worker") {
      navigate("/worker");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 md:px-16 relative">
      
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6  #0b2545 px-4 py-2 rounded-md font-medium  transition"
      >
        ← Back to Home
      </button>

      {/* Sign In / Sign Up Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#0b2545] text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"} as a {role}
        </h2>

        {/* Toggle between Sign In and Sign Up */}
        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2 rounded-md font-medium ${
              !isSignUp ? "bg-[#0b2545] text-white" : "bg-gray-200 text-[#0b2545]"
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 rounded-md font-medium ${
              isSignUp ? "bg-[#0b2545] text-white" : "bg-gray-200 text-[#0b2545]"
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {/* Toggle between User and Worker */}
        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2 rounded-md font-medium ${
              role === "User" ? "bg-[#0b2545] text-white" : "bg-gray-200 text-[#0b2545]"
            }`}
            onClick={() => setRole("User")}
          >
            As a User
          </button>
          <button
            className={`flex-1 py-2 rounded-md font-medium ${
              role === "Worker" ? "bg-[#0b2545] text-white" : "bg-gray-200 text-[#0b2545]"
            }`}
            onClick={() => setRole("Worker")}
          >
            As a Worker
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
          />
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={workerDetails.fullName}
              onChange={handleWorkerDetailsChange}
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b2545]"
            />
          )}
          <button className="bg-[#0b2545] text-white py-3 rounded-md hover:bg-[#14365b] font-semibold">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4 text-gray-500">or</div>

        {/* Google Sign-In */}
        <button className="flex items-center justify-center gap-3 bg-gray-200 text-[#0b2545] py-3 rounded-md hover:bg-gray-300 w-full">
          <img src="/assets/google-icon.png" alt="Google" className="w-5 h-5" />
          <span className="font-medium">
            {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sign;
