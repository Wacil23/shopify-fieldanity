import { BaseComponentModel } from "app/types/Base/BaseComponentType";
import { StylableProps } from "app/types/Base/StylableProps";

type HelperTextProps = React.PropsWithChildren<
  BaseComponentModel & {
    text?: string | React.ReactNode;
    variant?: "default" | "warning" | "error";
    hideIcon?: boolean;
  }
>;

type HelperTextStyleProps = StylableProps<HelperTextProps, "variant", never>;

export { type HelperTextProps, type HelperTextStyleProps };
