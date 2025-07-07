import { Treatments } from "./components/Treatments";
import LoginForm from "./components/LoginForm";
import MyReservations from "./components/MyReservations";
import UserManagement from "./components/UserManagement";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFoundPage";

function App() {

  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Treatments />} />
        <Route path="/treatments" element={<Treatments/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer className="text-center m-4 text-muted">
        © 2025 Beautify
      </footer>
    </div>
  );
}

export default App;
