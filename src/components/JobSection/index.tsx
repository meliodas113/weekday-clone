import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import JobCard from "./JobCard";
import useGetJobsData, { JobData } from "../../hooks/useGetJobsData";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const rolesValues = ["Frontend", "Backend", "ios", "Android"];
const experienceValues = ["1", "2", "3", "4"];
const salaryValues = ["10", "20", "30", "40", "50"];

const JobSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roles, setRoles] = React.useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const { data, isLoading, getJobsDataNextIteration } = useGetJobsData();
  const [filteredData, setFilteredData] = useState<JobData[]>([]);
  console.log(data);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
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

  const handleChange = (event: SelectChangeEvent<typeof roles>) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? [value.toLocaleLowerCase()] : value
    );
  };

  const handleExpChange = (event: SelectChangeEvent<typeof experience>) => {
    const {
      target: { value },
    } = event;
    if (!value) {
      setExperience([]);
      return;
    }
    setExperience(
      typeof value === "string" ? [value.toLocaleLowerCase()] : value
    );
    console.log(experience, "exp");
  };

  const handleSalaryChange = (event: SelectChangeEvent<typeof salary>) => {
    const {
      target: { value },
    } = event;
    if (!value) {
      setSalary([]);
      return;
    }
    setSalary(typeof value === "string" ? [value.toLocaleLowerCase()] : value);
  };

  const checkItemExp = (item: JobData) => {
    if (item.minExp) return item.minExp;
    if (item.maxExp) return item.maxExp;
    return 0;
  };

  const checkItemSalaryEligible = (item: JobData, salary: number) => {
    if (item.minJdSalary && item.maxJdSalary)
      return salary >= item.minJdSalary && salary <= item.maxJdSalary;
    if (item.minJdSalary) return salary >= item.minJdSalary;
    if (item.maxJdSalary) return salary >= item.maxJdSalary;
    return false;
  };

  useEffect(() => {
    if (isLoading) return; // Do nothing if data is loading
    setFilteredData([]);
    // Filter data based on roles and experience
    const filteredData = data.filter(
      (item) =>
        (roles.length === 0 ||
          roles
            .map((el) => el.toLowerCase())
            .includes(item.jobRole.toLowerCase())) &&
        (experience.length === 0 ||
          checkItemExp(item) <= Number(experience[0])) &&
        (salary.length === 0 ||
          checkItemSalaryEligible(item, Number(salary[0])))
    );

    // Display filtered data
    setFilteredData(filteredData);
  }, [data, roles, experience, salary, isLoading]);

  return (
    <Box className="JobSection-Container">
      <Box className="Filter-Section">
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-multiple-name-label">Roles</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={roles}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {rolesValues.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <Select
            displayEmpty
            value={experience}
            onChange={handleExpChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Experience</em>;
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {experienceValues.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-multiple-chip-label-salary">Salary</InputLabel>
          <Select
            labelId="demo-multiple-chip-label-salary"
            id="demo-multiple-chip"
            value={salary}
            onChange={handleSalaryChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {salaryValues.map((el) => (
              <MenuItem key={el} value={el}>
                {el}USD
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="JobSection-JobCardContainer">
        {filteredData.length === 0 && !isLoading ? (
          <span className="nodata-text">
            No Data 😔, Please change your filters.
          </span>
        ) : (
          <>
            <Grid
              container
              columnSpacing={0}
              rowSpacing={0}
              columns={12}
              direction="row"
              justifyContent="center"
              alignItems=""
            >
              {filteredData.length > 0 &&
                filteredData.map((item, index) => (
                  <Grid
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={3}
                    item
                    key={`${item.jdUid}${index}`}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default JobSection;
