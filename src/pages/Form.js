// src/pages/Form.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Checkbox, Button, Typography, Snackbar, Card } from "@mui/material";
import TermsModal from "../components/TermsModal";
import { authorizeUser } from "../api"; // Importamos la función de api.js
import { useLocation } from "react-router-dom";

function Form() {
  const { site } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", tyc: false });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const entries = Array.from(params.entries());
    return entries.map(([key, value]) => ({ key, value }));
  };
  const queryParamsArray = getQueryParams();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authorizeUser(formData, queryParamsArray); // Llamamos a authorizeUser desde api.js
      if (response.status === 200) { // Verificamos el status code
        navigate("/success");
      }
    } catch {
      setShowSnackbar(true);
    }
  };

  return (
    <Card style={{ padding: "2rem" }}>
      <Typography variant="h5" align="center" gutterBottom>Formulario de Acceso</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Nombre" name="name" fullWidth required onChange={handleInputChange} />
        <TextField label="Teléfono" name="phone" fullWidth required onChange={handleInputChange} />
        <TextField label="Email" name="email" fullWidth required type="email" onChange={handleInputChange} />
        <Box display="flex" alignItems="center">
          <Checkbox name="tyc" onChange={handleInputChange} />
          <Typography variant="body2">
            Acepto los <Button onClick={() => setShowModal(true)}>Términos y Condiciones</Button>
          </Typography>
        </Box>
        <Button variant="contained" color="primary" fullWidth type="submit">Continuar</Button>
      </Box>
      <Box>
        {queryParamsArray.length > 0 ? (
          queryParamsArray.map((param, index) => (
            <Typography key={index} variant="body1">
              {param.key}: {param.value}
            </Typography>
          ))
        ) : (
          <Typography variant="body1">No hay parámetros en la URL</Typography>
        )}
      </Box>
      <Snackbar open={showSnackbar} onClose={() => setShowSnackbar(false)} message="Hubo un problema, intenta de nuevo" />
      <TermsModal open={showModal} onClose={() => setShowModal(false)} />
    </Card>
  );
}

export default Form;
