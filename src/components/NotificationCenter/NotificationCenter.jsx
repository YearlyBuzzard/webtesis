import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaBellSlash, FaTimesCircle, FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const NotificationCenter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { notifications, clear, markAllAsRead, remove } = useNotificationCenter();
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative mr-4" ref={menuRef}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none relative">
        {unreadCount > 0 ? (
          <>
            <FaBell className="text-blue-500 text-3xl" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 -mt-2 -mr-2 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          </>
        ) : (
          <FaBellSlash className="text-gray-400 text-3xl" />
        )}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 w-80 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg outline-none z-50" style={{ top: '40px' }}>
          <div className="px-4 py-3 shadow-sm">
            <p className="text-sm leading-5 font-medium text-gray-900">
              Notificaciones
            </p>
          </div>

          <div className="max-h-80 overflow-auto">
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-start px-4 py-3 border-b ${
                    notification.type === 'success' ? 'bg-green-50 border-green-100' :
                    notification.type === 'danger' ? 'bg-red-50 border-red-100' :
                    notification.type === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                    'bg-blue-50 border-blue-100'
                  }`} // Colores de fondo y bordes según tipo de notificación.
                >
                  <div className="flex-1 text-sm">
                    <p className={`font-medium ${
                      notification.type === 'success' ? 'text-green-800' :
                      notification.type === 'danger' ? 'text-red-800' :
                      notification.type === 'warning' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      {notification.content}
                    </p>
                  </div>
                  <button onClick={() => remove(notification.id)} className="text-gray-400 hover:text-red-500 focus:outline-none ml-2">
                    <FaTimesCircle />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center px-4 py-3 text-xs leading-5 font-medium text-gray-700"> {/* Tamaño de texto reducido */}
            <button onClick={clear} className="flex items-center text-red-400 hover:text-red-500 focus:outline-none space-x-2"> {/* Espaciado y color */}
              <FaTrashAlt />
              <span>Eliminar todas</span>
            </button>
            <button onClick={markAllAsRead} className="flex items-center text-green-400 hover:text-green-500 focus:outline-none space-x-2"> {/* Espaciado y color */}
              <FaCheckSquare />
              <span>Marcar todas como leídas</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;




