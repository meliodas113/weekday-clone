import { useState } from "react";
import "./styles.scss";

import { Box, Modal, Typography } from "@mui/material";

type Props = {
  name: string;
  role: string;
  location: string;
  link: string;
  description: string;
  image: string;
  currency: string;
  minExp?: number;
  maxExp?: number;
  minSalary?: number;
  maxSalary?: number;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline:'none',
    borderRadius:'10px',
    p: 4,
  };

const JobCard = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /**
   * Check min and max salary and return formatted string to display.
   * @returns Estimated salary formatted string.
   */
  const getEstimatedSalary = () => {
    if (props.minSalary && props.maxSalary) {
      return `${props.currency} ${props.minSalary}K - ${props.currency} ${props.maxSalary}K`;
    }
    if (props.minSalary) {
      return `${props.currency} ${props.minSalary}K`;
    }
    return `${props.currency} ${props.maxSalary}K`;
  };

  /**
   * Check min and max exp and return formatted string to display.
   * @returns Exp required formatted string.
   */
  const getExperience = () => {
    if (props.minExp && props.maxExp) {
      return `${props.minExp} - ${props.maxExp} years`;
    }
    if (props.minExp) {
      return `${props.minExp} years`;
    }
    if (props.maxExp) {
      return `${props.maxExp}years`;
    }

    return "Not Specified";
  };

  /**
   * Open the job url in new tab.
   */
  const openJobLink = () => {
    window.open(props.link, "target:blank");
  };

  return (
    <Box className="JobCard">
      <Box className="JobCard-TimeLabel">Posted 1d ago ⏰</Box>
      <Box className="JobCard-DetailsWrapper">
        <Box className="JobCard-Logo">
          <img
            src={props.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="weekday"
          />
        </Box>
        <Box className="JobCard-DetailsContainer">
          <span className="Name">{props.name}</span>
          <span className="Designatiom">{props.role}</span>
          <span className="Loaction">{props.location}</span>
        </Box>
      </Box>
      <Box className="JobCard-EstSalary">
        Estimated Salary: {getEstimatedSalary()} 💰
      </Box>
      <Box className="JobCard-JobDescription">
        <Box className="BackDrop">
          <span className="BackDrop-Text" onClick={handleOpen}>Show more.</span>
        </Box>
        <Box className="JobCard-DescriptionTitle">About Company:</Box>
        <Box className="JobCard-DescriptionText">{props.description}</Box>
      </Box>
      <Box className="JobCard-MinExpWrapper">
        <span className="MinExpHeading">Minimum Experience</span>
        <span className="MinExpValue">{getExperience()}</span>
      </Box>
      <Box className="Btn-Container">
        <Box className="ApplyBtn" onClick={openJobLink}>
          Apply 🚀
        </Box>
        <Box className="ReferralBtn">Ask for Referral</Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            About this job:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.description}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default JobCard;
