import { SelectChangeEvent } from "@mui/material";

export interface JobData {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp?: number;
  maxJdSalary?: number;
  minExp?: number;
  minJdSalary?: number;
  salaryCurrencyCode: string;
}

export interface FormComponentProps {
  width: number | string; //Desired width of input elements.
  selectedRoles: string[];
  selectedExp: string[];
  selectedSalary: string[];
  handleRolesChange: (event: SelectChangeEvent<string[]>) => void;
  handleExpChange: (event: SelectChangeEvent<string[]>) => void;
  handleSalaryChange: (event: SelectChangeEvent<string[]>) => void;
}

export interface JobCardProps {
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
}

export interface JobsGridComponentProps {
  data: JobData[];
}
