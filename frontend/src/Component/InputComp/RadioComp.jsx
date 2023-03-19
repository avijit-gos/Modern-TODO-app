/** @format */

import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

const RadioComp = ({ value, setValue, title }) => {
  return (
    <React.Fragment>
      <RadioGroup onChange={setValue} value={value} defaultValue='1'>
        <Radio value={value}>{title}</Radio>
      </RadioGroup>
    </React.Fragment>
  );
};

export default RadioComp;
