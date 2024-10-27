import { PropsWithChildren } from "react";
import { SrOnlyStyle } from "./SrOnly.style";

type SrOnlyProps = PropsWithChildren<{
  content?: string | JSX.Element;
}>;

const SrOnly: React.FC<SrOnlyProps> = (props) => {
  return <SrOnlyStyle>{props.content || props.children}</SrOnlyStyle>;
};

export { SrOnly };
