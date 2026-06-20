import { serverMutation, serverUpdate } from "@/core/apiClient";

export const createLawyerService = async (data) => {
  return await serverMutation("/api/lawyer/services", data);
};

export const updateLawyerService = async (id, data) => {
  return await serverUpdate(`/api/lawyer/services/${id}`, data);
};