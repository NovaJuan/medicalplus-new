import { Container } from "./styles";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import AppointmentListItem from "../../../shared/AppointmentListItem";
import CalendarModal from "../../../shared/CalendarModal";

import { useAppointmentsModel } from "../../../../models/appointment";

export default function AppointmentsSection() {
  const {
    getAllAppointments,
    appointments,
    searching,
  } = useAppointmentsModel();

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>CITAS</h1>
        <div className="links">
          <Link to="/appointments/all">Todas las Citas</Link>
          <Link to="/appointments/add">Añadir Cita</Link>
        </div>
      </div>
      <section>
        {searching === false && <h2>Citas de Hoy</h2>}
        <div className="appointments-wrapper">
          {appointments &&
            appointments.map((appointment) => (
              <AppointmentListItem
                key={appointment.id}
                appointment={appointment}
                onDelete={getAllAppointments}
              />
            ))}
          {appointments && appointments.length === 0 && (
            <p>No hay citas el dia de hoy.</p>
          )}
        </div>
      </section>
    </Container>
  );
}
