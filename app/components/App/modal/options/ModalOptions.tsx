import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { BsInputCursorText } from "react-icons/bs";
import { CgPill } from "react-icons/cg";
import { GoNumber } from "react-icons/go";
import "./ModalOptions.styles.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FieldType } from "../../options-config/OptionsConfig";

export type FieldProps = {
  id: number;
  label: string;
  icon: JSX.Element;
  type: FieldType;
};

type ModalOptionsProps = {
  addField: (field: FieldProps) => void;
};

const ModalOptions: React.FC<ModalOptionsProps> = ({ addField }) => {
  const fields: FieldProps[] = [
    {
      id: 1,
      label: "Text box",
      icon: <BsInputCursorText size={16} />,
      type: "text",
    },
    {
      id: 2,
      label: "Number box",
      icon: <GoNumber size={16} />,
      type: "number",
    },
    {
      id: 3,
      label: "Pills",
      icon: <CgPill size={16} />,
      type: "radio",
    },
    {
      id: 4,
      label: "Email",
      icon: <MdOutlineAlternateEmail size={16} />,
      type: "email",
    },
  ];

  return (
    <Modal id="my-modal">
      <TitleBar title="Configuration des options" />
      <div className="modal__boxes">
        {fields.map((field) => {
          return (
            <div
              onClick={() => addField(field)}
              className="modal__box"
              key={field.id}
            >
              {field.icon}
              <div className="modal__box-label">{field.label}</div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ModalOptions;
