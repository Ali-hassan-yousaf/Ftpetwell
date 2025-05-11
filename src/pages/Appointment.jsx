import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `https://voguedeploy.vercel.app/api/worker`;

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext);
  const { userData } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [showAddress] = useState(false);
  const handleOpenGoogleMaps = () => {
    const address = docInfo.address.line1;
    window.open(docInfo.address.line1, "_blank"); // Opens the address in a new tab
  };

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [workersid, setWorkers] = useState([]);
  const [workersidd, setWorkersd] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [petDetails, setPetDetails] = useState({
    name: "",
    breed: "",
    age: "",
    ownerName: "",
    ownerContact: ""
  });
  const [appointmentType, setAppointmentType] = useState(""); // New state for appointment type

  // Extracting the selected date from the selected slot
  const selectedSlot = docSlots[slotIndex] && docSlots[slotIndex][0];
  const selectedDate = selectedSlot ? selectedSlot.datetime : null;

  if (selectedDate) {
    // Formatting the date as 'day_month_year' (e.g., '1_2_2025')
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; // Add 1 because months are 0-indexed
    const year = selectedDate.getFullYear();
    const formattedDate1 = `${day}_${month}_${year}`;
  } else {
    // console.log("No slot selected");
  }

  const handleSelect = (e) => {
    const selectedService = docInfo?.services.find(
      (service) => service.service === e.target.value
    );

    if (selectedService && !selectedServices.includes(selectedService)) {
      setSelectedServices([...selectedServices, selectedService]);
      setTotalFee((prevTotal) =>  Number(selectedService.fee));
    }
  };

  const handleRemove = (serviceToRemove) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => service !== serviceToRemove)
    );
    setTotalFee((prevTotal) => prevTotal - serviceToRemove.fee);
  };

  const [newWorker, setNewWorker] = useState({ name: "", slot: "", date: "" });

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/worker");
      setWorkers(data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    if (!selectedServices) {
      toast.warning("Please select a service before booking the appointment");
      return;
    }

    if (!petDetails.name || !petDetails.breed || !petDetails.age || !petDetails.ownerName || !petDetails.ownerContact) {
      toast.warning("Please fill all pet and owner details before booking the appointment");
      return;
    }

    if (!appointmentType) {
      toast.warning("Please select an appointment type before booking");
      return;
    }

    setIsLoading(true);

    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    // Concatenate pet and owner details
    const appointmentDetails = `${petDetails.name},${petDetails.breed},${petDetails.age} years,${petDetails.ownerName},${petDetails.ownerContact},${appointmentType}`;

    // Check if the worker is already booked for this slot
    const isAlreadyBooked = workers1.some((worker) => {
      return (
        worker.shopname === docId &&
        worker.date === slotDate + ' | ' + slotTime + ' | ' + appointmentDetails &&
        worker.slot === slotTime
      );
    });

    // If the worker is already booked for this slot, show error and exit
    if (isAlreadyBooked) {
      toast.error("The selected slot is already booked.");
      setIsLoading(false);
      return;
    }

    // Proceed with booking the appointment if no conflicts found
    try {
      // Set selected service fee
      setSelectedService(totalFee);

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { 
          docId: docId, 
          slotDate: slotDate + ' | ' + slotTime + ' | ' + appointmentDetails, 
          slotTime, 
          selectedService: totalFee, 
          selectedWorker: appointmentDetails
        },
        { headers: { token } }
      );

      // If booking is successful, add the worker to the system
      if (data.success) {
        const hardcodedWorker = { 
          shopname: docId, 
          name: appointmentDetails, 
          slot: slotTime, 
          date: slotDate + ' | ' + slotTime + ' | ' + appointmentDetails
        };

        // Add the worker after successful booking
        await addWorker(hardcodedWorker); // Add worker to system
        setStatusMessage("Appointment details added!");

        // Fetch and update the worker list after adding the new booking
        const updatedWorkers1 = await fetchWorkers1();
        setWorkers1(updatedWorkers1);

        // Show success message
        toast.success(data.message);
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts();
    }
  }, [docInfo]);

  const handleClick = () => {
    bookAppointment();
    console.log("worker name ", workersidd);
  };

  const [workers1, setWorkers1] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch workers1 when the component mounts
  useEffect(() => {
    const getWorkers1 = async () => {
      const workers1Data = await fetchWorkers1();
      setWorkers1(workers1Data);
    };

    getWorkers1();
  }, []); // This will run only once when the component mounts

  const handlePetDetailsChange = (e) => {
    const { name, value } = e.target;
    setPetDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return docInfo ? (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/3">
              <img className="w-full rounded-2xl shadow-lg" src={docInfo.image} alt="Doctor" />
            </div>

            <div className="flex-1 border border-[#ADADAD] rounded-2xl p-8 py-7 bg-white shadow-inner">
              <p className="flex items-center gap-2 text-3xl font-semibold text-gray-800">
                {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" />
              </p>
              <p className="text-gray-600 font-medium mt-4">
                About: <span className="text-gray-800">{docInfo.about}</span>
              </p>
              <button
  onClick={handleOpenGoogleMaps}
  className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl transition-colors duration-300 hover:shadow-none"
>
  {showAddress ? docInfo.address.line1 : "Show Address"}
</button>

            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Information</h2>
            
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Available Slots</h3>
              
              <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 p-2 space-x-3">
                {docSlots.length &&
                  docSlots.map((item, index) => (
                    <div
                      onClick={() => setSlotIndex(index)}
                      key={index}
                      className={`text-center py-4 px-2 min-w-[80px] rounded-full cursor-pointer transition-all duration-300 ${
                        slotIndex === index 
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "border border-[#DDDDDD] text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                      <p className="font-semibold">{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                  ))}
              </div>

              <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 p-2 space-x-3">
                {docSlots.length &&
                  docSlots[slotIndex].map((item, index) => (
                    <p
                      onClick={() => setSlotTime(item.time)}
                      key={index}
                      className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                        item.time === slotTime 
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "border border-[#DDDDDD] text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </p>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Pet Information</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  value={petDetails.name}
                  onChange={handlePetDetailsChange}
                  placeholder="Pet Name"
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  name="breed"
                  value={petDetails.breed}
                  onChange={handlePetDetailsChange}
                  placeholder="Pet Breed"
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  name="age"
                  value={petDetails.age}
                  onChange={handlePetDetailsChange}
                  placeholder="Pet Age (years)"
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Owner Information</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="ownerName"
                  value={petDetails.ownerName}
                  onChange={handlePetDetailsChange}
                  placeholder="Owner Name"
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  name="ownerContact"
                  value={petDetails.ownerContact}
                  onChange={handlePetDetailsChange}
                  placeholder="Owner Contact"
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Appointment Type</h3>
              
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="" disabled selected>
                  Select Appointment Type
                </option>
                <option value="Physical">Physical</option>
                <option value="Virtual">Virtual</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Select Paymnet</h3>
              
              <select
                onChange={handleSelect}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="" disabled selected>
                  Select a Payment
                </option>
                {docInfo?.services.map((service, index) => (
                  <option key={index} value={service.service}>
                    {service.service} - {currencySymbol}
                    {service.fee}
                  </option>
                ))}
              </select>

              <div className="mt-4 border-t border-gray-200 pt-4">
  <h3 className="text-lg font-semibold">Selected Service:</h3>
  {selectedServices.length > 0 ? (
    <div className="flex justify-between items-center mt-3">
      <span className="text-gray-700">
        {selectedServices[selectedServices.length - 1].service} - {currencySymbol}
        {selectedServices[selectedServices.length - 1].fee}
      </span>
      <button
        onClick={() => handleRemove(selectedServices[selectedServices.length - 1])}
        className="text-red-500 hover:text-red-700 transition-colors duration-300"
      >
        Remove
      </button>
    </div>
  ) : (
    <p className="text-gray-500 italic mt-2">No Payment selected</p>
  )}

  <div className="mt-4">
    <h3 className="text-lg font-semibold">
      Total Fee: {currencySymbol}
      {totalFee}
    </h3>
  </div>

  <button
    onClick={handleClick}
    className={`w-full mt-6 py-3 rounded-xl ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
    } transition-all duration-300`}
    disabled={isLoading}
  >
    {isLoading ? "Booking..." : "Book Appointment"}
  </button>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <img 
          src={assets.loader} 
          alt="Loading" 
          className="w-16 h-16 animate-spin" 
        />
        <p className="mt-4 text-gray-600">Loading appointment details...</p>
      </div>
    </div>
  );
};

export default Appointment;

export const addWorker = async (worker) => {
  try {
    await axios.post(API_URL, worker);
    console.log("Worker added successfully!");
  } catch (error) {
    console.error("Error saving worker:", error);
  }
};

// Function to fetch all workers1
const fetchWorkers1 = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching workers1:", error);
    return [];
  }
};