

import React, { useEffect, useState } from "react";

const AddD = () => {
  const [workers, setWorkers] = useState([]);
  const [shopname, setShopname] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("https://pet-well-zuxu.vercel.app/api/worker");
        const data = await response.json();
        const filteredData = data.filter((worker) => worker.shopname === "Precautions") || [];
        setWorkers(filteredData);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, []);

  const handleAddWorker = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const newWorker = {
      shopname: "Precautions",
      description,
    };

    try {
      const response = await fetch("https://pet-well-zuxu.vercel.app/api/worker/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorker),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Failed to create post.");
        setLoading(false);
        return;
      }

      setWorkers([...workers, data]);
      setShopname("");
      setDescription("");
    } catch (error) {
      console.error("Error adding worker:", error);
      setErrorMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  const handleDeleteWorker = async (workerId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pet-well-zuxu.vercel.app/api/worker/${workerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setErrorMessage("Failed to delete post.");
        setLoading(false);
        return;
      }

      setWorkers(workers.filter((worker) => worker._id !== workerId));
    } catch (error) {
      console.error("Error deleting worker:", error);
      setErrorMessage("An unexpected error occurred.");
    }
    setLoading(false);
  };

  const handleViewDescription = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <header className="mb-8 text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">Pet Precautions</h1>
        <p className="text-base text-gray-600">Share and discover important precautions for your pets</p>
      </header>

      {errorMessage && (
        <div className="mb-6 max-w-2xl mx-auto p-4 bg-red-50 text-red-700 rounded-lg text-center">
          {errorMessage}
        </div>
      )}

      {/* Precautions Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {workers.map((worker, index) => (
          <article
            key={worker._id}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between h-64 transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="space-y-3 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {worker.shopname} #{index + 1}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-4">{worker.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleViewDescription(worker.description)}
                className="px-3 py-1.5 text-white bg-blue-600 rounded-lg text-sm font-medium transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View
              </button>
              {/* <button
                onClick={() => handleDeleteWorker(worker._id)}
                className="px-3 py-1.5 text-white bg-red-600 rounded-lg text-sm font-medium transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button> */}
            </div>
          </article>
        ))}
      </div>

      {/* Modal for Full Description */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Full Precaution Description</h2>
            <p className="text-gray-600 text-sm">{selectedDescription}</p>
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

   
    </div>
  );
};

export default AddD;