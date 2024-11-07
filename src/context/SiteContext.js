// src/context/SiteContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchSiteInfo } from "../api"; // Cambiado el nombre de la función para reflejar "site"
import { useParams } from "react-router-dom";

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
  const { site } = useParams();
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSiteInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchSiteInfo(site);
        setSiteInfo(data);
      } catch (err) {
        setError("Error al obtener la información del sitio");
      } finally {
        setLoading(false);
      }
    };

    if (site) {
      loadSiteInfo();
    }
  }, [site]);

  return (
    <SiteContext.Provider value={{ siteInfo, loading, error }}>
      {children}
    </SiteContext.Provider>
  );
};
