import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

export const AppointmentsContext = createContext();

export function useAppointmentsContext() {
  const values = useContext(AppointmentsContext);

  return values;
}

export function AppointmentsContextProvider({ children }) {
  const [appointments, setAppointments] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date());
  const [searching, setSearching] = useState(false);

  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(1);
  const [meridem, setMeridem] = useState("am");
  const [error, setError] = useState(null);

  async function getAllAppointments() {
    const { ipcRenderer } = window.require("electron");
    const rows = await ipcRenderer.invoke("appointments", "getAll", {
      search,
      date,
    });
    setAppointments(rows);
  }

  function changeTime(type, time) {
    if (type === "hour") {
      setHour(time);
    } else if (type === "minute") {
      setMinute(time);
    }
  }

  function changeMeridem(newMeridem) {
    if (newMeridem === 0) {
      setMeridem("am");
    } else if (newMeridem === 1) {
      setMeridem("pm");
    }
  }

  async function createAppointment() {
    setError(null);
    const { ipcRenderer } = window.require("electron");

    const res = await ipcRenderer.invoke("appointments", "create", {
      patient,
      hour,
      minute,
      meridem,
      date,
    });

    if (res === true) {
      toast("Cita Creada", { type: "info", position: "bottom-right" });
      return true;
    }

    setError(res.error);
    return false;
  }

  function changeDate(newDate) {
    setDate(newDate);
  }

  function changePatient(patient) {
    setPatient(patient);
  }

  function clearAppointmentsContext() {
    setAppointment(null);
    setAppointments(null);
    setPatient(null);
    setDate(new Date());
    setSearch(null);
    setSearching(false);
    setMinute(0);
    setHour(1);
    setMeridem("am");
    setError(null);
  }

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        getAllAppointments,
        date,
        changeDate,
        patient,
        changePatient,
        clearAppointmentsContext,
        appointment,
        searching,
        hour,
        minute,
        meridem,
        changeTime,
        changeMeridem,
        createAppointment,
        error,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}
