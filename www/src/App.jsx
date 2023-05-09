import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

function App() {
  const [Doc, setDoc] = React.useState("");
  return (
    <div className="main-page-wrapper">
      <Navbar setDoc={setDoc} />
      {Doc !== "" ? <Modal url={Doc} doc={setDoc} /> : null}
      <Routes>
        <Route path="/*" element={<Home setDoc={setDoc}/>} />
      </Routes>
      <Footer setDoc={setDoc} />
    </div>
  );
}

export default App;
