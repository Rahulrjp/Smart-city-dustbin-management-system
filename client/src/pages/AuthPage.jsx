import React, { useState } from 'react'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register"
import VerifyOtp from '../components/auth/VerifyOtp';

const AuthPage = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    return (
        <div className="h-screen w-screen flex">

            {/* LEFT SIDE */}
            <div className="lg:w-2/5 bg-[url('./assets/authPageImage.png')] bg-cover bg-center lg:flex hidden p-12 items-end text-white ">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold mb-4">
                        Intelligent Waste Management
                    </h1>
                    <p className="text-gray-200">
                        Optimizing collection routes, reducing costs, and keeping our city
                        streets clean with real-time IoT sensor data.
                    </p>
                </div>
            </div>
            {!showRegister ? (
                <Login onRegister={() => setShowRegister(true)} />
            ) : (
                <>
                    {isVerifying ? (
                        <VerifyOtp setIsVerifying={setIsVerifying} />
                    ) : (
                        <Register onLogin={() => setShowRegister(false)} setIsVerifying={setIsVerifying} />
                    )}
                </>
            )}
        </div>
    )
}

export default AuthPage;