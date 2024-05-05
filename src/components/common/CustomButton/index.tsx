import { Box } from "@mui/material";
import "./styles.scss";

type Props = {
  cta: string;
  ctaColor:string;
  color: string;
  width: string;
  height: string;
  onClick: () => void;
  children?: JSX.Element;
};

const CustomButtons = (props: Props) => {
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
