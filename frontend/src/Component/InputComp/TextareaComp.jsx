/** @format */

import React from "react";
import { Textarea } from "@chakra-ui/react";
const TextareaComp = ({ placeholder, className, value, handleChange }) => {
  return (
    <div>
      <Textarea
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextareaComp;
