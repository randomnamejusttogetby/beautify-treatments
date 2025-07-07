import { useState, useEffect, useContext } from "react";
import { Treatment } from "./Treatment";
import { TreatmentForm } from "./TreatmentForm";
import { UserContext } from "../../contexts/userContext";
import { createTreatment, deleteTreatment, readTreatments, searchTreatment, updateTreatment } from "../services/treatmentService";

export function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);

  // Fetch treatments
  const fetchTreatments = async () => {
    try {
      if (!user) return;
      setLoading(true);
      const data = await readTreatments();
      setTreatments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Search treatments with optional genre filter
  const searchTreatments = async (query = "") => {
    try {
      setLoading(true);
      const data = await searchTreatment(query.trim());
      setTreatments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (treatmentData) => {
    let data;
    if (editingTreatment) {
      data = await updateTreatment(editingTreatment.id, treatmentData)
    } else {
      treatmentData.category='default'
      data = await createTreatment(treatmentData)
    }

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || 'Failed to save treatment');
    // }

    // Refresh treatments list
    await fetchTreatments();
    setShowForm(false);
    setEditingTreatment(null);
  };

  // Handle edit
  const handleEdit = (treatment) => {
    setEditingTreatment(treatment);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (treatmentId) => {
    if (!confirm('Are you sure you want to delete this treatment?')) {
      return;
    }

    try {
      const data = await deleteTreatment(treatmentId);
      await fetchTreatments();
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    searchTreatments(searchTerm);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    fetchTreatments();
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading treatments...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Treatments</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => {
              setEditingTreatment(null);
              setShowForm(!showForm);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showForm ? 'Cancel' : 'Add treatment'}
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search treatments by title..."
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* treatment Form */}
      {showForm && (
        <div className="mb-8">
          <TreatmentForm
            treatment={editingTreatment}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {/* Treatments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treatments && treatments.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No treatments found
          </div>
        ) : ( treatments &&
          treatments.map((treatment) => (
            <Treatment
              key={treatment.id}
              treatment={treatment}
              onEdit={handleEdit}
              onDelete={handleDelete}
              userRole={user?.role}
            />
          ))
        )}
      </div>
    </div>
  );
}