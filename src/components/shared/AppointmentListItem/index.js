import { docidFormatter } from "../../../lib/patientHelpers";

import { useModal } from "../../../contexts/modal";
import AppointmentModal from "../AppointmentModal";

import { Container } from "./styles";

export default function AppointmentListItem({
  appointment,
  onDelete = () => {},
}) {
  const modal = useModal();

  function openModal() {
    modal(
      AppointmentModal,
      () => {
        // clearAppointment();
      },
      { onDelete, appointment }
    );
  }

  const appointmentTime = new Date(appointment.date)
    .toLocaleTimeString("es-ES", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(" p. m.", "<small>PM</small>")
    .replace(" a. m.", "<small>AM</small>");

  const appointmentDate = new Date(appointment.date).toLocaleDateString(
    "es-ES"
  );

  return (
    <Container
      onClick={openModal}
      className={`${appointment.status === 1 && "finished"}`}
    >
      <img
        src={`file://media/${
          appointment.patient.image || "static/no-image.jpg"
        }`}
        alt=""
      />
      <div className="patient">
        <h4 className="name">{appointment.patient.name}</h4>
        <p className="docid">{docidFormatter(appointment.patient.docid)}</p>
      </div>
      {appointment.status === 1 && (
        <div className="finished">
          <p className="date">{appointmentDate}</p>
          <p>Finalizada</p>
        </div>
      )}
      {appointment.status === 0 && (
        <div className="time">
          <p className="date">{appointmentDate}</p>
          <p dangerouslySetInnerHTML={{ __html: appointmentTime }} />
        </div>
      )}
    </Container>
  );
}
