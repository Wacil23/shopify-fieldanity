import { useFormInput } from "app/components/hooks/useBaseFormInput";
import { Radio } from "../Radio";
import { RadioGroupHelperTextStyle, RadioGroupStyle } from "./RadioGroup.style";
import { type RadioGroupProps } from "./RadioGroup.types";
import { useRadioGroup } from "./useRadioGroup";
import { HelperTextProps } from "app/components/helper-text";

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    name,
    value,
    disabled,
    required,
    formIdentifier,
    error,
    hint,
    inline,
  } = props;
  const { ...baseProps } = useFormInput(props);
  const radioGroupProps = useRadioGroup(props);

  const items = props.options.map((option) => (
    <Radio
      key={option.key || option.value}
      label={option.label}
      aria-label={option["aria-label"]}
      value={option.value}
      checked={value?.toString?.() === option.value?.toString?.()}
      disabled={disabled}
      name={name}
      onChange={props.onChange}
      required={required}
      error={error}
      formIdentifier={formIdentifier}
    />
  ));

  const id = formIdentifier ? `${formIdentifier}-${name}` : name;
  const errorId = `error-${id}`;
  const hintId = `hint-${id}`;

  const renderHelperText = () => {
    const showError = props.error;
    let helperTextProps: HelperTextProps = {};
    if (showError) {
      helperTextProps = {
        id: errorId,
        text: typeof error === "object" ? (error as any).label : error,
        variant: "error",
      };
    } else if (hint) {
      if (typeof hint === "string") {
        helperTextProps = {
          id: hintId,
          text: hint,
          variant: "default",
        };
      } else {
        helperTextProps = {
          id: hintId,
          ...hint,
        };
      }
    }
    return (
      <RadioGroupHelperTextStyle
        key={`helper-text-${id}`}
        {...helperTextProps}
      />
    );
  };

  const styled = {
    $inline: inline || false,
  };

  return (
    <RadioGroupStyle {...baseProps} {...radioGroupProps} {...styled}>
      <span className="label" id={radioGroupProps["aria-labelledby"]}>
        {props.label}
      </span>
      <div className="options">{items}</div>
      {renderHelperText()}
    </RadioGroupStyle>
  );
};

export { RadioGroup };
