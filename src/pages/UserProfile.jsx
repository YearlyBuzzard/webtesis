import React from 'react'

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
                            <p className="mt-2 text-gray-600">Correo electrónico</p>
                            <div className="mt-8 space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700">Biografía</h3>
                                    <p className="text-gray-600">Descripción breve del usuario</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Ubicación</h3>
                                    <p className="text-gray-600">Ciudad, País</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Intereses</h3>
                                    <ul className="text-gray-600 list-disc ml-4">
                                        <li>Interés 1</li>
                                        <li>Interés 2</li>
                                        <li>Interés 3</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Galería</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <img
                                className="w-full h-32 object-cover rounded"
                                src="https://via.placeholder.com/150"
                                alt="Gallery item"
                            />
                            <img
                                className="w-full h-32 object-cover rounded"
                                src="https://via.placeholder.com/150"
                                alt="Gallery item"
                            />
                            <img
                                className="w-full h-32 object-cover rounded"
                                src="https://via.placeholder.com/150"
                                alt="Gallery item"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default UserProfile;