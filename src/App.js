import { Route, Routes } from "react-router-dom";
import Auth from "./Component/Auth/Auth";
import HomePage from "./Page/HomePage"


function App() {
  return (
    <>
    <Routes>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/" element={<Auth/>}/>
    </Routes>
    
    </>
  );
}

export default App;
