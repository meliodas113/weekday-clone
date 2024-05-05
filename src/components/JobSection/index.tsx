import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";

import useGetJobsData from "../../hooks/useGetJobsData";

import { Box, Modal, SelectChangeEvent } from "@mui/material";

import FormComponent from "./FormComponent";
import { JobData } from "../../types";
import JobsGridComponent from "./JobsGridComponent";

import {
  getItemSalaryEligible,
  getJobItemExperience,
  getRemoteCheckEligible,
} from "../../constants/constants";

const JobSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roles, setRoles] = React.useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const [remote, setRemote] = useState<string[]>([]);
  const { data, isLoading, getJobsDataNextIteration } = useGetJobsData();
  const [filteredData, setFilteredData] = useState<JobData[]>([]);

  /**
   * Logic for mobile drawer.
   */
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrapwer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

  /**
   * Trigger infinite scroll function when observer gets visible.
   * @param entries All elements under intersection observer.
   */
  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];

      if (target.isIntersecting) {
        getJobsDataNextIteration();
      }
    },
    [getJobsDataNextIteration]
  );

  /**
   * Set intersection observer for infinite scroll.
   */
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, [data, handleObserver]);

  /**
   * Function to capture roles filter.
   * @param event
   */
  const handleRolesChange = (event: SelectChangeEvent<typeof roles>): void => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? [value.toLocaleLowerCase()] : value
    );
    handleCloseDrawer();
  };

  /**
   * Function to capture exp filters
   * @param event
   * @returns
   */
  const handleExpChange = (
    event: SelectChangeEvent<typeof experience>
  ): void => {
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
    handleCloseDrawer();
  };

  /**
   * Function to capture remote filters
   * @param event
   * @returns
   */
  const handleRemoteChange = (
    event: SelectChangeEvent<typeof experience>
  ): void => {
    const {
      target: { value },
    } = event;
    if (!value) {
      setRemote([]);
      return;
    }
    setRemote(typeof value === "string" ? [value.toLocaleLowerCase()] : value);
    handleCloseDrawer();
  };

  /**
   * Function to capture salary filter
   * @param event
   * @returns
   */
  const handleSalaryChange = (event: SelectChangeEvent<typeof salary>) => {
    const {
      target: { value },
    } = event;
    if (!value) {
      setSalary([]);
      return;
    }
    setSalary(typeof value === "string" ? [value.toLocaleLowerCase()] : value);
    handleCloseDrawer();
  };

  /**
   * Trigger auto filter when infinite scroll happends.
   */
  useEffect(() => {
    if (isLoading) return;
    setFilteredData([]);

    const filteredData = data.filter(
      (item) =>
        (roles.length === 0 ||
          roles
            .map((el) => el.toLowerCase())
            .includes(item.jobRole.toLowerCase())) &&
        (experience.length === 0 ||
          getJobItemExperience(item) <= Number(experience[0])) &&
        (salary.length === 0 ||
          getItemSalaryEligible(item, Number(salary[0]))) &&
        (remote.length === 0 || getRemoteCheckEligible(item, remote[0]))
    );

    setFilteredData(filteredData);
  }, [data, roles, experience, salary, isLoading, remote]);

  return (
    <Box className="JobSection-Container">
      <Box className="Filter-Section">
        <FormComponent
          width={200}
          selectedRoles={roles}
          selectedExp={experience}
          selectedSalary={salary}
          selectedRemote={remote}
          handleExpChange={handleExpChange}
          handleRolesChange={handleRolesChange}
          handleSalaryChange={handleSalaryChange}
          handleRemoteChange={handleRemoteChange}
        />
      </Box>
      <Box className="JobSection-JobCardContainer">
        {filteredData.length === 0 && !isLoading ? (
          <span className="nodata-text">
            No Data 😔, Please change your filters.
          </span>
        ) : (
          <>
            <JobsGridComponent data={filteredData} />
            {/*Dummy div for intersection observer to work.*/}
            <div ref={containerRef}></div>
          </>
        )}
      </Box>
      <Box onClick={handleOpenDrapwer} className="Mobile-Filters">
        Click to open filter. 👆
      </Box>
      <Modal
        open={openDrawer}
        onClose={handleCloseDrawer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="Mobile-Drawer">
          <FormComponent
            width={"90%"}
            selectedRoles={roles}
            selectedExp={experience}
            selectedSalary={salary}
            selectedRemote={remote}
            handleExpChange={handleExpChange}
            handleRolesChange={handleRolesChange}
            handleSalaryChange={handleSalaryChange}
            handleRemoteChange={handleRemoteChange}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default JobSection;
