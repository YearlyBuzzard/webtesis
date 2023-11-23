import React from 'react';

const UserProfile = () => {
    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="flex flex-col items-center justify-start">
                <div className="w-full max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-2">
                        <div className="text-center md:text-left">
                            <img
                                className="md:full mx-auto rounded-full"
                                src="https://via.placeholder.com/150"
                                alt="User profile"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <h2 className="text-xl md:text-2xl font-semibold">Datos del Paciente</h2>
                            <div className="space-y-4 mt-4 md:mt-8">
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
