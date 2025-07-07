import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { UserLogout } from "../services/logout";

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // Debug: parodyk user info konsolėje
  console.log("Prisijungęs vartotojas:", user);

  const handleLogout = async () => {
    try {
      await UserLogout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="nav">
      <NavLink to="/" className="nav-link">
        Beautify Treatments
      </NavLink>
      
      {user ? (
        <>
          <NavLink to="/" className="nav-link">
            All Treatments
          </NavLink>

          {user.role !== 'admin' && (
            <NavLink to="/my-reservations" className="nav-link">
              My Reservations
            </NavLink>
          )}

          {user.role === 'admin' && (
            <>
            <NavLink to="/user-management" className="nav-link">
                Manage Users
              </NavLink>
            </>
          )}

          <button onClick={handleLogout} className="nav-link">
            Logout ({user.email})
          </button>
        </>
      ) : (
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default NavBar;