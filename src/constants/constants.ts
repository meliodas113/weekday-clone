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
export const SALARY_VALUES = ["10", "20", "30", "40", "50"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
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
  export const getItemSalaryEligible = (item: JobData, salary: number) => {
    if (item.minJdSalary && item.maxJdSalary)
      return salary >= item.minJdSalary && salary <= item.maxJdSalary;
    if (item.minJdSalary) return salary >= item.minJdSalary;
    if (item.maxJdSalary) return salary >= item.maxJdSalary;
    return false;
  };
