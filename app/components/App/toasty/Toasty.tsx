import { Toast, Frame } from "@shopify/polaris";
import { useState, useCallback } from "react";

export const Toasty = () => {
  const [active, setActive] = useState(true); // Active le toast par défaut

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast
      content="Formulaire(s) supprimé(s) avec succès"
      onDismiss={toggleActive}
    />
  ) : null;

  return <Frame>{toastMarkup}</Frame>;
};
