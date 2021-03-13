import "./styles/styles.css";
import { docidFormatter } from "../../../lib/patientHelpers";

import { useModal } from "../../../contexts/modal";
import { useAppointmentsContext } from "../../../contexts/appointments";
import AppointmentModal from "../AppointmentModal";

export default function AppointmentListItem({ appointment }) {
  const modal = useModal();
  const { getAppointment, clearFetchedAppointment } = useAppointmentsContext();

  function openModal() {
    getAppointment(appointment.id);
    modal(AppointmentModal, () => {
      clearFetchedAppointment();
    });
  }

  const appointmentTime = new Date(appointment.date)
    .toLocaleTimeString("es-ES", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(" p. m.", "<small>PM</small>")
    .replace(" a. m.", "<small>AM</small>");

  return (
    <div className="appointment-list-item" onClick={openModal}>
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
      <div className="time">
        <p dangerouslySetInnerHTML={{ __html: appointmentTime }} />
      </div>
    </div>
  );
}
