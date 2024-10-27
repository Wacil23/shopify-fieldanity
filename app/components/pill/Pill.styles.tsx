import { styled } from "styled-components";

const PillStyle = styled.label<{
  $checked?: boolean;
  $disabled?: boolean;
  $isGroupActive?: boolean;
}>`
  display: inline-block;
  padding: ${({ $isGroupActive }) =>
    $isGroupActive ? "0.5rem 0.25rem" : "0.5rem 0"};
  border: 1px solid transparent;
  border-radius: 20px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  color: ${({ $checked }) => ($checked ? "white" : "initial")};
  transition: all 0.4s ease;
  @media (min-width: 767px) {
    padding: ${
      ({ $isGroupActive }) =>
        $isGroupActive
          ? "0.5rem 0.25rem" // TODO: TO Customize
          : "0.75rem 0" // TODO: TO Customize
    };
  }
  .pill-label {
    padding: 0.5rem 0.25rem; // TODO: TO Customize
    background: ${
      ({ $isGroupActive, $checked }) =>
        $isGroupActive
          ? "none"
          : $checked
            ? "black" // TODO: To Customize
            : "#f1F1F1" // TODO: To Customize
    };
    border-radius: 20px;
    &:hover {
      background: ${
        ({ $isGroupActive }) => ($isGroupActive ? "none" : " #D6D6D6") // TODO: To Customize
      };
    }
    &:active {
      background: ${
        ({ $isGroupActive }) => ($isGroupActive ? "none" : "black") // TODO: To Customize
      };
      color: ${
        ({ $isGroupActive }) => ($isGroupActive ? "none" : "white") // TODO: To Customize
      };
    }
  }
`;

export { PillStyle };
