/** @format */

import { Button, Spinner } from "@chakra-ui/react";
import React from "react";

const ButtonComp = ({
  title,
  className,
  disableClassName,
  isLoading,
  isDisable,
  clickHandle,
}) => {
  return (
    <Button
      className={isDisable ? disableClassName : className}
      onClick={clickHandle}>
      {isLoading ? <Spinner /> : <>{title}</>}
    </Button>
  );
};

export default ButtonComp;
