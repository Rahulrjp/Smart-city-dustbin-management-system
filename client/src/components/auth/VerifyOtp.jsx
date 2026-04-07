import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const VerifyOtp = ({ setIsVerifying, regData }) => {
    const { getUser } = useAuth();
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [seconds, setSeconds] = useState(59);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Timer Logic
    useEffect(() => {
        const timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value.substring(element.value.length - 1);
        setOtp(newOtp);

        if (element.value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResend = async () => {
        setSeconds(59);
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/auth/otp/send`;
            await axios.post(url, { email: regData.email }, { withCredentials: true });
        } catch (error) {
            console.error('OTP resend failed: ', error);
        }
    };


    const handleVerification = async () => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/auth/otp/verify`;
            const registrationUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/auth/register`;
            const res = await axios.post(url, { ...regData, otp: otp.join("") }, { withCredentials: true });

            if (res.data.verified) {
                console.log('OTP verification successful: ', res);
                const registrationRes = await axios.post(registrationUrl, regData, { withCredentials: true });
                console.log('Registration successful: ', registrationRes);
                getUser();
                navigate(`/dashboard/${regData.role}`);
                setIsVerifying(false);
            }
        } catch (error) {
            console.error('OTP verification failed: ', error);
        }
        setLoading(false);
    }

    return (
        <div className="lg:w-3/5 w-full flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Header Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">We just sent a verification code</h2>
                    <p className="text-gray-500 mt-2">
                        Enter the security code we sent to <br />
                        <span className="text-indigo-600 font-medium">{regData.email}</span>
                        <button
                            onClick={() => setIsVerifying(false)}
                            className="ml-2 text-indigo-400 hover:text-indigo-600">✎</button>
                    </p>
                </div>

                {/* OTP Input Fields */}
                <div className="flex gap-4 justify-center">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-16 h-16 text-2xl text-center font-semibold border-2 border-gray-200 rounded-xl 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                        />
                    ))}
                </div>

                {/* Submit Button */}
                <button onClick={handleVerification} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg 
                           hover:bg-indigo-700 active:scale-[0.98] transition-all">
                    {loading ? (
                        <span className="btn-loading">
                            <span className="loader-circle" aria-hidden="true"></span>
                            Verifying
                            <span className="loading-dots" aria-hidden="true">
                                <span>.</span><span>.</span><span>.</span>
                            </span>
                        </span>
                    ) : (
                        'Verify OTP'
                    )}
                </button>

                {/* Footer / Resend */}
                <div className="text-sm text-gray-500">
                    <p>Didn't receive code?</p>
                    <button
                        disabled={seconds > 0}
                        className={`font-semibold mt-1 ${seconds > 0 ? 'text-indigo-300' : 'text-indigo-600 hover:underline'}`}
                        onClick={handleResend}
                    >
                        Resend
                    </button>
                    <span className="ml-1 text-gray-400">
                        - 00:{seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp