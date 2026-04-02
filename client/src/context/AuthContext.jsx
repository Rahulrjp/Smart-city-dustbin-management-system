import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        setLoading(true);
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/users/current`;
        try {
            const res = await axios.get(url, { withCredentials: true });
            setUser(res.data);
            console.log("User fetched successfully:");
            console.table(res.data);
        } catch (error) {
            setUser(null);
        }
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, [])
    return <AuthContext.Provider value={{ user, loading, getUser }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);