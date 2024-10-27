import { useFormInput } from "../hooks/useBaseFormInput";
import { RadioStyle } from "./Radio.style";
import { RadioProps } from "./Radio.types";
import { useRadio } from "./useRadio";

const Radio: React.FC<RadioProps> = (props) => {
  const { ...baseProps } = useFormInput(props);
  const { controlProps, inputProps } = useRadio(props);

  return (
    <RadioStyle {...baseProps} htmlFor={inputProps.id}>
      <span className="input">
        <input {...inputProps} />
        <span className="control" {...controlProps} />
      </span>
      <span className="label" aria-label={props["aria-label"]}>
        {props.label}
      </span>
    </RadioStyle>
  );
};

export { Radio };
