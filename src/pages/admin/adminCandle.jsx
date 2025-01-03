import { useEffect, useState } from "react";
import apiClient from "../../lib/apiService"; // Sử dụng apiClient
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddCandle from "../../components/candle/addCandel";
import UpdateCandle from "../../components/candle/updateCandle";

const AdminCandle = () => {
  const [candles, setCandles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCandle, setSelectedCandle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCandles();
  }, []);

  const fetchCandles = async () => {
    try {
      const response = await apiClient.get("/api/Candle");
      setCandles(response.data);
    } catch (err) {
      console.error("Error fetching candles:", err);
      setError("Failed to load candles. Please try again.");
    }
  };

  const deleteCandle = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this candle?");
    if (!confirmed) return;

    try {
      await apiClient.delete(`/api/Candle/delete-candle/${id}`);
      setCandles(candles.filter((candle) => candle.candleId !== id));
    } catch (err) {
      console.error("Error deleting candle:", err);
      alert("Failed to delete candle. Please try again.");
    }
  };

  const handleEditCandle = (candle) => {
    setSelectedCandle({
      ...candle,
      categoryId: candle.categoryId || "1", // Default value if categoryId is missing
    });
    setShowUpdateModal(true);
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Candle List</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" /> Add New Candle
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock Quantity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candles.map((candle) => (
            <tr key={candle.candleId}>
              <td className="border p-2">{candle.candleId}</td>
              <td className="border p-2">{candle.name}</td>
              <td className="border p-2">{candle.description}</td>
              <td className="border p-2">${candle.price}</td>
              <td className="border p-2">{candle.stockQuantity}</td>
              <td className="border p-2">
                <div className="flex justify-center space-x-4">
                  <FaEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => handleEditCandle(candle)}
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => deleteCandle(candle.candleId)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && <AddCandle onClose={() => setShowAddModal(false)} onAdd={fetchCandles} />}
      {showUpdateModal && (
        <UpdateCandle
          candle={selectedCandle}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={fetchCandles}
        />
      )}
    </div>
  );
};

export default AdminCandle;
