import {Grid, Tractor} from "@aircall/tractor";
import {Route, Routes} from "react-router-dom";
import CallDetails from "./componets/CallDetails/CallDetails";
import Home from "./componets/Home/Home";
import Login from "./componets/Login/Login";
import Navbar from "./componets/Navbar/NavBar";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {useEffect, useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("jwt");
        if (loggedInUser) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, []);

    return (
        <Tractor>
            <Grid gridTemplateRows='max-content 200px' gridGap={3}>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path='/calls/:id' element={<CallDetails/>}/>
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
