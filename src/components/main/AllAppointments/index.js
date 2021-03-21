import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "./styles";
import MainLayout from "../../layouts/MainLayout";
import CalendarModal from "../../shared/CalendarModal";
import AppointmentListItem from "../../shared/AppointmentListItem";

import { useAppointmentsModel } from "../../../models/appointment";

import { useModal } from "../../../contexts/modal";

export default function AllAppointments() {
  const {
    getAllAppointments,
    appointments,
    changeSearch,
    search,
    searching,
    changeSearching,
    clearSearch,
    date,
    goNextPage,
    nextPage,
    goPrevPage,
    prevPage,
    page,
    changeDate,
    getFinishedAppointments,
    changeGetFinished,
  } = useAppointmentsModel();
  const modal = useModal();

  useEffect(() => {
    getAllAppointments();
  }, [date, getFinishedAppointments]);

  function onSubmit(e) {
    e.preventDefault();
    changeSearching(true);
    getAllAppointments();
  }

  function openCalendar() {
    modal(CalendarModal, () => {}, {
      changeDate,
      getAllAppointments,
      changeSearching,
      date,
    });
  }
  return (
    <MainLayout>
      <Container>
        <div className="header">
          <h1>TODAS LAS CITAS</h1>
          <Link to="/appointments/add">Añadir Cita</Link>
        </div>
        <div className="search">
          <form className="search-bar" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Buscar cita de paciente"
              id="search-input"
              onChange={changeSearch}
              value={search}
            />
            <button type="submit">
              <img src="file://media/static/search.png" alt="" />
            </button>
          </form>
          <div className="use-calendar" onClick={openCalendar}>
            {date ? date.toLocaleDateString("es-ES") : "Buscar por Fecha"}
          </div>
          {searching && (
            <button className="clean-search" onClick={clearSearch}>
              Limpiar Busqueda
            </button>
          )}
          <div className="get-finished">
            <input
              type="checkbox"
              id="get-finished"
              checked={getFinishedAppointments}
              onChange={changeGetFinished}
            />
            <label htmlFor="get-finished">Ver citas finalizadas</label>
          </div>
        </div>
        <section>
          {searching === false && <h2>Citas de Hoy</h2>}
          <div className="appointments-wrapper">
            <div className="appointments-grid">
              {appointments &&
                appointments.map((appointment) => (
                  <AppointmentListItem
                    key={appointment.id}
                    appointment={appointment}
                    onDelete={getAllAppointments}
                  />
                ))}
              {appointments && appointments.length === 0 && (
                <p>No hay citas encontradas</p>
              )}
            </div>
          </div>
          {appointments && appointments.length > 0 && (
            <div className="pagination">
              <button
                className="change-page-btn prev"
                style={{ visibility: prevPage ? "visible" : "hidden" }}
                disabled={prevPage === null}
                onClick={goPrevPage}
              >
                &lt; Anterior
              </button>
              <div className="page">
                Pagina <span className="page">{page}</span>
              </div>
              <button
                className="change-page-btn next"
                style={{ visibility: nextPage ? "visible" : "hidden" }}
                disabled={nextPage === null}
                onClick={goNextPage}
              >
                Siguiente &gt;
              </button>
            </div>
          )}
        </section>
      </Container>
    </MainLayout>
  );
}
