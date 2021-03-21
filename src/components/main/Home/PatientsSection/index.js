import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import PatientListItem from "../../../shared/PatientListItem";

import { usePatientsModel } from "../../../../models/patient";

import { Container } from "./styles";

export default function PatientsSection() {
  const history = useHistory();

  const { getAllPatients, patients, searching } = usePatientsModel();

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>PACIENTES</h1>
        <div className="links">
          <Link to="/patients/all">Todos los Pacientes</Link>
          <Link to="/patients/add">Añadir Paciente</Link>
        </div>
      </div>
      <section>
        {searching === false && <h2>Ultimos Pacientes Atendidos</h2>}
        <div className="patients-wrapper">
          {patients &&
            patients.map((patient) => (
              <PatientListItem
                patient={patient}
                key={patient.id}
                onClick={() => history.push(`/patients/${patient.id}`)}
              />
            ))}

          {patients && patients.length === 0 && (
            <p className="not-found">No hay pacientes atendidos ultimamente.</p>
          )}
        </div>
      </section>
    </Container>
  );
}
