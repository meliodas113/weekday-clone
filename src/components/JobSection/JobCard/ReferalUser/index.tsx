import { Box } from "@mui/material";
import "./styles.scss";

import { ReferralUserProps } from "../../../../types";
import FluidImage from "../../../common/FluidImage";

const ReferralUser = (props: ReferralUserProps) => {
  return (
    <Box className="ReferralBtn-Image">
      {props.isOnline && <Box className="Online-Dot"></Box>}
      <FluidImage src={props.image} />
    </Box>
  );
};

export default ReferralUser;
