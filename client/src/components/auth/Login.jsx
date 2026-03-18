import { useState } from "react";

const Login = ({ onRegister }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.table({ email, password });
        setEmail('');
        setPassword('');
    }

    return (
        <div className="lg:w-3/5 w-full flex items-center justify-center bg-gray-100">

            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-105">

                <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-500 mb-6">
                    Enter your credentials to access your dashboard
                </p>

                <div className="mb-4">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 mt-1"
                        placeholder="admin@smartbin.com"
                    />
                </div>

                <div className="mb-4">
                    <div className="flex justify-between">
                        <label>Password</label>
                        <span className="text-blue-500 cursor-pointer text-sm">
                            Forgot password?
                        </span>
                    </div>

                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="********"
                        className="w-full border rounded-lg p-2 mt-1"
                    />
                </div>

                <button className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4">
                    Sign In
                </button>

                <p className="text-center mt-4 text-sm">
                    Don't have an account?
                    <span
                        className="text-blue-600 cursor-pointer ml-1"
                        onClick={onRegister}
                    >
                        Register here
                    </span>
                </p>
            </form>

        </div>
    );
}

export default Login;