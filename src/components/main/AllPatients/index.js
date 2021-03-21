import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "./styles";
import MainLayout from "../../layouts/MainLayout";
import PatientListItem from "../../shared/PatientListItem";

import { usePatientsModel } from "../../../models/patient";

export default function AllPatients() {
  const {
    getAllPatients,
    patients,
    changeSearch,
    changeSearching,
    search,
    searching,
    clearSearch,
    page,
    nextPage,
    prevPage,
    goNextPage,
    goPrevPage,
  } = usePatientsModel();

  const history = useHistory();

  useEffect(() => {
    getAllPatients();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    changeSearching(true);
    getAllPatients();
  }
  return (
    <MainLayout>
      <Container>
        <div className="header">
          <h1>TODOS LOS PACIENTES</h1>
          <Link to="/patients/add">Añadir Paciente</Link>
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
          {searching && (
            <button className="clean-search" onClick={clearSearch}>
              Limpiar Busqueda
            </button>
          )}
        </div>
        <section>
          <div className="patients-wrapper">
            <div className="patients-grid">
              {patients &&
                patients.map((patient) => (
                  <PatientListItem
                    key={patient.id}
                    patient={patient}
                    onClick={() => history.push(`/patients/${patient.id}`)}
                  />
                ))}
              {searching && patients && patients.length === 0 && (
                <p>No hay pacientes encontrados.</p>
              )}
            </div>
          </div>
          {patients && patients.length > 0 && (
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
