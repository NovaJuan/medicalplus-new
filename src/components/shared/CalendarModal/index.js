import { Container } from "./styles";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";

import { useCloseModal } from "../../../contexts/modal";

export default function CalendarModal({
  changeDate,
  getAllAppointments,
  changeSearching,
  date,
}) {
  const [selectedDate, setDate] = useState(null);

  const closeModal = useCloseModal();

  useEffect(() => {
    if (date && selectedDate) {
      getAllAppointments();
    }
  }, [date]);

  function onChange(date) {
    setDate(date);
  }

  function search() {
    changeSearching(true);
    changeDate(selectedDate);
    closeModal();
  }

  return (
    <Container>
      <h1>Buscar por Fecha</h1>
      <Calendar onChange={onChange} />
      <div className="options">
        <button className="search" onClick={search}>
          Buscar
        </button>
        <button className="cancel" onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </Container>
  );
}
