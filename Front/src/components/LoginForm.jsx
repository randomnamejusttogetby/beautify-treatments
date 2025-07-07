import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router";
import { myAxios } from "../utils/myAxios";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mode, setMode] = useState("login"); // login arba register
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (mode === "login") {
        // Prisijungimo užklausa
        const response = await myAxios.post('/users/login', data).then(res => res.data);
        if (response) {
          // Dažniausiai backend grąžina { status, data: { user } }
          setUser(response);
          setMessage("Successfully logged in!");
          navigate("/");
        } else {
          throw new Error("Invalid login response");
        }
      } else {
        // Registracijos užklausa

        const response = await myAxios.post('/users/signup', data).then(res => res.data);
        if (response) {
          // Automatiškai prisijungiame naują vartotoją
          const userData = response;
          setUser(userData);
          setMessage("User created and logged in successfully!");
          navigate("/");
        } else {
          throw new Error("Invalid signup response");
        }
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await myAxios.post('/users/logout');
      setUser(null);
      setMessage("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      setMessage("An error occurred during logout. Please try again.");
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setMessage("");
  };

  return (
    
    <div className="card max-w-md mx-auto mt-10">
      {user ? (
        <div className="text-center">
  <h2 className="title">Sveiki, {user.email}!</h2>
  <p className="text-muted">Jūs sėkmingai prisijungėte.</p>
  
  <p className="mt-2">Vaidmuo: <span className="font-semibold">{user.role}</span></p>
  
  <button
    onClick={logout}
    className="btn-secondary mt-4"
  >
    Atsijungti
  </button>
</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="label">Email:</label>
            <input
              type="email"
              {...register("email", { required: "Email yra privalomas" })}
              className="input"
              placeholder="vardas@email.com"
            />
            {errors.email && (
              <span className="text-error">{errors.email.message}</span>
            )}
          </div>

          {/* Username (tik registracijos režime) */}
          {mode === "register" && (
            <div className="form-group">
              <label htmlFor="username" className="label">Vartotojo vardas:</label>
              <input
                type="text"
                {...register("username", { required: "Vartotojo vardas yra privalomas" })}
                className="input"
                placeholder="Vartotojo vardas"
              />
              {errors.username && (
                <span className="text-error">{errors.username.message}</span>
              )}
            </div>
          )}

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="label">Slaptažodis:</label>
            <input
              type="password"
              {...register("password", { required: "Slaptažodis yra privalomas" })}
              className="input"
              placeholder="Slaptažodis"
            />
            {errors.password && (
              <span className="text-error">{errors.password.message}</span>
            )}
          </div>

          {/* Password Confirmation (tik registracijos režime) */}
          {mode === "register" && (
            <div className="form-group">
              <label htmlFor="passwordConfirm" className="label">Pakartokite slaptažodį:</label>
              <input
                type="password"
                {...register("passwordConfirm", {
                  required: "Slaptažodžio patvirtinimas yra privalomas",
                })}
                className="input"
                placeholder="Pakartokite slaptažodį"
              />
              {errors.passwordConfirm && (
                <span className="text-error">{errors.passwordConfirm.message}</span>
              )}
            </div>
          )}

          <button type="submit" className="btn-primary mt-4">
            {mode === "login" ? "Prisijungti" : "Registruotis"}
          </button>

          <div className="text-center text-sm mt-4">
            {mode === "login" ? (
              <p>
                Neturite paskyros?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  onClick={toggleMode}
                >
                  Registruotis
                </button>
              </p>
            ) : (
              <p>
                Jau turite paskyrą?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  onClick={toggleMode}
                >
                  Prisijungti
                </button>
              </p>
            )}
          </div>
        </form>
      )}

      {message && (
        <div className="alert-success mt-4 text-center text-sm">
          {message}
        </div>
      )}
    </div>
    
  );
};

export default LoginForm;