import React, { useState } from "react";
import './styles.scss';

import { Box } from "@mui/material";
import JobCard from "./JobCard";

const JobSection = () => {
  return (
    <Box className='JobSection-Container'>
      <Box>
        yo
      </Box>
      <Box className='JobSection-JobCardContainer'>
        <JobCard/>
      </Box>
    </Box>
  );
};

export default JobSection;