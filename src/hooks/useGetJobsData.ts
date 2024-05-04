import axios from "axios";
import { useEffect, useState } from "react";

type JobData = {
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
};

const useGetJobsData = () => {
  const [data, setData] = useState<JobData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {}, []);

  /**
   * Get Jobs data after initial load.
   */
  const getJobsData = async () => {
    setLoading(true);
    const url = `https://api.weekday.technology/adhoc/getSampleJdJSON`;
    const param = {
      limit: 10,
      offset: page,
    };
    try {
      const response = await axios.post(url, param);
      console.log(response);
      setData(response.data.jdList);
      setPage(page + 1);
    } catch (error) {
      //ts
      setError(error);
    } finally {
      setLoading(false);
    }
  };
 
  /**
   * Load jobs data for next iterartion.
   */
  const getJobsDataNextIteration = async () => {
    setLoading(true);
    const url = `https://api.weekday.technology/adhoc/getSampleJdJSON`;
    const param = {
      limit: 10,
      offset: page,
    };
    try {
      const response = await axios.post(url, param);
      console.log(response);
      setData(prevData => [...prevData,...response.data.jdList]);
      setPage(page + 1);
    } catch (error) {
      //ts
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobsData();
  }, []);

  return { isLoading, data, getJobsData, getJobsDataNextIteration };
};

export default useGetJobsData;
