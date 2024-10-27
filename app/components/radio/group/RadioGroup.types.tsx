import { FormFieldInputProps } from "app/types/Form/FormField.interface";
import { type RadioProps } from "../Radio.types";
import { BaseComponentModel } from "app/types/Base/BaseComponentType";
import { HelperTextProps } from "app/components/helper-text";
import { StylableProps } from "app/types/Base/StylableProps";

type RadioGroupItemProps = Pick<
  RadioProps,
  "value" | "label" | "aria-label"
> & {
  /** Radio group item key */
  key?: string;
};

type RadioGroupProps = FormFieldInputProps<
  BaseComponentModel & {
    /** Radio group options */
    options: RadioGroupItemProps[];
    hint?: string | HelperTextProps;
    inline?: boolean;
  }
>;

type StylableRadioGroupProps = StylableProps<RadioGroupProps, "inline", never>;

export type { RadioGroupProps, StylableRadioGroupProps };
