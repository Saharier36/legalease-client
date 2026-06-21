import { serverFetch } from "@/core/apiClient";

export const fetchLawyerServices = async (lawyerId, status = 'Available') => {
  return await serverFetch(`/api/lawyer/services?lawyerId=${lawyerId}&status=${status}`);
};

export const getLawyers = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  const search = filters.search?.trim();
  
  if (search) queryParams.append("search", search);
  if (filters.specialization) queryParams.append("specialization", filters.specialization);
  if (filters.sort) queryParams.append("sort", filters.sort);

  const queryString = queryParams.toString();
  return await serverFetch(`/api/lawyer/services${queryString ? `?${queryString}` : ""}`);
};
