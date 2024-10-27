import React from "react";

import { PillGroupProps } from "./PillGroup.types";
import Pill from "../Pill";
import { PillGroupStyle } from "./PillGroup.styles";
import { useRadioGroup } from "../../radio/group/useRadioGroup";
import { useFormInput } from "app/components/hooks/useBaseFormInput";
import { useResizeWindowObserver } from "app/components/hooks/useResizeWindowObserver";

const PillGroup: React.FC<PillGroupProps> = (props) => {
  const [left, setLeft] = React.useState<string>("-999999px");
  const [width, setWidth] = React.useState<string>("0px");
  const groupRef = React.useRef<HTMLDivElement>(null);
  const baseProps = useFormInput(props);
  const radioGroupProps = useRadioGroup(props);
  const updateIndicatorPosition = () => {
    const selectedPill = groupRef.current?.querySelector(
      '[data-checked="true"]',
    );
    if (selectedPill) {
      const { offsetLeft, offsetWidth } = selectedPill as HTMLElement;
      setWidth(`${offsetWidth}px`);
      setLeft(`${offsetLeft}px`);
    }
  };
  useResizeWindowObserver(groupRef, updateIndicatorPosition);

  const renderOptions = () =>
    props.options.map((option) => (
      <div
        key={option.key || option.value}
        ref={groupRef}
        data-checked={props.value === option.value ? "true" : "false"}
      >
        <Pill
          aria-label={option["aria-label"]}
          required={props.required}
          error={props.error}
          formIdentifier={props.formIdentifier}
          label={option.label}
          key={option.key || option.value}
          name={props.name}
          value={option.value}
          disabled={props.disabled}
          checked={props.value === option.value}
          onChange={props.onChange}
          isGroupActive={!!option}
        />
      </div>
    ));

  return (
    <PillGroupStyle {...baseProps} {...radioGroupProps}>
      <span className="label" id={radioGroupProps["aria-labelledby"]}>
        {props.label}
      </span>
      <div ref={groupRef} className="pill-group">
        {left && (
          <div className="background-indicator" style={{ left, width }} />
        )}
        {renderOptions()}
      </div>
    </PillGroupStyle>
  );
};

export { PillGroup };
