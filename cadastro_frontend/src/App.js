import React, {Fragment} from "react";
import './App.css';
import InputClient from "./components/InputClient";
import ListClient from "./components/ListClient";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputClient/>
        <ListClient/>
      </div>
    </Fragment>
  );
}

export default App;
