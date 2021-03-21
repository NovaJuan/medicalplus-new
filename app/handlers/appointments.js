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
      case "status":
        return await changeStatus(event, window, data);

      default:
        return null;
    }
  };
};

async function getAppointments(event, window, data) {
  const search = data.search || "";
  const date = data.date || null;
  const getFinishedAppointments = data.getFinishedAppointments || false;
  const page = data.page || 1;

  const itemsPerPage = 8;
  const limit = itemsPerPage;
  const offset = (page - 1) * limit;

  let filtersChainStarted = false;
  const filterJoin = () => {
    const clause = filtersChainStarted ? "AND" : "WHERE";
    filtersChainStarted = true;
    return clause;
  };

  let sql = "";

  if (!date && !search) {
    const defaultDate = new Date();
    const from = defaultDate.setHours(0, 0, 0);
    const to = defaultDate.setHours(23, 59, 59);
    sql += ` ${filterJoin()} date BETWEEN ${from} AND ${to}`;
  }

  if (date) {
    const from = date.setHours(0, 0, 0);
    const to = date.setHours(23, 59, 59);
    sql += ` ${filterJoin()} date BETWEEN ${from} AND ${to}`;
  }

  if (search) {
    sql += ` ${filterJoin()} patient IN (SELECT id FROM patients WHERE name LIKE '%${search}%' OR docid LIKE '%${search}%')`;
  }

  if (getFinishedAppointments !== true) {
    sql += ` ${filterJoin()} status = 0`;
  }

  sql += " ORDER BY date ASC";

  const db = await startDB();

  const totalCount = (await db.get(`SELECT COUNT(*) FROM appointments${sql}`))[
    "COUNT(*)"
  ];
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  let appointments = await db.all(`SELECT * FROM appointments${sql}`);

  appointments = await Promise.all(
    appointments.map(async (row) => {
      row.patient = await db.get(
        `SELECT * FROM patients WHERE id = ${row && row.patient}`
      );
      return row;
    })
  );

  await db.close();

  const result = {
    totalCount,
    appointments,
    nextPage: offset + limit < totalCount ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };

  return result;
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

  const time = date.getTime();

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

async function changeStatus(event, window, { id, status }) {
  const db = await startDB();

  const appointment = await db.get(`SELECT * FROM appointments WHERE id=?`, id);

  await db.run("UPDATE patients SET last_update = :update WHERE id = :id", {
    ":update": Date.now(),
    ":id": appointment.patient,
  });

  await db.run("UPDATE appointments SET status = :status WHERE id = :id", {
    ":status": status === "finished" ? 1 : 0,
    ":id": id,
  });

  await db.close();

  return true;
}
