import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Checkbox, Typography, Snackbar, Card, CircularProgress, MenuItem, RadioGroup, FormControlLabel, Radio, BottomNavigation, Button as ButtonMui } from "@mui/material";
import TermsModal from "../components/TermsModal";
import { authorizeUser } from "../api";
import { useSite } from "../context/SiteContext";
import Button from '../components/Button';

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
     // const response = await authorizeUser(formData);
    //  if (response.status === 200) {
        navigate("/success");
   //   }
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
    <Card sx={{ padding: "2rem", height: '100%', overflow: 'scroll' }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: '40px' }} gutterBottom>Formulario de Acceso</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', paddingBottom: '120px' }}>
        {/* Campos estáticos: se muestran solo si están en staticFields */}
        {siteInfo.staticFields.includes("name") && (
          <TextField label="Nombre" name="name" fullWidth variant="standard" required onChange={handleInputChange} sx={{ marginBottom: '20px' }} />
        )}
        {siteInfo.staticFields.includes("phone") && (
          <TextField label="Teléfono" name="phone" fullWidth variant="standard" required onChange={handleInputChange} sx={{ marginBottom: '20px' }} />
        )}
        {siteInfo.staticFields.includes("email") && (
          <TextField label="Email" name="email" fullWidth variant="standard" required type="email" onChange={handleInputChange} sx={{ marginBottom: '20px' }} />
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
                variant="standard"
                onChange={handleInputChange}
                sx={{ marginBottom: '20px' }}
              />
            )}
            {field.type === "selector" && (
              <TextField
                select
                label={field.label}
                name={field.name}
                fullWidth
                required={field.required}
                variant="standard"
                onChange={handleInputChange}
                sx={{ marginBottom: '20px' }}
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
                  sx={{ marginBottom: '20px' }}
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
        {/* <Box display="flex" alignItems="center">
          <Checkbox name="tyc" onChange={handleInputChange}
            sx={{ marginBottom: '20px' }} required />
          <Typography variant="body2">
            Acepto los <Button onClick={() => setShowModal(true)}>Términos y Condiciones</Button>
          </Typography>
        </Box> */}

        {/* Botón de Continuar con Spinner */}
        {/* <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
        >
          {isLoading ? "Conectando..." : "Conectar"}
        </Button> */}

        <BottomNavigation
          sx={{
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            padding: '15px 25px 50px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            left: 0,
            backgroundColor: '#fff'
          }}
        >
          <Box display="flex" alignItems="center">
            <Checkbox sx={{ padding: '0 5px', marginBottom: '0' }} name="tyc" onChange={handleInputChange} required />
            <Typography variant="body2">
              Acepto los <ButtonMui sx={{ padding: 0, textTransform: 'lowercase' }} onClick={() => setShowModal(true)}>Términos y Condiciones</ButtonMui>
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            sx={{ textTransform: 'capitalize' }}
            text={isLoading ? "Conectando..." : "Conectar"}
          />
        </BottomNavigation>
      </Box>
      {/* Snackbar para mensaje de error */}
      <Snackbar open={showSnackbar} onClose={() => setShowSnackbar(false)} message="Hubo un problema, intenta de nuevo" />

      {/* Modal de Términos y Condiciones */}
      <TermsModal open={showModal} onClose={() => setShowModal(false)} />
    </Card >
  );
}

export default Form;
