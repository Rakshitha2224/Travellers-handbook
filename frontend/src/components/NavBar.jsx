import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/useAuth";
import GoogleLoginButton from "./GoogleLoginButton";

export default function NavBar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
<div className="navbar-logo">
  <img
    src="/logo/logo.png"
    alt="Traveller's Handbook logo"
    className="navbar-logo-img"
  />
</div>


      {/* Center: Links */}
      <div className="navbar-links">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/arts" className="nav-link">Art & Crafts</NavLink>
        <NavLink to="/festivals" className="nav-link">Festivals</NavLink>
        <NavLink to="/holidays" className="nav-link">Holidays & Itinerary</NavLink>
        <NavLink to="/saved" className="nav-link">Saved Places</NavLink>
      </div>

      {/* Right: Auth */}
      <div className="navbar-auth">
        {!user ? (
          <GoogleLoginButton />
        ) : (
          <>
            <img
              src={user.photoURL}
              alt="profile"
              referrerPolicy="no-referrer"
              className="navbar-avatar"
            />
            <span className="navbar-name">{user.displayName}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
