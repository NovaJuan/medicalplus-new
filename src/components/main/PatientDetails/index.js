import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import "../../../static/styles/patient-details/styles.css";

import Editor from "../../shared/Editor";

const { ipcRenderer } = window.require("electron");

const ERROR_DEFAULT = {
  name: null,
  docid: null,
  sex: null,
  borndate: null,
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

export default function PatientDetails({ match: { params }, history }) {
  const [state, setState] = useState({
    patient: null,
    errors: { ...ERROR_DEFAULT },
  });

  const [saving, setSaving] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [processing, setProcessing] = useState(false);

  const runningSave = (isRunning) => {
    setProcessing(isRunning);
    setSaving(isRunning);
  };
  const runningDelete = (isRunning) => {
    setProcessing(isRunning);
    setDeleting(isRunning);
  };
  const runningPrint = (isRunning) => {
    setProcessing(isRunning);
    setPrinting(isRunning);
  };

  const { patient, errors } = state;

  useEffect(() => {
    if (patient === null) {
      ipcRenderer.invoke("patients", "get", params.id).then((data) => {
        setState({
          ...state,
          patient: data,
        });
      });
    }
  }, []);

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
      console.log("hey");
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
      "borndate",
      "age",
      "weight",
      "height",
      "phones",
      "address",
      "story",
    ];

    required.forEach((x) => {
      if (!patient[x] && patient[x] !== 0) {
        newState.errors[x] = "Campo Requerido.";
        noErrors = false;
      }
    });

    setState(newState);
    if (!noErrors) {
      runningSave();
      return;
    }

    ipcRenderer.invoke("patients", "update", patient).then((newPatient) => {
      setState({ ...state, patient: newPatient });
      runningSave(false);
    });
  };

  const deletePatient = () => {
    if (deleting) {
      return;
    }

    runningDelete(true);

    ipcRenderer.invoke("patients", "delete", patient.id).then((res) => {
      if (res === true) {
        history.push("/");
      } else {
        runningDelete(false);
      }
    });
  };

  if (patient === null) {
    return (
      <MainLayout>
        <div>Cargando...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="patient-details-dashboard">
        <form className="info-area" onSubmit={onSubmit}>
          <div className="info">
            <div className="heading">
              <h1>Detalles de Paciente</h1>
              <div className="line"></div>
            </div>
            <div className="main-info">
              <div className="image">
                <div>
                  <label htmlFor="image">Foto</label>
                  <input
                    spellCheck="false"
                    type="file"
                    id="image"
                    onChange={onChangeImage}
                  />
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
                      ? `file://media/${patient.image}`
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
                    spellCheck="false"
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
                    spellCheck="false"
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
                      defaultChecked={patient.sex === 0}
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
                      defaultChecked={patient.sex === 1}
                      onChange={onChangeText}
                    />
                    <label htmlFor="female">F</label>
                  </span>
                  <span className="error">{errors.sex && errors.sex}</span>
                </div>
                <div>
                  <label htmlFor="borndate">Fecha de Nacimiento</label>
                  <input
                    spellCheck="false"
                    type="text"
                    name="borndate"
                    id="borndate"
                    onChange={onChangeBornDate}
                    value={patient.borndate}
                  />
                  <span className="error">
                    {errors.borndate && errors.borndate}
                  </span>
                </div>
              </div>
            </div>
            <div className="secondary-info">
              <div className="_3fields">
                <span>
                  <label htmlFor="age">Edad</label>
                  <input
                    spellCheck="false"
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
                    spellCheck="false"
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
                    spellCheck="false"
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
                    spellCheck="false"
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
                    spellCheck="false"
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
                  spellCheck="false"
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
                  spellCheck="false"
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
          <div className="_3btns">
            <button type="submit" className="save-btn" disabled={processing}>
              {saving ? "GUARDANDO..." : "GUARDAR"}
            </button>
            <button type="button" className="print-btn" disabled={processing}>
              IMPRIMIR
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={deletePatient}
              disabled={processing}
            >
              {deleting ? "ELIMINANDO..." : "ELIMINAR"}
            </button>
          </div>
        </form>
        <div className="story">
          <Editor data={patient.story} onChange={onChangeStory} />
          <span className="error">{errors.story && errors.story}</span>
        </div>
      </div>
    </MainLayout>
  );
}
