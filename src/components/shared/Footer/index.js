import "../../../static/styles/footer/styles.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="user">
          USUARIO <span>DOCTOR1</span>
        </p>
        <p className="current-date">
          FECHA ACTUAL:{" "}
          <span>
            {new Date().toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
              day: "numeric",
            })}
          </span>
        </p>
        <p className="login-time">
          HORA DE INGRESO{" "}
          <span>
            {new Date().toLocaleTimeString("es-ES", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      </div>
    </footer>
  );
}
