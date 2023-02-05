/** @format */

import { Input } from "@chakra-ui/react";
import React from "react";

const InputComp = ({
  type,
  placaeholder,
  className,
  value,
  handleChange,
  onKeyDown,
  id,
}) => {
  return (
    <Input
      type={type}
      placeholder={placaeholder}
      className={className}
      value={value}
      onChange={handleChange}
      onKeyDown={(e) => onKeyDown(e)}
      id={id}
    />
  );
};

export default InputComp;
