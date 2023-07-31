import axios from "axios";
import { ENDPOINTS } from "../utils/constants";

export const getAgentInfo = (options: { token: string }) => {
  return axios.get(ENDPOINTS.AGENT, {
    headers: {
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
    params: {},
  });
};
