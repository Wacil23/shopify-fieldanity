import { Modal, TitleBar } from "@shopify/app-bridge-react";
import "./ModalProducts.styles.css";
import { ProductType } from "app/types/Product/Product.interface";
import {
  Checkbox,
  Image,
  InlineStack,
  Text,
  Button,
  Divider,
} from "@shopify/polaris";
import { useEffect, useState } from "react";

type ModalProductsProps = {
  open: boolean;
  onClose: () => void;
  products: ProductType[];
  onSelectionChange: (selectedProducts: ProductType[]) => void;
  selectedProducts: ProductType[];
};

const ModalProducts: React.FC<ModalProductsProps> = ({
  open,
  onClose,
  products,
  onSelectionChange,
  selectedProducts,
}) => {
  const [localSelectedProducts, setLocalSelectedProducts] = useState<
    ProductType[]
  >([]);

  // Synchroniser localSelectedProducts avec selectedProducts chaque fois que la modal s'ouvre
  useEffect(() => {
    if (open) {
      setLocalSelectedProducts(selectedProducts);
    }
  }, [open, selectedProducts]);

  const handleProductToggle = (id: string) => {
    setLocalSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.some((product) => product.id === id);
      if (isSelected) {
        return prevSelected.filter((product) => product.id !== id);
      } else {
        const selectedProduct = products.find((product) => product.id === id);
        return selectedProduct
          ? [...prevSelected, selectedProduct]
          : prevSelected;
      }
    });
  };

  const handleSaveSelection = () => {
    onSelectionChange(localSelectedProducts);
    onClose();
  };

  return (
    <Modal id="product-modal" variant="base" open={open} onHide={onClose}>
      <TitleBar title="Sélectionner des produits" />
      <div className="modal__products">
        {products.map((product) => {
          const { id, title, media } = product;
          const isSelected = localSelectedProducts.some((p) => p.id === id);
          const { nodes: img } = media;
          return (
            <InlineStack blockAlign="center" align="start" gap="150" key={id}>
              <Checkbox
                label=""
                checked={isSelected}
                onChange={() => handleProductToggle(id)}
              />
              {img?.length > 0 && (
                <Image
                  source={img[0]?.preview?.image.url}
                  alt={img[0]?.preview?.image.altText}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "4px",
                  }}
                />
              )}
              <Text as="p">{title}</Text>
            </InlineStack>
          );
        })}
      </div>
      <Divider />
      <div className="modal__options">
        <p>{localSelectedProducts.length} produit(s) sélectionné(s)</p>
        <Button onClick={handleSaveSelection}>Enregistrer</Button>
      </div>
    </Modal>
  );
};

export default ModalProducts;
