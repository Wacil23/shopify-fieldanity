import {
  Card,
  TextField,
  BlockStack,
  Text,
  SkeletonBodyText,
  SkeletonThumbnail,
} from "@shopify/polaris";
import { ButtonATC } from "app/components/App/button-atc/ButtonATC";
import { PillGroup } from "app/components/pill/group/PillGroup";
import { Form, Formik } from "formik";
import { Fields } from "../options-config/OptionsConfig";

type PreviewProps = {
  fields: Fields[];
};

interface PreviewFormInterface {
  email: string;
  pills: string[];
  text: string;
}

const Preview: React.FC<PreviewProps> = ({ fields }) => {
  const initialValues: PreviewFormInterface = {
    email: "",
    pills: [],
    text: "",
  };
  return (
    <BlockStack gap="1000">
      <Card>
        <BlockStack gap="500">
          <Text as="h2" fontWeight="medium">
            Prévisualisation
          </Text>
          <SkeletonThumbnail />
          <SkeletonBodyText />
          <Formik onSubmit={() => console.log()} initialValues={initialValues}>
            <Form>
              {fields.map((field) => (
                <BlockStack key={field.id} gap="200">
                  {field.type === "text" && (
                    <TextField
                      name="text"
                      autoComplete="off"
                      label={field.label}
                    />
                  )}
                  {field.type === "email" && (
                    <TextField
                      value=""
                      autoComplete="off"
                      name="email"
                      label={field.label}
                    />
                  )}
                  {field.type === "radio" && (
                    <PillGroup
                      options={[
                        { value: "Monsieur", label: "Monsieur" },
                        { value: "Madame", label: "Madame" },
                      ]}
                      label={field.label}
                      name={field.label}
                      value="Monsieur"
                    />
                  )}
                </BlockStack>
              ))}
            </Form>
          </Formik>
          <ButtonATC label="Ajouter au panier" />
        </BlockStack>
      </Card>
    </BlockStack>
  );
};

export default Preview;
