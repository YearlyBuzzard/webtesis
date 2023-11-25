import React from 'react';
import Spinner from "../assets/Spinner";

const UserProfile = ({ patient }) => {
    if (!patient) {
        return <Spinner />;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Concatenación del nombre completo
    const fullName = `${patient.name} ${patient.paternalLastName}`;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:space-x-4">
                {/* Imagen del usuario */}
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex justify-center items-center overflow-hidden rounded-full border-4 border-blue-100 mb-4 md:mb-0">
                    <img
                        className="object-cover w-full h-full"
                        src="https://via.placeholder.com/150"
                        alt="User profile"
                    />
                </div>

                {/* Datos del usuario */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informacion Paciente</h2>
                    <div className="space-y-4">
                        <InfoRow label="Nombre:" value={fullName} />
                        <InfoRow label="Edad:" value={patient.age} />
                        <InfoRow label="Fecha de Nacimiento:" value={formatDate(patient.birthdate)} />
                        <InfoRow label="Género:" value={patient.gender} />
                        <InfoRow label="Estatus:" value={patient.status} />
                        <InfoRow label="CURP:" value={patient.CURP} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div>
        <h3 className="font-semibold text-blue-700">{label}</h3>
        <p className="text-gray-600">{value}</p>
    </div>
);

export default UserProfile;
