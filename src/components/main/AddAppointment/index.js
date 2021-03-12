import "../../../static/styles/add-appointment/styles.css";
import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";

import { useAppointmentsContext } from "../../../contexts/appointments";
import { usePatientsContext } from "../../../contexts/patients";

import SelectPatient from "./SelectPatient";
import SelectDate from "./SelectDate";

export default function AddAppointment({ history }) {
  const {
    changePatient,
    clearAppointmentsContext,
    createAppointment,
  } = useAppointmentsContext();

  const { clearPatientsContext } = usePatientsContext();
  const [step, setStep] = useState(0);

  useEffect(() => {
    clearPatientsContext();
    clearAppointmentsContext();

    return () => {
      clearPatientsContext();
      clearAppointmentsContext();
    };
  }, []);

  function changeStep(newStep) {
    if (newStep === 0) {
      setStep(0);
    } else {
      setStep(1);
    }
  }

  function onSelectPatient(patient) {
    changePatient(patient);
    changeStep(1);
  }

  async function finishAppointment() {
    const result = await createAppointment();

    if (result) {
      history.push("/");
    }
  }

  return (
    <MainLayout>
      <div className="add-appointment">
        {step === 0 && <SelectPatient onSelectPatient={onSelectPatient} />}
        {step === 1 && <SelectDate finishAppointment={finishAppointment} />}
      </div>
    </MainLayout>
  );
}
