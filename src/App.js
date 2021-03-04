import "./static/styles/global/styles.css";
import { Switch, Route } from "react-router-dom";

import Home from "./components/main/Home";
import AddPatient from "./components/main/AddPatient";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/add-patient" component={AddPatient} />
    </Switch>
  );
}

export default App;
