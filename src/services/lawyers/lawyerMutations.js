import { serverMutation } from "@/core/apiClient";

export const createLawyerService = async (data) => {
  return await serverMutation("/api/lawyer/services", data);
};
