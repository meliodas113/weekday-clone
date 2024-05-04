import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid";

import JobCard from "./JobCard";
import useGetJobsData from "../../hooks/useGetJobsData";

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

const JobSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [personName, setPersonName] = React.useState<string[]>([]);
  const { data, isLoading, getJobsDataNextIteration } = useGetJobsData();
  console.log(data);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [data]); // Re-run if data changes

  const handleObserver: IntersectionObserverCallback = (entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
        getJobsDataNextIteration();
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box className="JobSection-Container">
      <Box className='Filter-Section'>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>
      <Box className="JobSection-JobCardContainer">
        <Grid
          container
          columnSpacing={0}
          rowSpacing={0}
          columns={12}
          direction="row"
          justifyContent="center"
          alignItems=""
        >
          {data.length > 0 &&
            data.map((item) => (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                item
                key={item.jdUid}
              >
                <Box p={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
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
        <div ref={containerRef}></div>
      </Box>
    </Box>
  );
};

export default JobSection;
