import "../../../static/styles/home/styles.css";

import plusGreen from "../../../static/img/plus-green.png";
import search from "../../../static/img/search.png";
import MainLayout from "../../layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="home-dashboard">
        <div className="patients">
          <div className="heading">
            <h2 className="title">Pacientes</h2>
            <form className="search">
              <input type="text" placeholder="Buscar paciente" />
              <button type="submit">
                <img src={search} alt="" />
              </button>
            </form>
          </div>
          <div className="list patient-list">
            <p className="head">
              <span>Documento</span>
              <span>Nombre</span>
              <span>Ultima consulta</span>
            </p>
            <ul className="items">
              <li className="row">
                <span>v-12.345.678</span>
                <span>John Doe</span>
                <span>01/01/2021 09:00 AM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="schedules">
          <div className="heading">
            <h2 className="title">
              Consultas Programadas para hoy <img src={plusGreen} alt="" />
            </h2>
          </div>
          <div className="list schedule-list">
            <p className="head">
              <span>Paciente</span>
              <span>Hora</span>
            </p>
            <ul className="items">
              <li className="row">
                <span>v-12.345.678 | John Doe</span>
                <span>09:00 AM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="generals">
          <div className="heading">
            <h2 className="title">Datos Generales</h2>
          </div>
          <ul className="summary">
            <li>
              Usuario: <span>Doctor 1</span>
            </li>
            <li>
              Ultimo Inicio de Sesión: <span>20/02/2021 06:30 PM</span>
            </li>
            <li>
              Primer Inicio de sesión del dia: <span>A las 09:00 AM</span>
            </li>
            <li>
              Pacientes atendidos hoy: <span>15</span>
            </li>
            <li>
              Pacientes añadidos hoy: <span>7</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
