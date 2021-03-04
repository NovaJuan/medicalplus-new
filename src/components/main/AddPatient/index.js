import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../../static/styles/add-patient/styles.css";
import "@ckeditor/ckeditor5-build-classic/build/translations/es";

export default function AddPatient() {
  const [patient, setPatient] = useState({
    name: "",
    id: "",
    sex: "",
    borndate: "",
    age: "",
    weight: "",
    height: "",
    phones: "",
    emails: "",
    address: "",
    insurance: "",
    story: "",
    image: "",
  });

  const onChangeText = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImage = (e) => {
    if (e.target.files.length > 0) {
      setPatient({
        ...patient,
        image: e.target.files[0].path,
      });
    }
  };

  const onChangeNumber = (e) => {
    if (!isNaN(e.target.value)) {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangeStory = (event, editor) => {
    const data = editor.getData();
    setPatient({
      ...patient,
      story: data,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(patient);
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
                  src={patient.image ? patient.image : ""}
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
                </div>
                <div>
                  <label htmlFor="id">Documento de Identidad</label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    value={patient.id}
                    onChange={onChangeText}
                  />
                </div>
                <div className="sex">
                  <label htmlFor="sex">Sexo</label>
                  <span>
                    <input
                      type="radio"
                      name="sex"
                      id="male"
                      value="male"
                      defaultChecked={true}
                      onChange={onChangeText}
                    />
                    <label htmlFor="male">Maculino</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="sex"
                      id="female"
                      value="female"
                      onChange={onChangeText}
                    />
                    <label htmlFor="female">Femenino</label>
                  </span>
                </div>
                <div>
                  <label htmlFor="borndate">Fecha de Nacimiento</label>
                  <input
                    type="text"
                    name="borndate"
                    id="borndate"
                    onChange={onChangeText}
                    value={patient.borndate}
                  />
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
                </span>
              </div>
              <div className="field">
                <label htmlFor="phones">Telefonos</label>
                <input
                  type="text"
                  id="phones"
                  name="phones"
                  onChange={onChangeText}
                  value={patient.phones}
                />
              </div>
              <div className="field">
                <label htmlFor="emails">Correos</label>
                <input
                  type="text"
                  id="emails"
                  name="emails"
                  onChange={onChangeText}
                  value={patient.emails}
                />
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
              </div>
            </div>
          </div>
          <button className="save-btn">GUARDAR</button>
        </form>
        <div className="story">
          <CKEditor
            editor={ClassicEditor}
            value={patient.story}
            onChange={onChangeStory}
            config={{
              language: "es",
              toolbar: [
                "heading",
                "bold",
                "italic",
                "numberedList",
                "bulletedList",
                "undo",
                "redo",
              ],
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
}
