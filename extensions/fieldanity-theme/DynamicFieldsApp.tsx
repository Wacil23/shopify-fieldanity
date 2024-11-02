import DynamicFields from "../../app/components/App/dynamic-fields/DynamicFields";
import { createRoot } from "react-dom/client";

async function renderDynamicFields(productId: string, containerId: string) {
  console.log("shopify", shopify);
  try {
    const response = await fetch(
      `https://cursor-trap-roses-improve.trycloudflare.com/api/products/${productId}`,
    );
    if (!response.ok) throw new Error("Erreur lors de l'appel API");

    const data = await response.json();
    const optionSets = data.optionSets;
    const container = document.getElementById(containerId);
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <DynamicFields optionSets={optionSets} />
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Erreur lors du chargement des options :", error);
    document.getElementById(containerId)!.innerHTML =
      "Erreur lors du chargement des options.";
  }
}

export { renderDynamicFields };
