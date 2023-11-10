import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { GiLungs } from 'react-icons/gi';
import { FaTint } from 'react-icons/fa';
import { AreaChart, Area, YAxis, Tooltip, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';

const OxygenLevel = () => {
    const [level, setLevel] = useState(null);
    const [data, setData] = useState([]);
    const toastIdRef = useRef({ success: null, warning: null, error: null });
    const previousLevelRef = useRef(level);

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const newValue = randomBetween(85, 110);
            const currentTime = new Date();
            const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
            setLevel(newValue);
            setData(prevData => [...prevData, { time: formattedTime, value: newValue }]);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const previousLevel = previousLevelRef.current;

        if (level < 90 && previousLevel >= 90) {
            toastIdRef.current.error = toast.error('La oxigenación en sangre del paciente es peligrosamente baja. Por favor, llame a un médico de inmediato.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                toastId: toastIdRef.current.error
            });
        } else if (level >= 90 && level < 95 && (previousLevel < 90 || previousLevel >= 95)) {
            toastIdRef.current.warning = toast.warning('La oxigenación en sangre del paciente está por debajo del rango normal.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                toastId: toastIdRef.current.warning
            });
        } else if (level >= 95 && previousLevel < 95) {
            toastIdRef.current.success = toast.success('La oxigenación en sangre del paciente está dentro del rango normal.', {
                toastId: toastIdRef.current.success
            });
        }

        previousLevelRef.current = level;
    }, [level]);

    let color = '';
    let colorValue = '';
    if (level < 90) {
        color = 'text-red-500';
        colorValue = '#EF4444';
    } else if (level < 95) {
        color = 'text-yellow-500';
        colorValue = '#FBBF24';
    } else {
        color = 'text-green-500';
        colorValue = '#10B981';
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = () => setIsModalOpen(false);
    const handleShow = () => setIsModalOpen(true);

    const previewData = data.slice(-10);

    return (
        <div className="flex flex-col w-full" onClick={handleShow}> {/* Aquí se utiliza w-full para asegurar que se use todo el ancho */}
            <div className="bg-white p-5 rounded-xl flex-grow"> {/* Aquí se utiliza flex-grow para permitir que el elemento crezca y ocupe el espacio disponible */}
                <div className="text-center flex flex-col items-center w-full"> {/* Se añade w-full aquí también */}
                    <h1 className="text-2xl font-bold text-blue-800 mb-4">Oxigenación en Sangre<GiLungs className="inline-block ml-2" /></h1>
                    <div className={`text-6xl font-semibold ${color} mb-4`}>{level}% <FaTint className="inline-block ml-2" size={24} /></div>
                    <ResponsiveContainer width="100%" height={100}>
                        <AreaChart data={previewData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <Area type="monotone" dataKey="value" stroke="none" fill={colorValue} fillOpacity={0.2} />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Tooltip />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={handleClose}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        {/* Aseguramos que el modal no aparezca estrecho, ajustando las clases para un ancho máximo más amplio */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full" onClick={(e) => e.stopPropagation()}>

                            {/* Contenido del modal */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Oxigenación en Sangre</h3>
                                    </div>
                                </div>
                                {/* Contenedor para la gráfica, asegurando que es tan ancho como el modal */}
                                <div className="w-full h-[500px] mt-4">
                                    <ResponsiveContainer>
                                        <AreaChart data={data}>
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="value" fill={colorValue} stroke={colorValue} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OxygenLevel;



