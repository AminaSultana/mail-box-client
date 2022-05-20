import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Auth from "./Component/Auth/Auth";
import ComposeMail from "./Component/Mail/ComposeMail";
import Home from "./Component/Mail/Home";
import { fetchEmailFromDB } from "./store/email";


function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchEmailFromDB())
  }, []);
  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/compose-mail" element={<ComposeMail/>}/>
      <Route path="/" element={<Auth/>}/>
    </Routes>
    </>
  );
}

export default App;
