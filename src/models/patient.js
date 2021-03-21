import { useState } from "react";
import backend from "../lib/backend";

import { useLoading } from "../contexts/loading";

export const usePatientsModel = () => {
  const [patients, setPatients] = useState(null);
  const [patient, setPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [searching, setSearching] = useState(false);

  const loading = useLoading();

  async function getAllPatients(defaults = false) {
    loading(true);
    const options = {
      search: defaults === true ? "" : search,
      page: defaults === true ? 1 : page,
    };

    const result = await backend("patients", "getAll", options);

    setPatients(result.patients);
    setNextPage(result.nextPage);
    setPrevPage(result.prevPage);
    loading(false);
  }

  async function goNextPage() {
    if (nextPage !== null) {
      loading(true);
      const options = {
        search,
        page: nextPage,
      };
      const result = await backend("patients", "getAll", options);
      setPatients(result.patients);
      setPage(nextPage);
      setNextPage(result.nextPage);
      setPrevPage(result.prevPage);
      loading(false);
    }
  }

  async function goPrevPage() {
    if (prevPage !== null) {
      loading(true);
      const options = {
        search,
        page: prevPage,
      };
      const result = await backend("patients", "getAll", options);
      setPatients(result.patients);
      setPage(prevPage);
      setNextPage(result.nextPage);
      setPrevPage(result.prevPage);
      loading(false);
    }
  }

  async function getPatient(id) {
    loading(true);
    const row = await backend("patients", "get", id);
    setPatient(row);
    loading(false);
  }

  async function createPatient(patient) {
    loading(true);
    const res = await backend("patients", "create", patient);
    loading(false);

    if (res.error) {
      return res.error;
    }

    return true;
  }

  async function updatePatient(patient) {
    loading(true);
    const res = await backend("patients", "update", patient);
    loading(false);

    if (res.error) {
      return res.error;
    }

    return res;
  }

  async function deletePatient(id) {
    loading(true);
    const res = await backend("patients", "delete", id);
    loading(false);

    if (res !== true) {
      return res;
    }

    return true;
  }

  async function restartContext() {
    setSearching(false);
    setSearch("");
    setPatient(null);
    setPatients(null);
  }

  async function clearSearch() {
    setSearching(false);
    setSearch("");
    setPage(1);
    setNextPage(null);
    setPrevPage(null);
    getAllPatients(true);
  }

  function clearPatient() {
    setPatient(null);
  }

  function changeSearch(e) {
    if (typeof e === "string") {
      setSearch(e);
    } else {
      setSearch(e.target.value);
    }
  }

  function changeSearching(isSearching) {
    setSearching(isSearching);
  }

  return {
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
    restartContext,
    page,
    nextPage,
    goNextPage,
    prevPage,
    goPrevPage,
    createPatient,
    updatePatient,
    deletePatient,
  };
};
