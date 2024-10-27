import {
  BlockStack,
  Button,
  Text,
  Icon,
  TextField,
  Checkbox,
  InlineStack,
  Modal,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { BsInputCursorText } from "react-icons/bs";
import { CgPill } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
import { IoReorderFourOutline } from "react-icons/io5";
import { MdDelete, MdOutlineAlternateEmail } from "react-icons/md";
import { useState } from "react";
import "./OptionsConfig.styles.css";

export type FieldType = "text" | "number" | "radio" | "email";

export type OptionValue = {
  title: string;
  addOnPrice?: number;
  defaultValue?: boolean;
};

export type Fields = {
  id: number;
  label: string;
  type: FieldType;
  options: OptionValue[]; // Liste des valeurs pour les options multiples
};

type OptionConfigProps = {
  fields: Fields[];
  setFields: React.Dispatch<React.SetStateAction<Fields[]>>;
};

const OptionsConfig: React.FC<OptionConfigProps> = ({ fields, setFields }) => {
  const [editFieldIndex, setEditFieldIndex] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const icons = {
    text: BsInputCursorText,
    number: GoNumber,
    radio: CgPill,
    email: MdOutlineAlternateEmail,
  };

  // Activer l'édition pour un champ donné
  const openEditField = (index: number) => {
    setEditFieldIndex(index);
    setIsEditModalOpen(true);
  };

  // Ajouter une nouvelle valeur d'option
  const addOptionValue = () => {
    if (editFieldIndex === null) return;
    const updatedFields = [...fields];
    updatedFields[editFieldIndex].options.push({
      title: "",
      addOnPrice: 0,
      defaultValue: false,
    });
    setFields(updatedFields);
  };

  // Mettre à jour une valeur d'option
  const updateOptionValue = (optionIndex: number, key: string, value: any) => {
    if (editFieldIndex === null) return;
    const updatedFields = [...fields];
    updatedFields[editFieldIndex].options[optionIndex] = {
      ...updatedFields[editFieldIndex].options[optionIndex],
      [key]: value,
    };
    setFields(updatedFields);
  };

  // Supprimer une valeur d'option
  const deleteOptionValue = (optionIndex: number) => {
    if (editFieldIndex === null) return;
    const updatedFields = [...fields];
    updatedFields[editFieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };
  const handleDeleteField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditFieldIndex(null);
  };

  const openModal = () => shopify.modal.show("my-modal");

  return (
    <BlockStack gap="200">
      <Text as="h2" fontWeight="bold">
        Vos options
      </Text>
      <div className="options">
        {fields.map((field, fieldIndex) => (
          <div key={field.id} className="options__container">
            <div className="options__title">
              <Icon source={icons[field.type]} />
              <p className="options__title-label">{field.label}</p>
            </div>
            <div className="options__actions">
              <IoReorderFourOutline size={18} />
              <CiEdit size={18} onClick={() => openEditField(fieldIndex)} />
              <MdDelete
                onClick={() => handleDeleteField(fieldIndex)}
                size={18}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        size="medium"
        icon={PlusIcon}
        onClick={() => openModal()}
        variant="secondary"
      >
        Créer une option
      </Button>

      {isEditModalOpen && editFieldIndex !== null && (
        <Modal
          open={isEditModalOpen}
          onClose={closeModal}
          title="Éditer les valeurs de l'option"
        >
          <BlockStack gap="400">
            {fields[editFieldIndex].options.map((option, optionIndex) => (
              <InlineStack key={optionIndex} gap="200">
                <TextField
                  autoComplete="off"
                  label="Titre"
                  value={option.title}
                  onChange={(value) =>
                    updateOptionValue(optionIndex, "title", value)
                  }
                />
                <TextField
                  autoComplete="off"
                  label="Prix additionnel"
                  type="number"
                  value={option.addOnPrice?.toString() || ""}
                  onChange={(value) =>
                    updateOptionValue(
                      optionIndex,
                      "addOnPrice",
                      parseFloat(value),
                    )
                  }
                />
                <Checkbox
                  label="Par défaut"
                  checked={option.defaultValue || false}
                  onChange={(checked) =>
                    updateOptionValue(optionIndex, "defaultValue", checked)
                  }
                />
                <Button
                  icon={MdDelete}
                  onClick={() => deleteOptionValue(optionIndex)}
                />
              </InlineStack>
            ))}
            <Button onClick={addOptionValue} icon={PlusIcon}>
              Ajouter une valeur
            </Button>
          </BlockStack>
        </Modal>
      )}
    </BlockStack>
  );
};

export default OptionsConfig;
