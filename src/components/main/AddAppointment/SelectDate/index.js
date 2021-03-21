import { useAppointmentsModel } from "../../../../models/appointment";
import { useEffect } from "react";
import AppointmentListItem from "../../../shared/AppointmentListItem";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function SelectDate({
  finishAppointment,
  hour,
  minute,
  meridem,
  error,
  setNewAppointment,
}) {
  const {
    date,
    changeDate,
    appointments,
    getAllAppointments,
  } = useAppointmentsModel();

  useEffect(() => {
    getAllAppointments();
  }, [date]);

  const onChangeSelect = (e) => {
    if (e.target.name === "hour") {
      setNewAppointment((prev) => ({
        ...prev,
        hour: parseInt(e.target.value),
      }));
    } else if (e.target.name === "minute") {
      setNewAppointment((prev) => ({
        ...prev,
        minute: parseInt(e.target.value),
      }));
    }
  };

  const onChangeMeridem = (e) => {
    if (e.target.id === "am") {
      setNewAppointment((prev) => ({
        ...prev,
        meridem: "am",
      }));
    } else if (e.target.id === "pm") {
      setNewAppointment((prev) => ({
        ...prev,
        meridem: "pm",
      }));
    }
  };

  function onChangeDate(newDate) {
    changeDate(newDate);
    setNewAppointment((prev) => ({
      ...prev,
      date: newDate,
    }));
  }

  return (
    <div className="select-date">
      <h1>Selecciona Fecha y Hora</h1>
      <div className="box">
        {error && <p className="error">{error}</p>}

        <div className="wrapper">
          <div className="left">
            <Calendar onChange={onChangeDate} />
            <div className="select-hour">
              <h3>Seleccionar Hora</h3>
              <div className="hour">
                <div className="selects">
                  <select name="hour" value={hour} onChange={onChangeSelect}>
                    <option value="0">12</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                  </select>
                  :
                  <select
                    name="minute"
                    value={minute}
                    onChange={onChangeSelect}
                  >
                    <option value="0">00</option>
                    <option value="5">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                  </select>
                </div>
                <div>
                  <span>
                    <input
                      type="radio"
                      name="meridem"
                      value={0}
                      defaultChecked={meridem === "am"}
                      id="am"
                      onChange={onChangeMeridem}
                    />
                    <label htmlFor="am">AM</label>
                  </span>
                  <span>
                    <input
                      onChange={onChangeMeridem}
                      defaultChecked={meridem === "pm"}
                      type="radio"
                      name="meridem"
                      value={1}
                      defaultChecked={false}
                      id="pm"
                    />
                    <label htmlFor="pm">PM</label>
                  </span>
                </div>
              </div>
            </div>

            <button className="save" onClick={finishAppointment}>
              Crear Cita
            </button>
          </div>
          <div className="right">
            <h2>Citas Apartadas del Dia</h2>
            <div className="appointments-list">
              {appointments &&
                appointments.map((ap) => (
                  <AppointmentListItem
                    appointment={ap}
                    key={ap.id}
                    onDelete={getAllAppointments}
                  />
                ))}
              {appointments && appointments.length === 0 && (
                <p>No hay citas apartadas para este dia.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
