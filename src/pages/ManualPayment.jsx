
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useLocation } from 'react-router-dom';

const ManualPayment= () => {
    const { state } = useLocation();
    const { email } = state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    email: email,
    sendemail: "",
    company: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your EmailJS service ID, template ID, and public key
    //emailjs.send("service_azxsyrn","template_2hq8erw");

    // const serviceID = "service_azxsyrn";
    // const templateID = "template_2hq8erw";
    // const publicKey = "5bfyVd_p8T3Vp1kNQ";


    const serviceID = "service_t6zl6ah";
    const templateID = "template_2s3fx9r";
    const publicKey = "d6jIqBuGG6H1MMveY";
  

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(
        (response) => {
          setResponseMessage("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            sendemail: "",
            company: "",
            message: "",
          });
        },
        (error) => {
          setResponseMessage("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Confirm payment
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
            We'd love to hear from you. Fill out the form and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-6 overflow-hidden bg-white rounded-xl">
          <div className="px-6 py-12 sm:p-12">
        
            <form onSubmit={handleSubmit} className="mt-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    Your name
                  </label>
                  <div className="mt-2.5 relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2.5 relative">
                    <input
                      type="email"
                      name={email}
                      id="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>

               
                {/* <div>
                  <label htmlFor="phone" className="text-base font-medium text-gray-900">
                    Phone number
                  </label>
                  <div className="mt-2.5 relative">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div> */}

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-base font-medium text-gray-900">
                    Tranasaction Id
                  </label>
                  <div className="mt-2.5 relative">
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here"
                      required
                      className="block w-full px-4 py-4 text-black placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      rows="1"
                    ></textarea>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>

            {responseMessage && (
              <p className="mt-6 text-center text-lg font-medium text-green-500">
                {responseMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManualPayment;

