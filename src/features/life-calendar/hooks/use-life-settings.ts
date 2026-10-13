import { useEffect, useState } from "react";

import { NUMBER_OF_YEARS_BY_LIFE } from "@/features/life-calendar/constants";
import { isValidHorizon } from "@/features/life-calendar/lib/calendar-horizon";
import { format, isValid, parseISO } from "date-fns";

const STORAGE_KEY = "birthDate";
const HORIZON_STORAGE_KEY = "calendarHorizon";

function isValidBirthDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    isValid(parseISO(value)) &&
    value >= "1900-01-01" &&
    value <= format(new Date(), "yyyy-MM-dd")
  );
}

export function useLifeSettings() {
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [horizon, setHorizon] = useState(NUMBER_OF_YEARS_BY_LIFE);
  const [horizonMessage, setHorizonMessage] = useState("");
  const [clearMessage, setClearMessage] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedDate = window.localStorage.getItem(STORAGE_KEY);

      if (savedDate !== null) {
        if (isValidBirthDate(savedDate)) {
          setBirthDate(savedDate);
          setMessage("Enregistrée sur cet appareil");
        } else {
          setMessage(
            "La date enregistrée est invalide. Sélectionne à nouveau ta date de naissance.",
          );
        }
      }
    } catch {
      setMessage(
        "Impossible de lire la date enregistrée. Tu peux utiliser le calendrier pour cette visite.",
      );
    }

    try {
      const savedHorizon = window.localStorage.getItem(HORIZON_STORAGE_KEY);

      if (savedHorizon !== null) {
        const value = Number(savedHorizon);

        if (isValidHorizon(value)) {
          setHorizon(value);
          setHorizonMessage("Horizon enregistré sur cet appareil");
        } else {
          setHorizonMessage(
            "L’horizon enregistré est invalide. Le calendrier revient à 90 ans.",
          );
        }
      }
    } catch {
      setHorizonMessage(
        "Impossible de lire l’horizon enregistré. Tu peux choisir un horizon pour cette visite.",
      );
    }

    setReady(true);
  }, []);

  function saveBirthDate(value: string) {
    if (!isValidBirthDate(value)) {
      setMessage(
        "Choisis une date de naissance valide, du 1er janvier 1900 à aujourd’hui.",
      );

      return;
    }

    setBirthDate(value);
    setClearMessage("");

    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      setMessage("Enregistrée sur cet appareil");
    } catch {
      setMessage(
        "Impossible d’enregistrer ta date sur cet appareil. Le calendrier reste utilisable pour cette visite.",
      );
    }
  }

  function saveHorizon(value: number) {
    if (!isValidHorizon(value)) return;

    setHorizon(value);
    setClearMessage("");

    try {
      window.localStorage.setItem(HORIZON_STORAGE_KEY, String(value));
      setHorizonMessage("Horizon enregistré sur cet appareil");
    } catch {
      setHorizonMessage(
        "Impossible d’enregistrer ton horizon sur cet appareil. Ce choix reste actif pour cette visite.",
      );
    }
  }

  function clearSettings() {
    setBirthDate(null);
    setHorizon(NUMBER_OF_YEARS_BY_LIFE);
    setMessage("");
    setHorizonMessage("");
    let cleared = true;

    for (const key of [STORAGE_KEY, HORIZON_STORAGE_KEY]) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        cleared = false;
      }
    }
    setClearMessage(
      cleared
        ? "Tes données ont été effacées de cet appareil."
        : "L’effacement n’a pas pu être confirmé. Des données peuvent réapparaître après rechargement. Tu peux réessayer.",
    );
  }

  return {
    birthDate,
    saveBirthDate,
    horizon,
    saveHorizon,
    clearSettings,
    message,
    horizonMessage,
    clearMessage,
    ready,
  };
}
