import { EmptyState } from "@shopify/polaris";

const EmptyOptions = () => {
  const openModal = () => {
    shopify.modal.show("my-modal");
  };
  return (
    <EmptyState
      heading="Vous n'avez aucune option..."
      action={{
        content: "Créer une option",
        onAction: () => openModal(),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Pourquoi ne pas en créer un dès maintenant ?</p>
    </EmptyState>
  );
};

export default EmptyOptions;
