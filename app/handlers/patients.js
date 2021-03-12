const startDB = require("../database");

module.exports = (window) => {
  return async (event, operation, data) => {
    switch (operation) {
      case "getAll":
        return await getPatients(event, window, data);
      case "create":
        return await createPatient(event, window, data);
      case "update":
        return await updatePatient(event, window, data);
      case "get":
        return await getPatient(event, window, data);
      case "delete":
        return await deletePatient(event, window, data);

      default:
        return null;
    }
  };
};

async function getPatients(event, window, data) {
  const db = await startDB();
  let patients = [];
  if (typeof data === "string") {
    patients = await db.all(
      `SELECT * FROM patients WHERE name LIKE :search OR docid LIKE :search ORDER BY last_update DESC`,
      { ":search": `%${data}%` }
    );
  } else {
    patients = await db.all(
      `SELECT * FROM patients ORDER BY last_update DESC LIMIT 10`
    );
  }
  await db.close();
  return patients;
}

async function getPatient(event, window, data) {
  const db = await startDB();
  const patient = await db.get(`SELECT * FROM patients WHERE id=?`, data);
  await db.close();
  return patient;
}

async function createPatient(event, window, data) {
  const time = Date.now();

  let newPatient = {
    ":name": data.name,
    ":docid": data.docid,
    ":sex": data.sex,
    ":borndate": data.borndate,
    ":age": data.age,
    ":weight": data.weight,
    ":height": data.height,
    ":phones": data.phones,
    ":emails": data.emails,
    ":address": data.address,
    ":insurance": data.insurance || null,
    ":story": data.story,
    ":image": null,
    ":created_at": time,
    ":last_update": time,
  };

  if (data.image) {
    const sharp = require("sharp");
    const path = require("path");
    const { randomBytes } = require("crypto");
    const imageName = randomBytes(16).toString("hex");

    const fs = require("fs-extra");

    try {
      await fs.mkdir(path.join(__dirname, `../media/`));
    } catch {}

    await sharp(data.image)
      .flatten({ background: { r: 0, g: 0, b: 0 } })
      .resize(150, 150, { fit: "cover" })
      .jpeg()
      .toFile(path.join(__dirname, `../media/${imageName}.jpg`));
    newPatient[":image"] = `${imageName}.jpg`;
  }

  const db = await startDB();
  const results = await db.run(
    `INSERT INTO patients (
    name,
    docid,
    sex,
    borndate,
    age,
    weight,
    height,
    phones,
    emails,
    address,
    insurance,
    story,
    image,
    created_at,
    last_update
    ) VALUES (
    :name,
    :docid,
    :sex,
    :borndate,
    :age,
    :weight,
    :height,
    :phones,
    :emails,
    :address,
    :insurance,
    :story,
    :image,
    :created_at,
    :last_update
    )`,
    newPatient
  );

  newPatient = await db.get("SELECT * FROM patients WHERE id = :id", {
    ":id": results.lastID,
  });

  await db.close();

  return newPatient;
}

async function updatePatient(event, window, data) {
  const { id } = data;
  const db = await startDB();

  const oldPatient = await db.get(`SELECT * FROM patients WHERE id = ?`, id);

  let newPatient = { ...oldPatient, ...data };

  if (newPatient.image !== oldPatient.image) {
    const { unlink } = require("fs-extra");
    const path = require("path");
    const { randomBytes } = require("crypto");
    const sharp = require("sharp");

    try {
      await unlink(path.join(__dirname, "../media", oldPatient.image));
    } catch {}

    const imageName = randomBytes(16).toString("hex");

    try {
      await fs.mkdir(path.join(__dirname, `../media/`));
    } catch {}

    await sharp(newPatient.image)
      .flatten({ background: { r: 0, g: 0, b: 0 } })
      .resize(150)
      .jpeg()
      .toFile(path.join(__dirname, `../media/${imageName}.jpg`));
    newPatient.image = `${imageName}.jpg`;
  }

  newPatient.last_update = Date.now();

  let sqlParameters = [];

  Object.entries(newPatient).forEach((item) => {
    sqlParameters.push(`${item[0]} = :${item[0]}`);
    newPatient[`:${item[0]}`] = item[1];
    delete newPatient[item[0]];
  });

  await db.run(
    `UPDATE patients SET ${sqlParameters.join(", ")} WHERE id = :id`,
    newPatient
  );

  newPatient = await db.get("SELECT * FROM patients WHERE id = ?", id);

  await db.close();

  return newPatient;
}

async function deletePatient(event, window, data) {
  const { dialog } = require("electron");

  const res = await dialog.showMessageBox(window, {
    title: "Eliminar Paciente",
    message:
      "Estas segura/seguro de eleminar este paciente? Tambien se eliminara todas las citas del paciente.",
    buttons: ["Yes", "No"],
    type: "warning",
  });

  if (res.response === 1) {
    return false;
  }

  const db = await startDB();

  const patient = await db.get(`SELECT * FROM patients WHERE id = ?`, data);

  if (patient.image !== null) {
    const { unlink } = require("fs-extra");
    const path = require("path");

    try {
      await unlink(path.join(__dirname, "../media", patient.image));
    } catch {}
  }

  await db.run(`DELETE FROM appointments WHERE patient = ?`, data);

  await db.run(`DELETE FROM patients WHERE id = ?`, data);

  await db.close();

  return true;
}
