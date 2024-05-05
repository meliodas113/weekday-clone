import { useState } from "react";
import "./styles.scss";

import { Box } from "@mui/material";

import {
  generateRandomNumber,
} from "../../../constants/constants";
import REF_MALE from "../../../assets/ref-male.jpeg";
import REF_FEMALE from "../../../assets/ref-female.jpeg";

import { JobCardProps } from "../../../types";
import ReferralUser from "./ReferalUser";
import FluidImage from "../../common/FluidImage";
import JobDetailsModal from "./JobDetailsModal";

const JobCard = (props: JobCardProps) => {
  /**
   * Logic to operate job description modal.
   */
  const [openJobDetailsModal, setJobDetailsOpen] = useState(false);
  const handleOpenJobModal = () => setJobDetailsOpen(true);
  const handleCloseJobModal = () => setJobDetailsOpen(false);

  /**
   * Check min and max salary and return formatted string to display.
   * @returns Estimated salary formatted string.
   */
  const getEstimatedSalary = (): string => {
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
  const getExperience = (): string => {
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
      <Box className="JobCard-TimeLabel">
        ⌛ Posted {`${generateRandomNumber()}`}d ago
      </Box>
      <Box className="JobCard-DetailsWrapper">
        <Box className="JobCard-Logo">
          <FluidImage src={props.image} />
        </Box>
        <Box className="JobCard-DetailsContainer">
          <span className="Name">{props.name}</span>
          <span className="Designatiom">{props.role}</span>
          <span className="Loaction">{props.location}</span>
        </Box>
      </Box>
      <Box className="JobCard-EstSalary">
        Estimated Salary: {getEstimatedSalary()} ✅
      </Box>
      <Box className="JobCard-JobDescription">
        <Box className="BackDrop">
          <span className="BackDrop-Text" onClick={handleOpenJobModal}>
            Show more.
          </span>
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
          ⚡ Apply
        </Box>
        <Box className="ReferralBtn">
          <ReferralUser image={REF_MALE} isOnline={true} />
          <ReferralUser image={REF_FEMALE} isOnline={false} />
          Ask for Referral
        </Box>
      </Box>
      <JobDetailsModal
        open={openJobDetailsModal}
        handleCloseModal={handleCloseJobModal}
        body={props.description}
      />
    </Box>
  );
};

export default JobCard;
