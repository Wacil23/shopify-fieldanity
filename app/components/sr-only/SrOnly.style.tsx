import { hideVisually } from "app/utils/polished";
import { styled } from "styled-components";

const SrOnlyStyle = styled.span`
  ${hideVisually()}
`;

export { SrOnlyStyle };
