import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import "../../../static/styles/add-patient/styles.css";

import Editor from "../../shared/Editor";

const { ipcRenderer } = window.require("electron");

const PATIENT_DEFAULT = {
  name: "",
  docid: "",
  sex: "0",
  bornday: "",
  bornmonth: "",
  bornyear: "",
  age: "",
  weight: "",
  height: "",
  phones: "",
  emails: "",
  address: "",
  insurance: "",
  story: "",
  image: "",
};

const ERROR_DEFAULT = {
  name: null,
  docid: null,
  sex: null,
  bornday: null,
  bornmonth: null,
  bornyear: null,
  age: null,
  weight: null,
  height: null,
  phones: null,
  emails: null,
  address: null,
  insurance: null,
  story: null,
  image: null,
};

export default function AddPatient({ history }) {
  const [state, setState] = useState({
    patient: { ...PATIENT_DEFAULT },
    errors: { ...ERROR_DEFAULT },
  });

  const [saving, setSaving] = useState(false);
  const [processing, setProcessing] = useState(false);

  const runningSave = (isRunning) => {
    setProcessing(isRunning);
    setSaving(isRunning);
  };

  const { patient, errors } = state;

  const onChangeText = (e) => {
    setState({
      ...state,
      patient: {
        ...patient,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onChangeDocument = (e) => {
    const regex = /^(([a-z]?)+([1-9]?)([0-9]?)+)$/i;
    if (regex.test(e.target.value)) {
      setState({
        ...state,
        patient: {
          ...patient,
          docid: e.target.value.toUpperCase(),
        },
      });
    }
  };

  const onChangeImage = (e) => {
    if (e.target.files.length > 0) {
      setState({
        ...state,
        patient: {
          ...patient,
          image: e.target.files[0].path,
        },
      });
    }
  };

  const onChangeNumber = (e) => {
    if (!isNaN(e.target.value)) {
      setState({
        ...state,
        patient: {
          ...patient,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const onChangeBornDate = (e) => {
    if (e.target.value.length > 10) {
      return;
    }

    if (e.target.value.length < patient.borndate.length) {
      setState({
        ...state,
        patient: {
          ...patient,
          [e.target.name]: e.target.value,
        },
      });
      return;
    }

    const lastChar =
      e.target.value.length > 0
        ? e.target.value[e.target.value.length - 1]
        : "";

    if (!isNaN(lastChar)) {
      if (e.target.value.length === 2) {
        e.target.value += "/";
      } else if (e.target.value.length === 5) {
        e.target.value += "/";
      }

      setState({
        ...state,
        patient: {
          ...patient,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const onChangeStory = (event, editor) => {
    const data = editor.getData();
    setState((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        story: data,
      },
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (saving === true) {
      return;
    }

    runningSave(true);

    const newState = { ...state };
    newState.errors = { ...ERROR_DEFAULT };
    let noErrors = true;

    const required = [
      "name",
      "docid",
      "sex",
      "bornmonth",
      "bornday",
      "bornyear",
      "age",
      "weight",
      "height",
      "phones",
      "address",
      "story",
    ];

    required.forEach((x) => {
      if (!patient[x]) {
        newState.errors[x] = "Requerido.";
        noErrors = false;
      }
    });

    setState(newState);
    if (!noErrors) {
      runningSave(false);
      return;
    }

    const newPatient = {
      ...patient,
      borndate: `${patient.bornday}/${patient.bornmonth}/${patient.bornyear}`,
    };
    delete newPatient.bornday;
    delete newPatient.bornmonth;
    delete newPatient.bornyear;

    ipcRenderer
      .invoke("patients", "create", newPatient)
      .then(() => history.push("/"));
  };

  return (
    <MainLayout>
      <div className="add-patient-dashboard">
        <form className="info-area" onSubmit={onSubmit}>
          <div className="info">
            <div className="heading">
              <h1>Añadir Paciente</h1>
              <div className="line"></div>
            </div>
            <div className="main-info">
              <div className="image">
                <div>
                  <label htmlFor="image">Foto</label>
                  <input type="file" id="image" onChange={onChangeImage} />
                  <button
                    type="button"
                    onClick={() => document.getElementById("image").click()}
                  >
                    Elegir Imagen
                  </button>
                </div>
                <img
                  src={
                    patient.image
                      ? patient.image
                      : "file://media/static/no-image.jpg"
                  }
                  alt=""
                  className="preview"
                />
              </div>
              <div className="fields">
                <div>
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={patient.name}
                    onChange={onChangeText}
                  />
                  <span className="error">{errors.name && errors.name}</span>
                </div>
                <div>
                  <label htmlFor="docid">Documento de Identidad</label>
                  <input
                    type="text"
                    name="docid"
                    id="docid"
                    value={patient.docid}
                    onChange={onChangeDocument}
                  />
                  <span className="error">{errors.docid && errors.docid}</span>
                </div>
                <div className="sex">
                  <label htmlFor="sex">Sexo</label>
                  <span>
                    <input
                      type="radio"
                      name="sex"
                      id="male"
                      value="0"
                      defaultChecked={patient.sex === "0"}
                      onChange={onChangeText}
                    />
                    <label htmlFor="male">M</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="sex"
                      id="female"
                      value="1"
                      defaultChecked={patient.sex === "1"}
                      onChange={onChangeText}
                    />
                    <label htmlFor="female">F</label>
                  </span>
                  <span className="error">{errors.sex && errors.sex}</span>
                </div>
                <div>
                  <label htmlFor="borndate">Fecha de Nacimiento</label>
                  <div className="_3fields">
                    <span>
                      <label htmlFor="bornday">Dia</label>
                      <input
                        type="text"
                        name="bornday"
                        id="bornday"
                        onChange={onChangeNumber}
                        value={patient.bornday}
                        placeholder="31"
                      />
                      <span className="error">
                        {errors.bornday && errors.bornday}
                      </span>
                    </span>
                    <span>
                      <label htmlFor="bornmonth">Mes</label>
                      <input
                        type="text"
                        name="bornmonth"
                        id="bornmonth"
                        onChange={onChangeNumber}
                        value={patient.bornmonth}
                        placeholder="12"
                      />
                      <span className="error">
                        {errors.bornmonth && errors.bornmonth}
                      </span>
                    </span>
                    <span>
                      <label htmlFor="bornyear">Año</label>
                      <input
                        type="text"
                        name="bornyear"
                        id="bornyear"
                        onChange={onChangeNumber}
                        value={patient.bornyear}
                        placeholder="2000"
                      />
                      <span className="error">
                        {errors.bornyear && errors.bornyear}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="secondary-info">
              <div className="_3fields">
                <span>
                  <label htmlFor="age">Edad</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    onChange={onChangeNumber}
                    value={patient.age}
                  />
                  <span className="error">{errors.age && errors.age}</span>
                </span>
                <span>
                  <label htmlFor="weight">Peso</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    onChange={onChangeNumber}
                    value={patient.weight}
                  />
                  <small>KG</small>
                  <span className="error">
                    {errors.weight && errors.weight}
                  </span>
                </span>
                <span>
                  <label htmlFor="height">Altura</label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    onChange={onChangeNumber}
                    value={patient.height}
                  />
                  <small>cm</small>
                  <span className="error">
                    {errors.height && errors.height}
                  </span>
                </span>
              </div>
              <div className="_2fields">
                <span>
                  <label htmlFor="phones">Telefonos</label>
                  <input
                    type="text"
                    id="phones"
                    name="phones"
                    onChange={onChangeText}
                    value={patient.phones}
                  />
                  <span className="error">
                    {errors.phones && errors.phones}
                  </span>
                </span>
                <span>
                  <label htmlFor="emails">Correos</label>
                  <input
                    type="text"
                    id="emails"
                    name="emails"
                    onChange={onChangeText}
                    value={patient.emails}
                  />
                  <span className="error">
                    {errors.emails && errors.emails}
                  </span>
                </span>
              </div>
              <div className="field">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={onChangeText}
                  value={patient.address}
                />
                <span className="error">
                  {errors.address && errors.address}
                </span>
              </div>
              <div className="field">
                <label htmlFor="insurance">Aseguradora</label>
                <input
                  type="text"
                  id="insurance"
                  name="insurance"
                  onChange={onChangeText}
                  value={patient.insurance}
                />
                <span className="error">
                  {errors.insurance && errors.insurance}
                </span>
              </div>
            </div>
          </div>
          <button className="save-btn" disabled={processing}>
            {saving ? "GUARDANDO..." : "GUARDAR"}
          </button>
        </form>
        <div className="story">
          <Editor data={patient.story} onChange={onChangeStory} />
          <span className="error">{errors.story && errors.story}</span>
        </div>
      </div>
    </MainLayout>
  );
}
