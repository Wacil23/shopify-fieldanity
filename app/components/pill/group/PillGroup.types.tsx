import { FormFieldInputProps } from "app/types/Form/FormField.interface";
import { type PillProps } from "../Pill.types";
import { BaseComponentModel } from "app/types/Base/BaseComponentType";

type PillGroupItemProps = Pick<PillProps, "value" | "label" | "aria-label"> & {
  /** Pill group item key */
  key?: string;
};

type PillGroupProps = FormFieldInputProps<
  BaseComponentModel & {
    /** Pill group options */
    options: PillGroupItemProps[];
  }
>;

export type { PillGroupProps };
