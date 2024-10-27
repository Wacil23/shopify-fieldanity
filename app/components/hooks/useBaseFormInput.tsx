import { BaseComponentModel } from "app/types/Base/BaseComponentType";
import { FormFieldInputProps } from "app/types/Form/FormField.interface";
import { clsx } from "app/utils/clsx";

const useFormInput = (props: FormFieldInputProps<BaseComponentModel>) => {
  return {
    className: clsx(props.className, {
      disabled: props.disabled,
      error: !!props.error,
    }),
  };
};

export { useFormInput };
