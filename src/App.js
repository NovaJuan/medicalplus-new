import "./static/styles/global/styles.css";
import { Switch, Route } from "react-router-dom";

import Home from "./components/main/Home";
import AddPatient from "./components/main/AddPatient";
import PatientDetails from "./components/main/PatientDetails";
import AddAppointment from "./components/main/AddAppointment";
import AllAppointments from "./components/main/AllAppointments";
import AllPatients from "./components/main/AllPatients";

import ContextProvider from "./contexts";

function App() {
  return (
    <ContextProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/patients/add" component={AddPatient} />
        <Route exact path="/patients/all" component={AllPatients} />
        <Route exact path="/patients/:id" component={PatientDetails} />
        <Route exact path="/appointments/add" component={AddAppointment} />
        <Route exact path="/appointments/all" component={AllAppointments} />
      </Switch>
    </ContextProvider>
  );
}

export default App;
