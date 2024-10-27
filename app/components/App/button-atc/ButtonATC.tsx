import React from "react";
import "./ButtonATC.styles.css";
type ButttonATCProps = {
  label: string;
};

export const ButtonATC: React.FC<ButttonATCProps> = ({ label }) => {
  return <button className="btn">{label}</button>;
};
