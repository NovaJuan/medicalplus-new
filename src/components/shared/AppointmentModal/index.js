import { Container, Loading } from "./styles";
import { useAppointmentsModel } from "../../../models/appointment";
import { useCloseModal } from "../../../contexts/modal";
import { docidFormatter } from "../../../lib/patientHelpers";
import { useHistory } from "react-router";

export default function AppointmentModal({ onDelete = () => {}, appointment }) {
  const { changeStatus } = useAppointmentsModel();
  const patient = appointment && appointment.patient;
  const closeModal = useCloseModal();
  const history = useHistory();

  async function startAppointment() {
    changeStatus(appointment && appointment.id, "finished");
    history.push(`/patients/${patient && patient.id}`);
    closeModal();
  }

  async function cancelAppointment() {
    const { ipcRenderer } = window.require("electron");
    const res = await ipcRenderer.invoke(
      "appointments",
      "delete",
      appointment && appointment.id
    );

    if (res === true) {
      onDelete();
      closeModal();
    }
  }

  if (appointment === null) {
    return (
      <Loading>
        <h3>Cargando...</h3>
      </Loading>
    );
  }

  return (
    <Container>
      <h1>Detalles de cita</h1>
      <h2>Paciente</h2>
      <div className="patient">
        <div className="info">
          <p>
            <span>Nombre</span>
            {patient.name}
          </p>
          <p>
            <span>Documento de identidad</span>
            {docidFormatter(patient.docid)}
          </p>
          <p>
            <span>Fecha de Nacimiento</span>
            {patient.borndate}
          </p>
        </div>
        <div className="image">
          <img
            src={`file://media/${patient.image || "static/no-image"}`}
            alt=""
          />
        </div>
      </div>
      <h2>Informacion de la cita</h2>
      <div className="appointment-info">
        <p className="date">
          <span>Fecha de la cita</span>
          {new Date(appointment.date).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="time">
          <span>Hora de la cita</span>
          {new Date(appointment.date).toLocaleTimeString("es-ES", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="options">
        <button className="start" onClick={startAppointment}>
          Comenzar Consulta
        </button>
        <button className="cancel" onClick={cancelAppointment}>
          Cancelar Cita
        </button>
      </div>
    </Container>
  );
}
