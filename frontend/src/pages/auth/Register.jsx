import { useState } from "react";
import api from "../../services/api";


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await api.post("/auth/register", formData);

            console.log(response.data);

            setMessage("Registration successful!");

            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
            });
        } catch (error) {
            setError(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div>
            <h1>Create Account</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;