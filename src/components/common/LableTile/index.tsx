import { Box } from "@mui/material";
import "./styles.scss";

import { LableTileProps } from "../../../types";


const LableTile = (props: LableTileProps) => {
  return (
    <Box style={{ width: props.width }} className="LableTile">
      {props.labelContent}
    </Box>
  );
};

export default LableTile;
