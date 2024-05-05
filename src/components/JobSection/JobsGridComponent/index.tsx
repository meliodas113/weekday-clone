import { Box, Grid } from "@mui/material";

import JobCard from "../JobCard";

import { JobsGridComponentProps } from "../../../types";



const JobsGridComponent = (props: JobsGridComponentProps) => {
  return (
    <Grid
      container
      columnSpacing={0}
      rowSpacing={0}
      columns={12}
      direction="row"
      justifyContent="center"
      alignItems=""
    >
      {props.data.length > 0 &&
        props.data.map((item, index) => (
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
  );
};

export default JobsGridComponent;
