import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import {
  EXP_VALUES,
  MenuProps,
  REMOTE_VALUES,
  ROLES_VALUES,
  SALARY_VALUES,
} from "../../../constants/constants";

import { FormComponentProps } from "../../../types";


const FormComponent = (props: FormComponentProps) => {
  return (
    <>
      <FormControl sx={{ m: 1, width: props.width }}>
        <InputLabel id="role-label">Roles</InputLabel>
        <Select
          labelId="role-label"
          id="role-select"
          multiple
          value={props.selectedRoles}
          onChange={props.handleRolesChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {ROLES_VALUES.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: props.width }}>
        <Select
          displayEmpty
          value={props.selectedExp}
          onChange={props.handleExpChange}
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
          {EXP_VALUES.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: props.width }}>
        <InputLabel id="salary-label">Salary</InputLabel>
        <Select
          labelId="salary-label"
          id="salary-select"
          value={props.selectedSalary}
          onChange={props.handleSalaryChange}
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
          {SALARY_VALUES.map((el) => (
            <MenuItem key={el} value={el}>
              {el}USD
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: props.width }}>
        <InputLabel id="remote-label">Remote</InputLabel>
        <Select
          labelId="remote-label"
          id="remote-select"
          value={props.selectedRemote}
          onChange={props.handleRemoteChange}
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
          {REMOTE_VALUES.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default FormComponent;
