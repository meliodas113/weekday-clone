import { Box } from "@mui/material";
import "./styles.scss";

import { CustomButtonsProps } from "../../../types";

const CustomButtons = (props: CustomButtonsProps) => {
  return (
    <Box
      style={{
        width: props.width,
        height: props.height,
        background: props.color,
        color:props.ctaColor
      }}
      className="CustomButtons"
      onClick={props.onClick}
    >  
      {props.children}
      {props.cta}
    </Box>
  );
};

export default CustomButtons;
