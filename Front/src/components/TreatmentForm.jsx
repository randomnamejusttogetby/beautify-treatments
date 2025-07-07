import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export function TreatmentForm({ treatment, onSubmit }) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    // Fetch categories when component mounts
  }, []);

  useEffect(() => {
    if (treatment) {
      setValue("title", treatment.title);
      setValue("category", treatment.category);
      setValue("start_time", treatment.start_time);
      setValue("link_to_cover_image", treatment.link_to_cover_image || "");
    }
  }, [treatment, setValue]);

  const formSubmitHandler = async (data) => {
    try {
      await onSubmit(data);

      if (!treatment) {
        reset();
        setError("");
      }
    } catch (error) {
      setError(error.message || "Failed to save treatment");
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
      <h2 className="title">{treatment ? "Edit treatment" : "Add New treatment"}</h2>
      {error && <p className="text-error font-bold">{error}</p>}

      <div className="form-group">
        <label htmlFor="title" className="label">Title</label>
        <input
          className="input"
          type="text"
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-error">{errors.title.message}</p>}
      </div>

      {/* TODO */}
      {/* 
      <div className="form-group">
        <label htmlFor="Category" className="label">Category</label>
        <select
          className="input"
          id="category"
          {...register("category", { required: "Please select category" })}
        >
          <option value="">Select a category...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-error">{errors.category.message}</p>}
      </div> */}

      <div className="form-group">
        <label htmlFor="start_time" className="label">Start Time</label>
        <input
          className="input"
          type="time"
          id="start_time"
          // placeholder="https://example.com/image.jpg"
          {...register("start_time")}
        />
        {errors.start_time && <p className="text-error">{errors.start_time.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="link_to_cover_image" className="label">Cover Image URL</label>
        <input
          className="input"
          type="url"
          id="link_to_cover_image"
          placeholder="https://example.com/image.jpg"
          {...register("link_to_cover_image")}
        />
        <div className="mt-2 text-sm text-gray-600">
          <p>Paste a direct link to an image</p>
        </div>
      </div>

      <button className="btn-primary" type="submit">
        {treatment ? "Update treatment" : "Add treatment"}
      </button>
    </form>
  );
}