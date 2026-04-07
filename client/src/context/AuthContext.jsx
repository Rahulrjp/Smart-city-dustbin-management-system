import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 🔥 IMPORTANT

    const getUser = async () => {
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/users/current`;

            const res = await axios.get(url, {
                withCredentials: true, // 🔥 required for cookies
            });

            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setLoading(false); // 🔥 always runs
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                getUser,
                setUser, // useful after login/logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);