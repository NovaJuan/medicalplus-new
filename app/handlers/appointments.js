const startDB = require("../database");

module.exports = (window) => {
  return async (event, operation, data) => {
    switch (operation) {
      case "getAll":
        return await getAppointments(event, window, data);
      case "create":
        return await createAppointment(event, window, data);
      // case "update":
      //   return await updatePatient(event, window, data);
      // case "get":
      //   return await getPatient(event, window, data);
      // case "delete":
      //   return await deletePatient(event, window, data);

      default:
        return null;
    }
  };
};

async function getAppointments(event, window, data) {
  const { search, date } = data;
  let sql = "SELECT * FROM appointments";
  const db = await startDB();
  let isFiltered = false;
  const filterJoin = () => (isFiltered ? "AND" : "WHERE");

  if (date) {
    const from = date.setHours(0, 0, 0);
    const to = date.setHours(23, 59, 59);
    sql += ` ${filterJoin()} date BETWEEN ${from} AND ${to}`;
    isFiltered = true;
  }

  if (search) {
    sql += ` ${filterJoin()} patient IN (SELECT id FROM patients WHERE name LIKE '%${search}%' OR docid LIKE '%${search}%')`;
    isFiltered = true;
  }

  sql += " ORDER BY created_at ASC";

  const appointments = [];
  await db.each(sql, async (err, row) => {
    row.patient = await db.get(
      `SELECT * FROM patients WHERE id = ${row && row.patient}`
    );
    appointments.push(row);
  });

  await db.close();
  return appointments;
}

async function getAppointment(event, window, data) {
  const db = await startDB();
  const patient = await db.get(`SELECT * FROM patients WHERE id=?`, data);
  await db.close();
  return patient;
}

async function createAppointment(event, window, data) {
  const { date, hour, minute, patient, meridem } = data;

  if (meridem === "pm") {
    date.setHours(hour + 12, minute, 0, 0);
  } else {
    date.setHours(hour, minute, 0, 0);
  }

  console.log(date.toLocaleString("es-ES"));

  const time = date.getTime();

  console.log(time);

  if (time <= Date.now()) {
    return {
      error: "La fecha y hora tiene que ser mayor que la fecha y hora actual.",
    };
  }

  const db = await startDB();

  const check = await db.get(`SELECT 1 FROM appointments WHERE date = ${time}`);

  if (check) {
    return {
      error: "Ya hay una cita programada a esa hora.",
    };
  }

  let newAppointment = {
    ":date": time,
    ":patient": patient.id,
    ":created_at": Date.now(),
  };

  await db.run(
    `INSERT INTO appointments (date,patient,created_at) VALUES(:date,:patient,:created_at)`,
    newAppointment
  );

  await db.close();

  return true;
}

// async function deletePatient(event, window, data) {
//   const { dialog } = require("electron");

//   const res = await dialog.showMessageBox(window, {
//     title: "Eliminar Paciente",
//     message: "Estas segura/seguro de eleminar este paciente?",
//     buttons: ["Yes", "No"],
//     type: "warning",
//   });

//   if (res.response === 1) {
//     return false;
//   }

//   const db = await startDB();

//   const patient = await db.get(`SELECT * FROM patients WHERE id = ?`, data);

//   if (patient.image !== null) {
//     const { unlink } = require("fs-extra");
//     const path = require("path");

//     try {
//       await unlink(path.join(__dirname, "../media", patient.image));
//     } catch {}
//   }

//   await db.run(`DELETE FROM patients WHERE id = ?`, data);

//   await db.close();

//   return true;
// }
