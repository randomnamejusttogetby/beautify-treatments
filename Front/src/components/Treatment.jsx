import { useState, useEffect } from "react";
import { getReservation, reserveTreatment } from "../services/treatmentReservationService.js";

export function Treatment({ treatment, onEdit, onDelete, userRole, onReserve }) {
  const [reservationStatus, setReservationStatus] = useState(null);
  const [isReserving, setIsReserving] = useState(false);
  const [isTreatmentReserved, setIsTreatmentReserved] = useState(false);
  const [isReservedByUser, setIsReservedByUser] = useState(false);

  // Check if treatment is reserved (by anyone) and if current user has reserved it
  const checkReservationStatus = async () => {
    if (userRole && userRole !== 'admin') {
      try {
        const isReserved = await getReservation(treatment.id);
        setIsReservedByUser(isReserved  || false);
      } catch (error) {
        setIsTreatmentReserved(false);
        setIsReservedByUser(false);
      } 
    }
  };

  useEffect(() => {
    checkReservationStatus();
  }, [treatment.id, userRole]);

  // TODO
  const handleDownload = () => {
    console.log(treatment)
    /*
    if (treatment.treatment_file) {
      window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:3030'}${treatment.treatment_file}`, '_blank');
    }
    */
  };

  const handleReserve = async () => {
    setIsReserving(true);
    try {
      await reserveTreatment(treatment.id);
      setReservationStatus('reserved');
      setIsTreatmentReserved(true);
      setIsReservedByUser(true);       
      if (onReserve) {
        onReserve(); // Refresh data if callback provided
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Cover Image */}
        <div className="flex-shrink-0">
          {treatment.cover_image ? (
            <img
              src={treatment.link_to_cover_image.startsWith('http') ? treatment.link_to_cover_image : ''}
              alt={treatment.title}
              className="w-32 h-40 object-cover rounded-md"
            />
          ) : (
            <div className="w-32 h-40 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Treatment Details */}
        <div className="flex-grow">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-800">{treatment.title}</h3>
            <p className="text-lg text-gray-600">by {treatment.author}</p>
          </div>

          <div className="mb-3 space-y-1">
            {treatment.genre && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Genre:</span> {treatment.genre}
              </p>
            )}
            {treatment.published_year && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Published:</span> {treatment.published_year}
              </p>
            )}

            {treatment.price && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Price:</span> €{treatment.price}
              </p>
            )}
          </div>

          {treatment.description && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
              {treatment.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {treatment.cover_file && (
              <button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Download
              </button>
            )}

            {userRole && userRole !== 'admin' && (
              <>
                {isTreatmentReserved ? (
                  <span className="bg-gray-500 text-white px-3 py-1 rounded text-sm inline-flex items-center">
                    {isReservedByUser ? '✓ Reserved by You' : ''}
                  </span>
                ) : (
                  <button
                    onClick={handleReserve}
                    disabled={isReserving}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                  >
                    {isReserving ? 'Reserving...' : 'Reserve'}
                  </button>
                )}
              </>
            )}

            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => onEdit(treatment)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(treatment.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          {reservationStatus === 'reserved' && (
            <div className="mt-2 p-2 bg-green-100 text-green-800 rounded text-sm">
              Treatment reserved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}