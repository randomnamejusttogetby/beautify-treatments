import { useState, useEffect } from "react";
import { getMyReservations, cancelReservation } from "../services/treatmentReservationService.js";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await getMyReservations();
      console.log(response)
      if (response)
        setReservations(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      await cancelReservation(reservationId);
      // Refresh reservations
      await fetchReservations();
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "reserved":
        return "bg-green-100 text-green-800";
      case "returned":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading reservations...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Treatment Reservations</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {reservation.cover_image ? (
                    <img
                      src={reservation.cover_image.startsWith('http') 
                        ? reservation.cover_image 
                        : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${reservation.cover_image}`}
                      alt={reservation.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No Cover</span>
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-1">{reservation.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {reservation.author}</p>
                  
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Reserved:</strong> {formatDate(reservation.reserved_at)}</p>
                    {reservation.returned_at && (
                      <p><strong>Returned:</strong> {formatDate(reservation.returned_at)}</p>
                    )}
                    {reservation.genre && (
                      <p><strong>Genre:</strong> {reservation.genre}</p>
                    )}
                  </div>



                  {reservation.status === 'reserved' && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleCancel(reservation.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default MyReservations;
