import { usePatientsModel } from "../../../../models/patient";

import PatientListItem from "../../../shared/PatientListItem";

export default function SelectPatient({ onSelectPatient }) {
  const {
    patients,
    changeSearch,
    search,
    searching,
    getAllPatients,
    changeSearching,
  } = usePatientsModel();

  function onSubmit(e) {
    e.preventDefault();
    changeSearching(true);

    getAllPatients();
  }

  function selectPatient(patient) {
    onSelectPatient(patient);
  }

  return (
    <div className="select-patient">
      <h1>Selecciona un paciente</h1>
      <div className="box">
        <form className="search-bar" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Buscar Paciente"
            id="search-input"
            value={search}
            onChange={changeSearch}
          />
          <button type="submit">
            <img src="file://media/static/search.png" alt="" />
          </button>
        </form>
        <div className="patients-list">
          {searching &&
            patients &&
            patients.map((p) => (
              <PatientListItem
                patient={p}
                onClick={() => selectPatient(p)}
                key={p.id}
              />
            ))}
          {searching && patients && patients.length === 0 && (
            <p>No hay pacientes encontrados</p>
          )}
        </div>
      </div>
    </div>
  );
}
