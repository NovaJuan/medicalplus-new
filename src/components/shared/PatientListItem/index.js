import "./styles/styles.css";
import { docidFormatter } from "../../../lib/patientHelpers";

export default function PatientListItem({ patient, onClick }) {
  return (
    <div className="patient-list-item" onClick={onClick}>
      <img
        src={`file://media/${patient.image || "static/no-image.jpg"}`}
        alt=""
      />
      <div className="info">
        <h4 className="name">
          {patient.name.length <= 15
            ? patient.name
            : `${patient.name.substring(0, 14)}...`}
        </h4>
        <p className="docid">{docidFormatter(patient.docid)}</p>
      </div>
      <div className="last-visit">
        Ultima Visita
        <span>{new Date(patient.last_update).toLocaleDateString("es-ES")}</span>
      </div>
    </div>
  );
}
