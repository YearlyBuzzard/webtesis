import React from 'react';

const UserProfile = () => {
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center md:text-left">
                            <img
                                className="w-48 h-48 mx-auto md:mx-0 md:ml-0 rounded-full"
                                src="https://via.placeholder.com/150"
                                alt="User profile"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <h2 className="text-2xl font-semibold">Nombre de usuario</h2>
                            <div className="mt-8 space-y-4">
                                {/* Aquí agregamos los nuevos campos */}
                                <div>
                                    <h3 className="font-semibold text-gray-700">Edad</h3>
                                    <p className="text-gray-600">Edad del usuario</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Fecha de Nacimiento</h3>
                                    <p className="text-gray-600">DD/MM/AAAA</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Género</h3>
                                    <p className="text-gray-600">Género del usuario</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Estatus</h3>
                                    <p className="text-gray-600">Estado actual del usuario</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">CURP</h3>
                                    <p className="text-gray-600">CURP del usuario</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">ID del Dispositivo de Partículas</h3>
                                    <p className="text-gray-600">Identificador del dispositivo</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Fecha de Registro</h3>
                                    <p className="text-gray-600">Fecha de registro del usuario</p>
                                </div>
                                {/* Fin de los nuevos campos */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
