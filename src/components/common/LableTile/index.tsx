import { Box } from "@mui/material";
import "./styles.scss";

type Props = {
  width: string;
  labelContent: string;
};

const LableTile = (props: Props) => {
  return (
    <Box style={{ width: props.width }} className="LableTile">
      {props.labelContent}
    </Box>
  );
};

export default LableTile;
