import { hideVisually } from "app/utils/polished";
import { styled } from "styled-components";

const RadioStyle = styled.label`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  vertical-align: top;
  background-color: transparent;
  transition:
    background-color 0.2s,
    border-radius 0.2s;
  border-radius: 8px;
  padding: 0.75rem 0.5rem;

  &:hover {
    background-color: #1b1b1b;
  }
  &:has(:focus-visible) {
    outline-offset: 3px;
    outline: 4px solid blue;
    border-radius: 8px;
  }

  .input {
    display: flex;

    input {
      ${hideVisually()}

      + .control {
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 2px solid #1b1b1b;

        background-color: transparent;
        box-shadow: none;
        transition: 0.2s box-shadow;
        margin: 0.125rem;

        &::before {
          content: "";
          transition: 0.2s transform;
          transform: scale(0);
          border-radius: 50%;
          box-shadow: inset 0.5em 0.5em black;
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      &:disabled {
        + .control {
          background-color: "#D6D6D6";
          border-color: "#6B6B6B";
        }
      }

      &:checked {
        + .control {
          display: flex;
          justify-content: center;
          align-items: center;

          &::before {
            transform: scale(1);
          }
        }

        &:disabled {
          + .control {
            opacity: 0.4;
          }
        }
      }
    }
  }

  & > .label {
    margin: 0 0.5rem;
  }

  &.disabled {
    cursor: not-allowed;
  }

  &.error {
    .input {
      input {
        + .control {
          border: 2px solid #ff4b4b;
        }

        &:checked {
          + .control {
            background-color: #ff4b4b;
          }
        }
      }
    }
  }
`;

export { RadioStyle };
