import "./styles/styles.css";
import { docidFormatter } from "../../../lib/patientHelpers";

export default function AppointmentListItem({ appointment }) {
  const appointmentTime = new Date(appointment.date)
    .toLocaleTimeString("es-ES", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(" p. m.", "<small>PM</small>")
    .replace(" a. m.", "<small>AM</small>");

  return (
    <div className="appointment-list-item">
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
