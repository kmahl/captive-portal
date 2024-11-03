import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Success from "./pages/Success";
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="sm" style={{ padding: "1rem", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Routes>
          <Route path="/guest/s/:site" element={<Home />} />
          <Route path="/form/:site" element={<Form />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
