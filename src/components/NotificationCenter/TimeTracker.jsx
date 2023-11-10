import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useReducer, useRef } from "react";

// Extiende dayjs con los plugins necesarios
dayjs.extend(duration);
dayjs.extend(relativeTime);

// Este componente no necesita recibir `Props` con TypeScript, así que lo hemos simplificado a un componente funcional de React normal.
export function TimeTracker({ createdAt }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const intervalRef = useRef();

  // Refrescar el valor de `createdAt` aproximadamente cada minuto
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      forceUpdate();
    }, 1000);

    // Limpiar el intervalo si el componente se desmonta
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Definir estilos en línea
  const wrapperStyle = {
    color: "#666",
  };

  return (
    // Aplicar estilos en línea al contenedor
    <div style={wrapperStyle}>
      <span>{dayjs(createdAt).fromNow()}</span>
    </div>
  );
}
