import {
  Page,
  Card,
  TextField,
  InlineGrid,
  BlockStack,
  Badge,
  Text,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import EmptyOptions from "app/components/App/empty-options/EmptyOptions";
import OptionsConfig, {
  Fields,
} from "app/components/App/options-config/OptionsConfig";
import Preview from "app/components/App/preview/Preview";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { authenticate } from "app/shopify.server";
import { ProductType } from "app/types/Product/Product.interface";
import ProductsChoice from "app/components/App/products-choice/ProductsChoice";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ModalOptions, {
  FieldProps,
} from "app/components/App/modal/options/ModalOptions";
import { SaveBar } from "@shopify/app-bridge-react";
import { createOrUpdateOptionSet } from "app/graphql/mutations";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`
  #graphql
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              media(first: 1) {
                nodes {
                  preview{
                    image{
                      altText
                      id
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);
  const { data: responseJson } = await response.json();
  const products: ProductType[] = responseJson.products.edges.map(
    (edge: { node: ProductType }) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      media: edge.node.media,
      selected: false,
    }),
  );
  return json({ products });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const optionSetData = JSON.parse(formData.get("optionSetData") as string);

  // Utiliser Prisma pour créer ou mettre à jour les données
  await createOrUpdateOptionSet(optionSetData);

  return redirect("/app");
};

const NewFormPage = () => {
  const { products } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const [title, setTitle] = useState("Nouveau template");
  const [fields, setFields] = useState<Fields[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [showSaveBar, setShowSaveBar] = useState(false);

  const addField = (field: FieldProps) => {
    setFields((prevFields) => [
      ...prevFields,
      {
        id: Date.now(),
        label: field.label,
        type: field.type,
        icon: field.icon,
        options: [],
      },
    ]);
    shopify.modal.hide("my-modal");
  };

  const handleSave = () => {
    setShowSaveBar(false);
    const optionSetData = {
      name: title,
      required: false,
      products: selectedProducts.map((product) => ({
        productId: product.id,
        title: product.title,
      })),
      options: fields.map((field) => ({
        label: field.label,
        type: field.type,
        cartName: "cart name", // à adapter selon votre besoin
        values: field.options?.map((value) => ({
          title: value.title,
          addOnPrice: value.addOnPrice,
          defaultValue: value.defaultValue,
        })),
      })),
    };

    // Envoyer les données via fetcher
    fetcher.submit(
      { optionSetData: JSON.stringify(optionSetData) },
      { method: "post", action: "/app/save" },
    );
  };

  const handleDiscard = () => {
    setSelectedProducts([]);
    setFields([]);
    setShowSaveBar(false);
  };

  useEffect(() => {
    setShowSaveBar(selectedProducts.length > 0 && fields.length > 0);
  }, [selectedProducts, fields]);

  const onShowSaveBar = () => setShowSaveBar(true);
  const onHideSaveBar = () => setShowSaveBar(false);

  return (
    <Page
      title={title || "Nouveau Template"}
      titleMetadata={<Badge tone="info">Non sauvegardé</Badge>}
      compactTitle
    >
      <SaveBar open={showSaveBar} onShow={onShowSaveBar} onHide={onHideSaveBar}>
        <button variant="primary" onClick={handleSave}></button>
        <button onClick={handleDiscard}></button>
      </SaveBar>

      <InlineGrid columns={{ xs: 1, md: "3fr 1fr" }} gap="400">
        <BlockStack gap="400">
          {/* Title options set */}
          <Card>
            <BlockStack>
              <TextField
                autoComplete=""
                label="Titre"
                value={title}
                onChange={(value) => setTitle(value)}
              />
            </BlockStack>
          </Card>
          {/* Option config */}
          <Card>
            <BlockStack gap="400">
              {fields.length > 0 ? (
                <OptionsConfig fields={fields} setFields={setFields} />
              ) : (
                <EmptyOptions />
              )}
            </BlockStack>
          </Card>
          {/* Products */}
          <Card>
            <ProductsChoice
              products={products}
              selectedProducts={selectedProducts}
              onSelectionChange={setSelectedProducts}
            />
          </Card>
        </BlockStack>
        {/* Preview */}
        <Preview fields={fields} />
        <ModalOptions addField={addField} />
      </InlineGrid>
    </Page>
  );
};

export default NewFormPage;
