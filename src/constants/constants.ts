import { JobData } from "../types";

export const JOBS_API_URL =
  "https://api.weekday.technology/adhoc/getSampleJdJSON";
export const PAGE_SIZE = 10;
export const DEFAULT_API_PARAM = {
  limit: PAGE_SIZE,
  offset: 0,
};

export const ROLES_VALUES = ["Frontend", "Backend", "ios", "Android"];
export const EXP_VALUES = ["1", "2", "3", "4"];
export const REMOTE_VALUES = ['Remote','In-office']
export const SALARY_VALUES = ["10", "20", "30", "40", "50"];

export const APPLY_BTN_COLOR = "rgb(85, 239, 196)";
export const REFERRAL_BTN_COLOR = "rgb(73, 67, 218)";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      fontFamily:'Lexend'
    },
  },
};

export const MATERIAL_UI_MODAL_STYLE = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "10px",
  p: 4,
};

/**
 * Check the response item for experience yeara.
 * @param item Current job item.
 * @returns Exp years in number format.
 */
export const getJobItemExperience = (item: JobData): number => {
  if (item.minExp) return item.minExp;
  if (item.maxExp) return item.maxExp;
  return 0;
};

/**
 *
 * @param item Current job item.
 * @param salary Salary filter applied.
 * @returns Boolean if the current job item satisfies salary filter applied.
 */
export const getItemSalaryEligible = (
  item: JobData,
  salary: number
): boolean => {
  if (item.minJdSalary && item.maxJdSalary)
    return salary >= item.minJdSalary && salary <= item.maxJdSalary;
  if (item.minJdSalary) return salary >= item.minJdSalary;
  if (item.maxJdSalary) return salary >= item.maxJdSalary;
  return false;
};

/**
 * 
 * @param item Current job item.
 * @param remote Remote filter applied.
 * @returns Boolean if the current job item satisfies remote filter applied.
 */
export const getRemoteCheckEligible = ( item: JobData,remote:string) => {
 if(remote === 'remote'){
    return item.location.toLowerCase() === remote.toLowerCase();
 }
 else if(remote === 'in-office') return !(item.location.toLowerCase() === 'remote');  
 return false;
}

/**
 * Generate a random number to display in UI as timestamp is not available in response.
 * @returns Number between 1-10.
 */
export const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return randomNumber;
};
