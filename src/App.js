import { Grid, Tractor } from "@aircall/tractor";
import { Routes, Route } from "react-router-dom";
import CallDetails from "./componets/CallDetails";
import Home from "./componets/Home";
import Login from "./componets/Login";
import Navbar from "./componets/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme='light'
        />
      </Grid>
    </Tractor>
  );
}

export default App;
