import { useFormInput } from "../hooks/useBaseFormInput";
import { useRadio } from "../radio";
import { SrOnly } from "../sr-only/SrOnly";
import { PillStyle } from "./Pill.styles";
import { PillProps } from "./Pill.types";

const Pill: React.FC<PillProps> = (props) => {
  const { disabled, checked, label, isGroupActive } = props;
  const { ...baseProps } = useFormInput(props);
  const { inputProps } = useRadio(props);
  return (
    <PillStyle
      htmlFor={inputProps.id}
      $disabled={disabled}
      $checked={checked}
      $isGroupActive={isGroupActive}
      {...baseProps}
    >
      <SrOnly>
        <input type="hidden" tabIndex={0} {...inputProps} />
      </SrOnly>
      <span className="pill-label" aria-label={props["aria-label"]}>
        {label}
      </span>
    </PillStyle>
  );
};

export default Pill;
