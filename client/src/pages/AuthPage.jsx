import React, { useEffect, useState } from 'react'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register"
import VerifyOtp from '../components/auth/VerifyOtp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();
    const [showRegister, setShowRegister] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [user, setUser] = useState({});
    const [regData, setRegData] = useState({});

    useEffect(() => {
        const getUserData = async () => {
            try {
                const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/users/current`;
                const res = await axios.get(url, { withCredentials: true });
                console.log('User data fetched successfully: ', res);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        getUserData();
    }, [])

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-900 relative overflow-y-auto lg:overflow-hidden">

            {/* LEFT SIDE */}
            <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-8 lg:pl-10 lg:pr-20 pt-10 lg:pt-16 pb-6 lg:pb-10 items-center lg:items-end justify-center relative z-10 overflow-hidden">

                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-(--color-primary) rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-(--color-accent) rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 w-full max-w-md text-center lg:text-left">

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        <span className="text-gray-100 lock-heading ">IoT-Based Smart Dustbin System</span>
                    </h1>

                    {/* Description */}
                    <p className="text-gray-100 text-base sm:text-lg leading-relaxed mb-8 font-para">
                        Real-time monitoring of dustbins across all city zones, with smart route planning and live pickup coordination for a cleaner, more efficient city.
                    </p>

                    {/* Features */}
                    <div className="mb-2 lg:mb-12">
                        <div className="grid grid-cols-2 gap-3 mb-4 lg:flex lg:flex-wrap lg:justify-start">
                            {[
                                'Bins Monitored',
                                'Live Fill Levels',
                                'Route Optimization',
                                'Real-time Alerts',
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="px-3 sm:px-4 py-2 bg-white backdrop-blur-sm border border-(--color-accent-35) rounded-full text-xs sm:text-sm text-(--color-text) text-center lg:text-left whitespace-nowrap"
                                >
                                    <span className="text-(--color-primary) mr-2">●</span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:pl-8 lg:pr-10 pb-10 lg:pb-0 relative z-10">
                {!showRegister ? (
                    <Login onRegister={() => setShowRegister(true)} />
                ) : (
                    <>
                        {isVerifying ? (
                            <VerifyOtp setIsVerifying={setIsVerifying} regData={regData} />
                        ) : (
                            <Register
                                onLogin={() => setShowRegister(false)}
                                setIsVerifying={setIsVerifying}
                                setRegData={setRegData}
                            />
                        )}
                    </>
                )}
            </div>

        </div>
    )
}

export default AuthPage;