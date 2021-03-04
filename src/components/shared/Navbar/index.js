import "../../../static/styles/navbar/styles.css";
import logo from "../../../static/img/logo.png";
import gear from "../../../static/img/gear.png";
import plusWhite from "../../../static/img/plus-white.png";
import Link from "react-router-dom/Link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="" />
        </Link>

        <div className="current-date">
          <span>Fecha actual</span>
          <p>
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="nav-links">
          <Link to="/add-patient" className="add-patient-link">
            Añadir Paciente <img src="" alt="" />
            <img src={plusWhite} alt="" />
          </Link>
          <a href="#" className="settings-link">
            <img src={gear} alt="" />
          </a>
        </div>
      </div>
    </nav>
  );
}
