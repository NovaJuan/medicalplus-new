import "../../../static/styles/add-appointment/styles.css";
import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";

import { useAppointmentsModel } from "../../../models/appointment";

import SelectPatient from "./SelectPatient";
import SelectDate from "./SelectDate";

export default function AddAppointment({ history }) {
  const { createAppointment } = useAppointmentsModel();

  const [step, setStep] = useState(0);
  const [newAppointment, setNewAppointment] = useState({
    patient: null,
    hour: 1,
    minute: 0,
    date: new Date(),
    meridem: "am",
  });
  const [error, setError] = useState(null);

  function changeStep(newStep) {
    if (newStep === 0) {
      setStep(0);
    } else {
      setStep(1);
    }
  }

  function onSelectPatient(patient) {
    setNewAppointment((prev) => ({
      ...prev,
      patient,
    }));
    changeStep(1);
  }

  async function finishAppointment() {
    const result = await createAppointment(newAppointment);
    if (result === true) {
      history.push("/appointments/all");
    } else {
      setError(result);
    }
  }

  return (
    <MainLayout>
      <div className="add-appointment">
        {step === 0 && <SelectPatient onSelectPatient={onSelectPatient} />}
        {step === 1 && (
          <SelectDate
            hour={newAppointment.hour}
            minute={newAppointment.minute}
            meridem={newAppointment.meridem}
            date={newAppointment.date}
            error={error}
            setNewAppointment={setNewAppointment}
            finishAppointment={finishAppointment}
          />
        )}
      </div>
    </MainLayout>
  );
}
