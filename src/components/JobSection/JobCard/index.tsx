import "./styles.scss";

import { Box } from "@mui/material";

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

const JobCard = (props: Props) => {
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
    if(props.maxExp){
        return `${props.maxExp}years`;
    }

    return 'Not Specified'
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
          <span className="BackDrop-Text">Show more.</span>
        </Box>
        <Box className="JobCard-DescriptionTitle">About Company:</Box>
        <Box className="JobCard-DescriptionText">{props.description}</Box>
      </Box>
      <Box className="JobCard-MinExpWrapper">
        <span className="MinExpHeading">Minimum Experience</span>
        <span className="MinExpValue">{getExperience()}</span>
      </Box>
      <Box className="Btn-Container">
        <Box className="ApplyBtn">Apply 🚀</Box>
        <Box className="ReferralBtn">Ask for Referral</Box>
      </Box>
    </Box>
  );
};

export default JobCard;
