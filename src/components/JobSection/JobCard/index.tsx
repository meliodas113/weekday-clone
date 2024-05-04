import React from "react";
import "./styles.scss";

import { Box } from "@mui/material";

type Props = {};

const JobCard = (props: Props) => {
  return (
    <Box className="JobCard">
      <Box className="JobCard-TimeLabel">Posted 1d ago ⏰</Box>
      <Box className="JobCard-DetailsWrapper">
        <Box className="JobCard-Logo"></Box>
        <Box className="JobCard-DetailsContainer">
          <span className="Name">Glean</span>
          <span className="Designatiom">Legal Counsel</span>
          <span className="Loaction">Gurugram</span>
        </Box>
      </Box>
      <Box className="JobCard-EstSalary">Estimated Salary: ₹14 - 18 LPA 💰</Box>
      <Box className="JobCard-JobDescription">
        <Box className='BackDrop'>
            <span className='BackDrop-Text'>Show more.</span>
        </Box>
        <Box className="JobCard-DescriptionTitle">About Company:</Box>
        <Box className="JobCard-DescriptionText">
          Generative AI powered by search. Glean is the AI-powered work
          assistant— across all your company's data. 🔍 Answers grounded in your
          enterprise knowledge graph. 🔒 Responsible AI for your enterprise. ⚡
          Easy to use, ready to go— right out of the box. About Glean We’re on a
          mission to make knowledge work faster and more humane. We believe that
          AI will fundamentally transform how people work. In the future,
          everyone will work in tandem with expert AI assistants who find
          knowledge, create and synthesize information, and execute work. These
          assistants will free people up to focus on the higher-level, creative
          aspects of their work.
        </Box>
      </Box>
      <Box className='JobCard-MinExpWrapper'>
        <span className="MinExpHeading">Minimum Experience</span>
        <span className="MinExpValue">3 years</span>
      </Box>
      <Box className='ApplyBtn'>
        Apply 🚀
      </Box>
    </Box>
  );
};

export default JobCard;
