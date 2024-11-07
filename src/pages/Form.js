import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Checkbox, Button, Typography, Snackbar, Card, CircularProgress, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import TermsModal from "../components/TermsModal";
import { authorizeUser } from "../api";
import { useSite } from "../context/SiteContext";

function Form() {
  const navigate = useNavigate();
  const { siteInfo, loading, error } = useSite();
  const [formData, setFormData] = useState({ tyc: false });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
    if (siteInfo) {
      // Inicializa formData con los campos de staticFields, si están habilitados
      const initialFormData = {};
      ["name", "phone", "email"].forEach((field) => {
        if (siteInfo.staticFields.includes(field)) {
          initialFormData[field] = "";
        }
      });
      setFormData((prev) => ({ ...prev, ...initialFormData }));
      setDynamicFields(siteInfo.form || []);
    }
  }, [siteInfo]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authorizeUser(formData);
      if (response.status === 200) {
        navigate("/success");
      }
    } catch {
      setShowSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Card style={{ padding: "2rem" }}>
      <Typography variant="h5" align="center" gutterBottom>Formulario de Acceso</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {/* Campos estáticos: se muestran solo si están en staticFields */}
        {siteInfo.staticFields.includes("name") && (
          <TextField label="Nombre" name="name" fullWidth required onChange={handleInputChange} />
        )}
        {siteInfo.staticFields.includes("phone") && (
          <TextField label="Teléfono" name="phone" fullWidth required onChange={handleInputChange} />
        )}
        {siteInfo.staticFields.includes("email") && (
          <TextField label="Email" name="email" fullWidth required type="email" onChange={handleInputChange} />
        )}

        {/* Campos dinámicos */}
        {dynamicFields.map((field, index) => (
          <Box key={index} mb={2}>
            {field.type === "input" && (
              <TextField
                label={field.label}
                name={field.name}
                fullWidth
                required={field.required}
                onChange={handleInputChange}
              />
            )}
            {field.type === "selector" && (
              <TextField
                select
                label={field.label}
                name={field.name}
                fullWidth
                required={field.required}
                onChange={handleInputChange}
              >
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            )}
            {field.type === "radiobutton" && (
              <Box>
                <Typography>{field.label}</Typography>
                <RadioGroup
                  name={field.name}
                  onChange={handleInputChange}
                  row
                >
                  {field.options.map((option, idx) => (
                    <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </Box>
            )}
          </Box>
        ))}

        {/* Checkbox de Términos y Condiciones */}
        <Box display="flex" alignItems="center">
          <Checkbox name="tyc" onChange={handleInputChange} required />
          <Typography variant="body2">
            Acepto los <Button onClick={() => setShowModal(true)}>Términos y Condiciones</Button>
          </Typography>
        </Box>

        {/* Botón de Continuar con Spinner */}
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          type="submit" 
          disabled={isLoading} 
          startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
        >
          {isLoading ? "Conectando..." : "Conectar"}
        </Button>
      </Box>
      
      {/* Snackbar para mensaje de error */}
      <Snackbar open={showSnackbar} onClose={() => setShowSnackbar(false)} message="Hubo un problema, intenta de nuevo" />

      {/* Modal de Términos y Condiciones */}
      <TermsModal open={showModal} onClose={() => setShowModal(false)} />
    </Card>
  );
}

export default Form;
