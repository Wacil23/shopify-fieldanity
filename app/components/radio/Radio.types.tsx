import { BaseComponentModel } from "app/types/Base/BaseComponentType";
import { FormFieldInputProps } from "app/types/Form/FormField.interface";

type RadioProps = FormFieldInputProps<BaseComponentModel> & {
  parentRef?: React.RefObject<HTMLElement> | undefined;
};

export type { RadioProps };
