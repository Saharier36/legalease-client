import { serverFetch } from "@/core/apiClient";

export const fetchLawyerServices = async (lawyerId, status = 'Available') => {
  return await serverFetch(`/api/lawyer/services?lawyerId=${lawyerId}&status=${status}`);
};

export const getLawyers = async () => {
  return await serverFetch("/api/lawyer/services");
}