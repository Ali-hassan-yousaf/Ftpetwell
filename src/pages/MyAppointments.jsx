import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyAppointments = () => {
  const { userData, backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formatAppointmentDate = (slotDate) => {
    const datePart = slotDate.split('|')[0].trim();
    const dateArray = datePart.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
  };

  const formatAppointmentTime = (slotDate) => {
    return slotDate.split('|')[1]?.trim() || 'N/A';
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments');
            getUserAppointments();
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.message);
    }
  };

  const manualPaymentHandler = async (appointmentId, email) => {
    // When Manual Payment is clicked, navigate to another page with email in the state
    navigate('/manual-payment', { state: { email } });
  };
  

  const processAppointmentDetails = (detailsString) => {
    if (!detailsString) return null;
    const parts = detailsString.split(',');
    return {
      pet: parts[0]?.trim() || 'N/A',
      breed: parts[1]?.trim() || 'N/A',
      age: parts[2]?.trim() || 'N/A',
      owner: parts[3]?.trim() || 'N/A',
      contact: parts[4]?.trim() || 'N/A',
      type: parts[5]?.trim() || 'N/A'
    };
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
      <div>
        {appointments.map((item, index) => {
          const detailsPart = item.slotDate.split('|')[2]?.trim();
          const details = processAppointmentDetails(detailsPart);
          return (
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
              <div>
                <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-[#5E5E5E]'>
                <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
                <p className='text-[#262626] text-base font-semibold'>{item.docData.email}</p>

                <p className='text-[#464646] font-medium mt-1'>Address:</p>
                <p>{item.docData.address.line1}</p>
                <p className='mt-1'>
                  <span className='text-sm text-[#3C3C3C] font-medium'>Date:</span> {formatAppointmentDate(item.slotDate)}
                </p>
                <p className='mt-1'>
                  <span className='text-sm text-[#3C3C3C] font-medium'>Time:</span> {formatAppointmentTime(item.slotDate)}
                </p>
                {details && (
                  <>
                    <p className='mt-1'><strong>Pet:</strong> {details.pet}</p>
                    <p><strong>Breed:</strong> {details.breed}</p>
                    <p><strong>Age:</strong> {details.age}</p>
                    <p><strong>Owner:</strong> {details.owner}</p>
                    <p><strong>Contact:</strong> {details.contact}</p>
                    <p><strong>Type:</strong> {details.type}</p>
                  </>
                )}
              </div>
              <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                {!item.cancelled && !item.payment && !item.isCompleted && !paymentStatus[item._id] && (
                  <button onClick={() => setPaymentStatus((prev) => ({ ...prev, [item._id]: true }))} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && paymentStatus[item._id] && (
                  <>
                    <button onClick={() => appointmentStripe(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'>
                      <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="Stripe" />
                    </button>
                    <button
  onClick={() => manualPaymentHandler(item._id, item.docData.email)}
  className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-yellow-500 hover:text-white transition-all duration-300'
>
  Manual Payment
</button>

                  </>
                )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]'>Paid</button>
                )}
                {item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                    Cancel appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
