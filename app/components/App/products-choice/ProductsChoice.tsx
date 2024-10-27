import {
  Autocomplete,
  BlockStack,
  ResourceList,
  Text,
  Image,
  InlineStack,
  InlineGrid,
} from "@shopify/polaris";
import { useState } from "react";
import { ProductType } from "app/types/Product/Product.interface";
import ModalProducts from "../modal/products/ModalProducts";
import { BiSearch } from "react-icons/bi";

type ProductChoiceProps = {
  products: ProductType[];
  onSelectionChange: (selectedProducts: ProductType[]) => void;
  selectedProducts: ProductType[];
};

const ProductsChoice: React.FC<ProductChoiceProps> = ({
  products,
  onSelectionChange,
  selectedProducts,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const textField = (
    <Autocomplete.TextField
      label
      onFocus={openModal}
      value=""
      prefix={<BiSearch width={10} />}
      placeholder="Cliquez pour rechercher des produits"
      autoComplete="off"
    />
  );

  return (
    <BlockStack gap="400">
      <Text fontWeight="bold" as="p">
        Produits sélectionnés :
      </Text>
      <Autocomplete
        options={[]}
        selected={[]}
        textField={textField}
        onSelect={() => {}}
      />
      <ResourceList
        resourceName={{ singular: "produit", plural: "produits" }}
        items={selectedProducts}
        renderItem={(item) => {
          const { id, title, media } = item;
          const { nodes: img } = media;
          return (
            <InlineGrid key={id} columns={{ xs: 1 }} alignItems="start">
              <InlineStack blockAlign="center" align="start" gap="400">
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
            </InlineGrid>
          );
        }}
      />
      <ModalProducts
        open={modalOpen}
        onClose={closeModal}
        products={products}
        selectedProducts={selectedProducts}
        onSelectionChange={onSelectionChange}
      />
    </BlockStack>
  );
};

export default ProductsChoice;
