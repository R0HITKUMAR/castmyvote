import React from "react";
import { Routes, Route } from "react-router-dom";
import ElectionsView from "./elections/ElectionsView";
import EForm from "./EForm";
import EUForm from "./EUForm";
import ElectionPage from "./election/ElectionPage";
import ElectionResult from "./election/ElectionResult";

export default function Elections(props) {
  return (
    <Routes>
      <Route path="/" element={<ElectionsView />} />
      <Route path="/addElection" element={<EForm />} />
      <Route path="/updateElection/:id/*" element={<EUForm />} />
      <Route path="/:id/*" element={<ElectionPage />} />
      <Route path="/:id/result" element={<ElectionResult />} />
    </Routes>
  );
}
