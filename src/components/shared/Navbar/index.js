import { Container } from "./styles";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Container>
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
                <Link to="/patients/all">Todos los Pacientes</Link>
              </span>
              <span>
                <Link to="/patients/add">Añadir Paciente</Link>
              </span>
            </div>
          </div>
          <div className="link">
            <span className="label">
              Citas <img src="file://media/static/arrow-down.svg" alt="" />
            </span>
            <div className="dropdown">
              <span>
                <Link to="/appointments/all">Todas las Citas</Link>
              </span>
              <span>
                <Link to="/appointments/add">Añadir Cita</Link>
              </span>
            </div>
          </div>
          <div className="link">
            <Link to="/settings" className="label">
              Configuración
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
