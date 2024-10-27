import React from "react";
import { HelperTextProps, HelperTextStyleProps } from "./HelperText.types";
import { HelperTextStyle } from ".";
import { InfoIcon, AlertCircleIcon, XCircleIcon } from "@shopify/polaris-icons";

const icons: Record<
  NonNullable<HelperTextProps["variant"]>,
  React.ComponentType
> = {
  default: InfoIcon,
  error: XCircleIcon,
  warning: AlertCircleIcon,
};

const HelperText: React.FC<HelperTextProps> = (props) => {
  const { variant = "default", hideIcon, children, text, ...baseProps } = props;
  const styled: HelperTextStyleProps = {
    $variant: variant,
  };
  const Icon = icons[variant];

  return (
    <>
      {text ||
        (children && (
          <HelperTextStyle {...styled} {...baseProps}>
            {!hideIcon && <Icon />}
            {text ?? children}
          </HelperTextStyle>
        ))}
    </>
  );
};

export { HelperText };
