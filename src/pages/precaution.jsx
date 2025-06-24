import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext'; // Import the context

const AddD = () => {
  // Use context for authentication
  const { token, backendUrl, userData } = useContext(AppContext);
  
  // State for precautions data and UI
  const [precautions, setPrecautions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [risk, setRisk] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrecaution, setSelectedPrecaution] = useState({});
  const isInitialLoad = useRef(true); // Track initial load

  // Fetch precautions data
  useEffect(() => {
       if (!hasReloaded.current) {
      hasReloaded.current = true;
      window.location.reload();
    }
    
    const fetchPrecautions = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/worker`);
        const data = await response.json();
        const filteredData = data.filter((item) => item.shopname === "Precautions") || [];
        setPrecautions(filteredData);
      } catch (error) {
        console.error("Error fetching precautions:", error);
      }
    };
    fetchPrecautions();
  }, [backendUrl]);

  // Add precaution
  const handleAddPrecaution = async (e) => {
    e.preventDefault();
    if (!token) {
      setErrorMessage("Please login to add precautions");
      return;
    }
    
    setLoading(true);
    setErrorMessage("");

    const newPrecaution = {
      shopname: "Precautions",
      title,
      description: `${description}|${risk}`,
    };

    try {
      const response = await fetch(`${backendUrl}/api/worker/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(newPrecaution),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Failed to create precaution.");
        setLoading(false);
        return;
      }

      setPrecautions([...precautions, data]);
      setTitle("");
      setDescription("");
      setRisk("");
    } catch (error) {
      console.error("Error adding precaution:", error);
      setErrorMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  // Delete precaution
  const handleDeletePrecaution = async (id) => {
    if (!token) {
      setErrorMessage("Please login to delete precautions");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/worker/${id}`, {
        method: "DELETE",
        headers: { token: token }
      });

      if (!response.ok) {
        setErrorMessage("Failed to delete precaution.");
        setLoading(false);
        return;
      }

      setPrecautions(precautions.filter((precaution) => precaution._id !== id));
    } catch (error) {
      console.error("Error deleting precaution:", error);
      setErrorMessage("An unexpected error occurred.");
    }
    setLoading(false);
  };

  // View details
  const handleViewDetails = (precaution) => {
    const [description, risk] = precaution.description.split('|');
    setSelectedPrecaution({
      title: precaution.title,
      description,
      risk
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPrecaution({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Login check */}
      {!token ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please Login First</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the Pet Precautions & Risks section.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <>
          <header className="mb-8 text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">Pet Precautions & Risks</h1>
            <p className="text-base text-gray-600">Manage important precautions and associated risks for your pets</p>
          </header>

          {errorMessage && (
            <div className="mb-6 max-w-2xl mx-auto p-4 bg-red-50 text-red-700 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          {/* Precautions Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {precautions.map((precaution, index) => {
              const [description, risk] = precaution.description.split('|');
              
              return (
                <article
                  key={precaution._id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between h-[320px] w-full transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="space-y-4 overflow-hidden">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {precaution.title || `Precaution #${index + 1}`}
                    </h3>
                    
                    {/* Precaution container */}
                    <div className="bg-blue-50 p-3 rounded-lg h-28 overflow-y-auto">
                      <h4 className="text-xs font-medium text-blue-700 mb-1">PRECAUTION</h4>
                      <p className="text-gray-600 text-sm">{description}</p>
                    </div>
                    
                    {/* Risk container */}
                    <div className="bg-red-50 p-3 rounded-lg h-28 overflow-y-auto">
                      <h4 className="text-xs font-medium text-red-700 mb-1">RISK</h4>
                      <p className="text-gray-600 text-sm">{risk}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleViewDetails(precaution)}
                      className="px-3 py-1.5 text-white bg-blue-600 rounded-lg text-sm font-medium transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      View
                    </button>
                    {userData?.role === "admin" && (
                      <button
                        onClick={() => handleDeletePrecaution(precaution._id)}
                        className="px-3 py-1.5 text-white bg-red-600 rounded-lg text-sm font-medium transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Modal for Full Details */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedPrecaution.title}</h2>
                
                {/* Precaution details */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-blue-700 mb-2">PRECAUTION</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedPrecaution.description}</p>
                  </div>
                </div>
                
                {/* Risk details */}
                <div>
                  <h3 className="text-sm font-medium text-red-700 mb-2">RISK</h3>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedPrecaution.risk}</p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-white bg-gray-600 rounded-lg text-sm font-medium transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Precaution Form (only for admin) */}
          {userData?.role === "admin" && (
            <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
              <form onSubmit={handleAddPrecaution} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Add New Precaution
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precaution Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter precaution title"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precaution Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write your precaution description..."
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Associated Risk
                    </label>
                    <textarea
                      value={risk}
                      onChange={(e) => setRisk(e.target.value)}
                      placeholder="Write the associated risk..."
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Precaution...
                    </div>
                  ) : (
                    'Add Precaution'
                  )}
                </button>
              </form>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default AddD;
