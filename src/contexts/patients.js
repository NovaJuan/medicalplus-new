import { createContext, useState, useContext } from "react";

export const PatientsContext = createContext();

export function usePatientsContext() {
  const values = useContext(PatientsContext);

  return values;
}

export function PatientsContextProvider({ children }) {
  const [patients, setPatients] = useState(null);
  const [patient, setPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  async function getAllPatients(latest = false) {
    const { ipcRenderer } = window.require("electron");
    let rows;
    if (latest === true) {
      rows = await ipcRenderer.invoke("patients", "getAll", null);
    } else {
      rows = await ipcRenderer.invoke("patients", "getAll", search || null);
    }
    setPatients(rows);
  }

  async function getPatient(id) {
    const { ipcRenderer } = window.require("electron");
    const row = await ipcRenderer.invoke("patients", "get", id);
    setPatient(row);
  }

  async function clearPatientsContext() {
    setSearching(false);
    setSearch("");
    setPatient(null);
    setPatients(null);
  }

  async function clearSearch() {
    setSearching(false);
    setSearch("");
    getAllPatients();
  }

  function clearPatient() {
    setPatient(null);
  }

  function changeSearch(e) {
    setSearch(e.target.value);
  }

  function changeSearching(isSearching) {
    setSearching(isSearching);
  }

  return (
    <PatientsContext.Provider
      value={{
        patients,
        patient,
        search,
        getAllPatients,
        getPatient,
        clearSearch,
        clearPatient,
        changeSearch,
        searching,
        changeSearching,
        clearPatientsContext,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
}
