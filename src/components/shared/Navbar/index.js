import "../../../static/styles/navbar/styles.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="file://media/static/logo.png" alt="" />
        </Link>

        <div className="nav-links">
          <div className="link">
            <Link to="/" className="label">
              Inicio
            </Link>
          </div>
          <div className="link">
            <span className="label">
              Pacientes <img src="file://media/static/arrow-down.svg" alt="" />
            </span>
            <div className="dropdown">
              <span>
                <Link to="/">Ver Pacientes</Link>
              </span>
              <span>
                <Link to="/patients/add">Añadir Paciente</Link>
              </span>
            </div>
          </div>
          <div className="link">
            <span className="label">Citas</span>
          </div>
          <div className="link">
            <Link to="/settings" className="label">
              Configuración
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
