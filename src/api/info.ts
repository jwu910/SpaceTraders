import axios from "axios";
import { ENDPOINTS } from "../utils/constants";

export const getAgentInfo = async (options: { token: string }) => {
  if (!options.token) throw new Error("Token is required");

  return await axios
    .get(ENDPOINTS.AGENT, {
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};
