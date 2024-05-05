import axios from "axios";
import { useEffect, useState } from "react";
import { DEFAULT_API_PARAM, JOBS_API_URL, PAGE_SIZE } from "../constants/constants";
import { JobData } from "../types";

const useGetJobsData = () => {
  const [data, setData] = useState<JobData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {}, []);

  /**
   * Load jobs data for next iterartion.
   */
  const getJobsDataNextIteration = async () => {
    setLoading(true);
    const url = `https://api.weekday.technology/adhoc/getSampleJdJSON`;
    const param = {
      limit: PAGE_SIZE,
      offset: page,
    };
    try {
      const response = await axios.post(url, param);
      setData((prevData) => [...prevData, ...response.data.jdList]);
      setPage(page + 1);
    } catch (error) {
      //ts
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /**
     * Get Jobs data after initial load.
     */
    const getJobsData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(JOBS_API_URL, DEFAULT_API_PARAM);
        setData(response.data.jdList);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        //ts
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getJobsData();
  }, []);

  return { isLoading, data, getJobsDataNextIteration, error };
};

export default useGetJobsData;
