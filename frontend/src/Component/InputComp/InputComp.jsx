/** @format */

import { Input } from "@chakra-ui/react";
import React from "react";

const InputComp = ({
  type,
  placaeholder,
  className,
  value,
  handleChange,
  id,
}) => {
  return (
    <Input
      type={type}
      placeholder={placaeholder}
      className={className}
      value={value}
      onChange={handleChange}
      id={id}
    />
  );
};

export default InputComp;
