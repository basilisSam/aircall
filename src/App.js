import { Grid, Tractor } from "@aircall/tractor";
import { Routes, Route } from "react-router-dom";
import CallDetails from "./componets/CallDetails";
import Home from "./componets/Home";
import Login from "./componets/Login";
import Navbar from "./componets/NavBar";
import "./App.css";

function App() {
  return (
    <Tractor>
      <Grid gridTemplateRows='max-content 200px' gridGap={3}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='/calls/:id' element={<CallDetails />} />
        </Routes>
      </Grid>
    </Tractor>
  );
}

export default App;
