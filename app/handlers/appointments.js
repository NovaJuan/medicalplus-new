const startDB = require("../database");

module.exports = (window) => {
  return async (event, operation, data) => {
    switch (operation) {
      case "getAll":
        return await getAppointments(event, window, data);
      case "create":
        return await createAppointment(event, window, data);
      case "get":
        return await getAppointment(event, window, data);
      case "delete":
        return await deleteAppointment(event, window, data);

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
  const appointment = await db.get(
    `SELECT * FROM appointments WHERE id=?`,
    data
  );
  appointment.patient = await db.get(
    "SELECT * FROM patients WHERE id=?",
    appointment.patient
  );
  await db.close();
  return appointment;
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

async function deleteAppointment(event, window, data) {
  const { dialog } = require("electron");

  const res = await dialog.showMessageBox(window, {
    title: "Eliminar Cita",
    message: "Estas segura/seguro de eleminar esta cita?",
    buttons: ["Yes", "No"],
    type: "warning",
  });

  if (res.response === 1) {
    return false;
  }

  const db = await startDB();

  await db.run(`DELETE FROM appointments WHERE id = ?`, data);

  await db.close();

  return true;
}
