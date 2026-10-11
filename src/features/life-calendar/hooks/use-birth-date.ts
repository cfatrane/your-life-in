import { useEffect, useState } from "react";

import { format, isValid, parseISO } from "date-fns";

const STORAGE_KEY = "birthDate";

function isValidBirthDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    isValid(parseISO(value)) &&
    value >= "1900-01-01" &&
    value <= format(new Date(), "yyyy-MM-dd")
  );
}

export function useBirthDate() {
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [message, setMessage] = useState("");
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

    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      setMessage("Enregistrée sur cet appareil");
    } catch {
      setMessage(
        "Impossible d’enregistrer ta date sur cet appareil. Le calendrier reste utilisable pour cette visite.",
      );
    }
  }

  function clearBirthDate() {
    setBirthDate(null);

    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setMessage("Ta date a été effacée de cet appareil.");
    } catch {
      setMessage(
        "L’effacement n’a pas pu être confirmé. Ta date peut réapparaître après rechargement.",
      );
    }
  }

  return { birthDate, saveBirthDate, clearBirthDate, message, ready };
}
