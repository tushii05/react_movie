import { NavLink, useNavigate } from "react-router-dom";
// import { isAuthenticated } from "../utils/auth";
import { useEffect, useState } from "react";

export const Header = () => {
  const [timeLeft, setTimeLeft] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    navigate("/login");
  };

  const getNavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "blue" : "black",
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (token && expiresAt) {
      const expiryTime = new Date(expiresAt).getTime();

      const interval = setInterval(() => {
        const now = Date.now();
        const remainingTime = expiryTime - now;

        if (remainingTime <= 0) {
          handleLogout();
          clearInterval(interval);
        } else {
          setTimeLeft(formatTimeLeft(remainingTime));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const formatTimeLeft = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    let formattedTime = "";
    if (days > 0) formattedTime += `${days}d `;
    if (hours > 0) formattedTime += `${hours}h `;
    if (minutes > 0) formattedTime += `${minutes}m `;
    if (seconds > 0) formattedTime += `${seconds}s`;
    return formattedTime.trim();
  };

  return (
    <>
      <header className="section-navbar">
        <section className="top_txt">
          {/* <div className="head container">
            <div className="head_txt">
            </div>
            <div className="sing_in_up">
              <NavLink to="# ">SIGN IN</NavLink>
              <NavLink to="# ">SIGN UP</NavLink>
            </div>
            <div className="sing_in_up">
              {isAuthenticated() ? (
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              ) : (
                <>
                  <NavLink to="/login">SIGN IN</NavLink>
                  <NavLink to="/signup">SIGN UP</NavLink>
                </>
              )}
            </div>
          </div> */}
        </section>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="navbar-brand">
            <NavLink to="/index">
              <p>Tushii</p>
            </NavLink>
          </div>

          <nav className="navbar">
            <ul>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "blue" : "black",
                    };
                  }}
                >
                  about
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/movie"
                  className="nav-link"
                  style={getNavLinkStyle}
                >
                  movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  contact
                </NavLink>
              </li>
              {/* {isAuthenticated() && (
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              )} */}

              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                  {timeLeft && <span className="session-timer">Session expires in {timeLeft}</span>}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
