import { useState } from "react";

const Register = ({ onLogin, setIsVerifying}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('driver');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'role') {
            setRole(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsVerifying(true);
        console.table({ name, email, password, role });
        setName('');
        setEmail('');
        setPassword('');
    }


    return (
        <div className="lg:w-3/5 w-full flex items-center justify-center bg-gray-100">

            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-105">

                <h1 className="text-2xl font-bold mb-2">Create Account</h1>
                <p className="text-gray-500 mb-6">
                    Register to start using SmartBin
                </p>

                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mb-4"
                    placeholder="Full Name"
                />

                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mb-4"
                    placeholder="Email"
                />

                <select
                    className="w-full border rounded-lg p-2 mb-4"
                    name="role"
                    value={role}
                    onChange={handleChange}
                >
                    <option value="driver">Driver</option>
                    <option value="admin">Admin</option>
                </select>

                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mb-4"
                    placeholder="Password"
                />

                <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
                    Register
                </button>

                <p className="text-center mt-4 text-sm">
                    Already have an account?
                    <span
                        className="text-blue-600 cursor-pointer ml-1"
                        onClick={onLogin}
                    >
                        Login
                    </span>
                </p>

            </form>

        </div>
    );
}

export default Register;