import { useAuth } from "../authCrap/AuthProvider";
import { useEffect, useState } from "react";
import { getAlerts, deleteAlert } from "../services/api";

const AlertsPopUp = ({ onClose }) => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const alerts = await getAlerts(user.id);
      if (alerts) {
        setAlerts(alerts);
      }
    };
    fetchAlerts();
  }, []);

  const handleDelete = async (alertId) => {
    await deleteAlert(alertId);
    const newAlerts = alerts.filter((alert) => alert.id !== alertId);
    setAlerts(newAlerts);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="p-2 border-b border-gray-200 flex w-full justify-between"
          >
            {alert.message}
            <button
              onClick={() => handleDelete(alert.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPopUp;
