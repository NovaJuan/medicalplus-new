import { useState } from "react";
import backend from "../lib/backend";

import { useLoading } from "../contexts/loading";

export const useAppointmentsModel = () => {
  const [appointments, setAppointments] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(null);
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [getFinishedAppointments, setGetFinishedAppointments] = useState(false);

  const loading = useLoading();

  async function getAllAppointments(getDefaults = false) {
    loading(true);
    const options = {
      search: getDefaults === true ? null : search,
      date: getDefaults === true ? null : date,
      page: getDefaults === true ? 1 : page,
      getFinishedAppointments:
        getDefaults === true ? false : getFinishedAppointments,
    };

    const result = await backend("appointments", "getAll", options);

    setAppointments(result.appointments);
    setNextPage(result.nextPage);
    setPrevPage(result.prevPage);
    loading(false);
  }

  async function getAppointment(id) {
    loading(true);
    const row = await backend("appointments", "get", id);
    setAppointment(row);
    loading(false);
  }

  function clearAppointment() {
    setAppointment(null);
  }

  async function createAppointment(newAppointment) {
    loading(true);

    const res = await backend("appointments", "create", newAppointment);

    loading(false);
    if (res === true) {
      //   toast("Cita Creada", { type: "info", position: "bottom-right" });
      return true;
    }

    return res.error;
  }

  async function changeStatus(id, status) {
    await backend("appointments", "status", {
      id,
      status,
    });

    return true;
  }

  function changeDate(newDate) {
    setDate(newDate);
  }

  function changeSearching(isSearching) {
    setSearching(isSearching);
  }

  function changeSearch(e) {
    if (typeof e === "string") {
      setSearch(e);
    } else {
      setSearch(e.target.value);
    }
  }

  function clearSearch() {
    setSearch("");
    setSearching(false);
    setDate(null);
    setGetFinishedAppointments(false);
    setNextPage(null);
    setPrevPage(null);
    setPage(1);
    getAllAppointments(true);
  }

  function restartContext() {
    setAppointment(null);
    setAppointments(null);
    setSearch("");
    setSearching(false);
    setDate(null);
    setGetFinishedAppointments(false);
    setNextPage(null);
    setPrevPage(null);
    setPage(1);
  }

  async function goNextPage() {
    if (nextPage !== null) {
      loading(true);
      const options = {
        search: search,
        date: date,
        page: nextPage,
        getFinishedAppointments: getFinishedAppointments,
      };

      const result = await backend("appointments", "getAll", options);

      setPage(nextPage);
      setNextPage(result.nextPage);
      setPrevPage(result.prevPage);
      setAppointments(result.appointments);
      loading(false);
    }
  }

  async function goPrevPage() {
    if (prevPage !== null) {
      loading(true);
      const options = {
        search: search,
        date: date,
        page: prevPage,
        getFinishedAppointments: getFinishedAppointments,
      };

      const result = await backend("appointments", "getAll", options);

      setPage(prevPage);
      setNextPage(result.nextPage);
      setPrevPage(result.prevPage);
      setAppointments(result.appointments);
      loading(false);
    }
  }

  function changeGetFinished() {
    setGetFinishedAppointments(!getFinishedAppointments);
    getAllAppointments();
  }

  return {
    appointments,
    appointment,
    search,
    date,
    searching,
    page,
    nextPage,
    prevPage,
    getFinishedAppointments,
    getAllAppointments,
    getAppointment,
    clearSearch,
    clearAppointment,
    createAppointment,
    changeStatus,
    changeDate,
    changeSearch,
    changeSearching,
    restartContext,
    goNextPage,
    goPrevPage,
    changeGetFinished,
  };
};
