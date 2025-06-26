import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "Sign Up") {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
      if (data.success) {
        const serviceID = "service_z5gwi97";
        const templateID = "template_lsavt01";
        const publicKey = "d6jIqBuGG6H1MMveY";

        emailjs.send(serviceID, templateID, formattedData, publicKey).then(
          (_response) => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              company: "",
              message: "",
            });
          },
          (error) => {}
        );
      }
    } else if (state === "Login") {
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } else if (state === "Reset Password") {
      if (!otpSent) {
        // Send OTP
        try {
          const { data } = await axios.post(backendUrl + "/api/user/get-otp", {
            email,
          });
          if (data.success) {
            setOtpSent(true);
            toast.success("OTP sent to your email.");
          } else {
            toast.error(data.message);
          }
        } catch (err) {
          toast.error("Failed to send OTP.");
        }
      } else {
        // Reset Password
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/reset-password",
            {
              email,
              otp,
              password: newPassword,
            }
          );
         
          if (data.success) {
            toast.success("Password reset successful. Please login.");
            setState("Login");
            setOtpSent(false);
            setOtp("");
            setNewPassword("");
            setEmail("");
          } else {
            toast.error(data.message);
          }
        } catch (err) {
          toast.error("Failed to reset password.");
        }
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up"
            ? "Create Account"
            : state === "Login"
            ? "Login"
            : "Reset Password"}
        </p>
        <p>
          {state === "Sign Up"
            ? "Please sign up to book appointment"
            : state === "Login"
            ? "Please log in to book appointment"
            : "Enter your email to receive OTP"}
        </p>
        {/* Sign Up */}
        {state === "Sign Up" ? (
          <div className="w-full ">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        ) : null}
        {/* Login */}
        {(state === "Sign Up" || state === "Login") && (
          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
        )}
        {(state === "Sign Up" || state === "Login") && (
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
        )}
        {/* Reset Password */}
        {state === "Reset Password" && (
          <>
            <div className="w-full ">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="email"
                required
                disabled={otpSent}
              />
            </div>
            {otpSent && (
              <>
                <div className="w-full ">
                  <p>OTP</p>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="border border-[#DADADA] rounded w-full p-2 mt-1"
                    type="text"
                    required
                  />
                </div>
                <div className="w-full ">
                  <p>New Password</p>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className="border border-[#DADADA] rounded w-full p-2 mt-1"
                    type="password"
                    required
                  />
                </div>
              </>
            )}
          </>
        )}
        {/* Forgot Password link */}
        {state === "Login" && (
          <div className="w-full ">
            <p className="text-sm">
              Forgot Password?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => {
                  setState("Reset Password");
                  setOtpSent(false);
                  setOtp("");
                  setNewPassword("");
                }}
              >
                Click here
              </span>
            </p>
          </div>
        )}
        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === "Sign Up"
            ? "Create account"
            : state === "Login"
            ? "Login"
            : otpSent
            ? "Reset Password"
            : "Send Otp"}
        </button>
        {/* Switch between Login/Sign Up */}
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : state === "Login" ? (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Back to{" "}
            <span
              onClick={() => {
                setState("Login");
                setOtpSent(false);
                setOtp("");
                setNewPassword("");
              }}
              className="text-primary underline cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
