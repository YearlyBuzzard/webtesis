import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaMedkit, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErrorMessage('Por favor, complete todos los campos');
        } else {
            try {
                const response = await axios.post('http://localhost:3001/api/login', {
                    email,
                    password,
                });

                if (response.status === 200) {
                    navigate('/Dashboard');
                }
            } catch (error) {
                setErrorMessage('Error al iniciar sesión. Por favor, verifique sus credenciales');
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-blue-300 to-white min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                <div className="flex justify-center mb-8">
                    <FaMedkit className="text-6xl text-blue-500" />
                </div>
                <div className="bg-white w-full rounded-lg p-8 mb-8">
                    <div className="flex flex-col items-center gap-1 mb-8">
                        <h1 className="text-3xl text-gray-900 font-semibold">Bienvenido</h1>
                        <p className="text-gray-400 text-lg">Ingresa con tu correo electrónico y tu contraseña</p>
                    </div>
                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-500 text-lg" />
                            <input
                                type="email"
                                className="w-full border py-2 px-12 rounded-md outline-none bg-white"
                                placeholder="Ingresa tu correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-500 text-lg" />
                            <div className="flex items-center justify-end">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="w-full border py-2 px-12 rounded-md outline-none bg-white"
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-3 cursor-pointer">
                                    {passwordVisible ? <FaEyeSlash className="text-gray-400 text-lg" /> : <FaEye className="text-gray-400 text-lg" />}
                                </span>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center gap-2">
                    {/* <span>¿Olvidaste tu contraseña?</span>
                    <Link to="/" className="text-blue-500">
                        Recuperar
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default Login;


