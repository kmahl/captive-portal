import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Success from "./pages/Success";
import { Container, CssBaseline } from "@mui/material";
import { SiteProvider } from "./context/SiteContext";

function App() {
  return (
    <SiteProvider>
      <Router>
        <CssBaseline />
        <Container maxWidth="sm" style={{ padding: "0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Routes>
            <Route
              path="/guest/s/:site"
              element={
                <SiteProvider>
                  <Home />
                </SiteProvider>
              } />
            <Route
              path="/form/:site"
              element={
                <SiteProvider>
                  <Form />
                </SiteProvider>
              } />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Container>
      </Router>
    </SiteProvider>
  );
}

export default App;
