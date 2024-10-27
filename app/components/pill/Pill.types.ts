import { BaseComponentModel } from "app/types/Base/BaseComponentType";
import { FormFieldInputProps } from "app/types/Form/FormField.interface";

type PillProps = FormFieldInputProps<BaseComponentModel> & {
  parentRef?: React.RefObject<HTMLElement> | undefined;
  isGroupActive?: boolean;
};

export type { PillProps };
