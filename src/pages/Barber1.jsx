

import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star } from "lucide-react";
import { Input } from "../tt/components/ui/input";

const deg2rad = (deg) => deg * (Math.PI / 180);

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const extractCoordinates = (line1) => {
  const regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = line1?.match(regex);
  if (match) {
    return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
  }
  return null;
};

const Doctors = () => {
  const [pointA, setPointA] = useState({ latitude: "", longitude: "" });
  const [sortedDoc, setSortedDoc] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPointA({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert(
            "Unable to fetch your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (!pointA.latitude || !pointA.longitude) return;

    let filteredDoctors = doctors
      .map((doc) => {
        const coordinates = extractCoordinates(doc.address.line1);
        if (!coordinates) {
          console.warn(`Invalid address format for doctor: ${doc.name}`);
          return null;
        }
        const { latitude: docLat, longitude: docLon } = coordinates;
        const distance = calculateDistance(
          parseFloat(pointA.latitude),
          parseFloat(pointA.longitude),
          docLat,
          docLon
        );
        return { ...doc, distance };
      })
      .filter((doc) => doc !== null)
      .filter((doc) => doc.available);

    if (searchQuery.trim() !== "") {
      filteredDoctors = filteredDoctors.filter((doc) =>
        doc.speciality?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filteredDoctors.sort((a, b) => a.distance - b.distance);

    setSortedDoc(filteredDoctors);
    setVisibleCount(10); // Reset count on search or change
  }, [doctors, pointA, searchQuery]);

  const visibleDoctors = sortedDoc.slice(0, visibleCount);

  return (
    <div>
      

      {/* Hero Section */}
      <div className="bg-pet-cream py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-pet-dark mb-4">
              Find Your Perfect Vet
            </h1>
            <p className="text-gray-600 mb-8">
              Browse our team of experienced veterinarians and find the perfect
              match for your pet's needs.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto flex flex-col md:flex-row gap-3">
              <div className="flex-grow relative">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MapPin size={16} />
                </div>
                <Input
                  placeholder="Search by Location"
                  className="w-full pl-7 pr-2 text-sm py-1.5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={(e) => e.preventDefault()}
                className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
        {visibleDoctors.length > 0 ? (
          visibleDoctors.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                className="bg-[#EAEFFF]"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                {item.distance !== null && (
                  <p className="text-[#5C5C5C] text-sm">
                    Distance: {item.distance.toFixed(2)} km
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full">No doctor found near you.</p>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < sortedDoc.length && (
  <div className="flex justify-center mt-10 mb-16">
    <button
      onClick={() => setVisibleCount((prev) => prev + 10)}
      className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
    >
      Load More
    </button>
  </div>
)}

<div style={{ height: "80vh" }} />


    </div>
  );
};

export default Doctors;
