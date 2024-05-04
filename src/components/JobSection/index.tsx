import React, { useState } from "react";
import "./styles.scss";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import JobCard from "./JobCard";
import useGetJobsData from "../../hooks/useGetJobsData";

const JobSection = () => {
  const { data, isLoading } = useGetJobsData();
  console.log(data);
  return (
    <Box className="JobSection-Container">
        <Box className='JobSection-JobCardContainer'>
        <Grid
           container
           columnSpacing={{ xs: 2, md: 2,lg:2}}
           rowSpacing={{xs:1,sm:2,md:2,lf:3}}
           columns={{ xs: 4, sm: 3, md: 12,lg:18 }} 
           direction="row"
           justifyContent="center"
           alignItems=""
        >
          {data.length > 0 &&
            data.map((item) => (
              <Grid xs={4} sm={3} md={6} lg={4} xl={4} item key={item.jdUid} spacing={3}>
                <Box p={{xs:2,sm:2,md:2,lg:0}}>
                <JobCard
                  name={item.companyName}
                  role={item.jobRole}
                  location={item.location}
                  link={item.jdLink}
                  description={item.jobDetailsFromCompany}
                  image={item.logoUrl}
                  currency={item.salaryCurrencyCode}
                  minExp={item?.minExp}
                  maxExp={item?.maxExp}
                  minSalary={item?.minJdSalary}
                  maxSalary={item?.maxJdSalary}
                />
                </Box>
              </Grid>
            ))}
        </Grid>
        </Box>
    </Box>
  );
};

export default JobSection;
