import { styled } from "styled-components";
import { HelperTextStyleProps } from "./HelperText.types";

const HelperTextStyle = styled.span<HelperTextStyleProps>`
  color: ${({ $variant }) => {
    return {
      default: "#6B6B6B",
      error: "#FF4B4B",
      success: "#B28D39",
      warning: "#FFA057",
    }[$variant];
  }};
  display: "block";
  font-weight: 400;
  font-family: 0.5rem;
`;

export { HelperTextStyle };
