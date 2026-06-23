import { serverFetch } from "@/core/apiClient";

export const fetchLawyerServices = async (lawyerId, status = "Available") => {
  return await serverFetch(
    `/api/lawyer/services?lawyerId=${lawyerId}&status=${status}`,
  );
};

export const getLawyers = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  const search = filters.search?.trim();

  if (search) queryParams.append("search", search);
  if (filters.specialization)
    queryParams.append("specialization", filters.specialization);
  if (filters.sort) queryParams.append("sort", filters.sort);

  const queryString = queryParams.toString();
  return await serverFetch(
    `/api/lawyer/services${queryString ? `?${queryString}` : ""}`,
  );
};

export const getLawyerById = async (id) => {
  return await serverFetch(`/api/lawyer/services/${id}`);
};

export const checkHiring = async (lawyerServiceId, userId) => {
  return await serverFetch(
    `/api/hirings/check?lawyerServiceId=${lawyerServiceId}&userId=${userId}`,
  );
};

export const getHirings = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.lawyerId) params.append("lawyerId", filters.lawyerId);
  if (filters.userId) params.append("userId", filters.userId);
  return await serverFetch(`/api/hirings?${params.toString()}`);
};

export const getHiringById = async (id) => {
  return await serverFetch(`/api/hirings/${id}`);
};