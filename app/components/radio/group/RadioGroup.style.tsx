import { styled, css } from "styled-components";

import { StylableRadioGroupProps } from "./RadioGroup.types";
import { HelperText } from "app/components/helper-text";

const RadioGroupStyle = styled.div<StylableRadioGroupProps>`
  display: flex;
  ${({ $inline }) =>
    $inline
      ? css`
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;

          ${RadioGroupHelperTextStyle} {
            width: 100%;
            margin: 0;
          }
        `
      : css`
          flex-direction: column;
        `}
  & > .label {
    font-weight: 500;
    margin-bottom: ${({ $inline }) => ($inline ? 0 : "0.5rem")};
  }
`;

const RadioGroupHelperTextStyle = styled(HelperText)`
  margin-top: 0.25rem;
`;

export { RadioGroupStyle, RadioGroupHelperTextStyle };
