import "../../../static/styles/home/styles.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import PatientListItem from "../../shared/PatientListItem";
import AppointmentListItem from "../../shared/AppointmentListItem";

import { usePatientsContext } from "../../../contexts/patients";
import { useAppointmentsContext } from "../../../contexts/appointments";

export default function Home({ history }) {
  const {
    getAllPatients,
    patients,
    search,
    changeSearch,
    searching,
    changeSearching,
    clearSearch,
  } = usePatientsContext();
  const { getAllAppointments, appointments } = useAppointmentsContext();

  useEffect(() => {
    getAllAppointments();
    getAllPatients(true);
  }, []);

  function onSubmitPatients(e) {
    e.preventDefault();

    changeSearching(true);
    getAllPatients();
  }

  return (
    <MainLayout>
      <div className="home-dashboard">
        <div className="patients">
          <div className="header">
            <h1>PACIENTES</h1>
            <Link to="/patients/add">Añadir Paciente</Link>
          </div>
          <div className="search">
            <form className="search-bar" onSubmit={onSubmitPatients}>
              <input
                type="text"
                placeholder="Buscar Paciente"
                id="search-input"
                value={search}
                onChange={changeSearch}
              />
              {searching === false && (
                <button type="submit">
                  <img src="file://media/static/search.png" alt="" />
                </button>
              )}
              {searching && (
                <button type="button" onClick={clearSearch}>
                  <img src="file://media/static/cancel.png" alt="" />
                </button>
              )}
            </form>
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
                <p className="not-found">No hay pacientes encontrados.</p>
              )}
            </div>
          </section>
        </div>
        <div className="appointments">
          <div className="header">
            <h1>CITAS</h1>
            <Link to="/appointments/add">Añadir Cita</Link>
          </div>
          <div className="search">
            <form className="search-bar">
              <input
                type="text"
                placeholder="Buscar cita de paciente"
                id="search-input"
              />
              <button type="submit">
                <img src="file://media/static/search.png" alt="" />
              </button>
            </form>
            <div className="use-calendar">Buscar por Fecha</div>
          </div>
          <section>
            <h2>Citas de Hoy</h2>
            <div className="appointments-wrapper">
              {appointments &&
                appointments.map((appointment) => (
                  <AppointmentListItem
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              {appointments && appointments.length === 0 && (
                <p>No hay citas encontradas</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
