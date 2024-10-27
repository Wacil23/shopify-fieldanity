import { keyframes, styled } from "styled-components";

const animationOpacity = keyframes`
    from {
        opacity: 0;
    }
    to {
      opacity: 1;
    }
`;
const PillGroupStyle = styled.div`
  position: relative;
  .pill-group {
    position: relative;
    display: flex;
    width: fit-content;
    border-radius: 20px;
    background: #f1f1f1;
    z-index: 1;
    &:has(:focus-visible) {
      .background-indicator {
        outline-offset: 3px;
        outline: 3px solid blue;
      }
    }
    .background-indicator {
      height: 100%;
      position: absolute;
      bottom: 0;
      border-radius: 20px;
      background: black;
      z-index: -1;
      transition: left 0.3s ease-in-out;
      animation: ${animationOpacity} 0.6s ease-in-out;
    }
  }
  .label {
    display: inline-block;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 0.5rem;
  }
`;

export { PillGroupStyle };
