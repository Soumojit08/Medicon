import { HeartHandshake, User2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const LoginDashboard = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container w-[70%] h-[65%] shadow-lg bg-zinc-50 rounded-2xl">
        <div className="box p-6 flex flex-col items-center">
          <div className="flex justify-evenly mb-4">
            <section
              id="left"
              className="w-[48%] bg-[#f0f0f0] rounded-2xl h-[90%] flex flex-col items-center justify-center py-2"
            >
              <span className="icons mb-6">
                <HeartHandshake className="h-18 w-18 text-blue-600 " />
              </span>
              <h2 className="text-4xl font-semibold text-blue-600">
                For Healthcare Providers
              </h2>
              <p className="text-center text-gray-100 my-2 text-lg w-[80%]">
                Access our comprehensive platform to manage patient care,
                appointments, and telemedicine services efficiently.
              </p>
              <Link href="/login">
                <button className="btn my-4 py-2 px-6 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-500">
                  Doctor Login
                </button>
              </Link>
              <p className="text-center text-gray-100 my-2 text-lg w-[80%]">
                Don't have an account?{" "}
                <a href="/doctorSignup" className="text-blue-600">
                  Contact Support
                </a>{" "}
                |{" "}
                <Link href="/signup" className="text-blue-600">
                  Request Access
                </Link>
              </p>
            </section>

            <section
              id="right"
              className="w-[48%] bg-[#f0f0f0] rounded-2xl h-[90%] flex flex-col items-center justify-center py-2"
            >
              <span className="icons mb-6">
                <User2 className="h-18 w-18 text-blue-600 " />
              </span>
              <h2 className="text-4xl font-semibold text-blue-600">
                For Patients/General User
              </h2>
              <p className="text-center text-gray-100 my-2 text-lg w-[80%]">
                Access your personal health dashboard, book appointments, and
                connect with healthcare professionals.
              </p>
              <Link href="/login">
                <button className="btn my-4 py-2 px-6 bg-transparent border border-blue-600 text-blue-600 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white">
                  User Login
                </button>
              </Link>
              <p className="text-center text-gray-100 my-2 text-lg w-[80%]">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600">
                  Contact Support
                </a>{" "}
                |{" "}
                <Link href="/signup" className="text-blue-600">
                  Sign Up Here
                </Link>
              </p>
            </section>
          </div>
          <Link href="/login" className="text-blue-600 hover:underline ">
            Admin Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginDashboard;
