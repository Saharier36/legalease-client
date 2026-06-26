"use server";
import { protectedFetch, serverFetch } from "@/core/apiClient";

export const fetchLawyerServices = async (lawyerId, status) => {
  const params = new URLSearchParams();
  if (lawyerId) params.append("lawyerId", lawyerId);
  if (status) params.append("status", status);

  const queryString = params.toString();
  return await serverFetch(
    `/api/lawyer/services${queryString ? `?${queryString}` : ""}`,
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
  return await protectedFetch(
    `/api/hirings/check?lawyerServiceId=${lawyerServiceId}&userId=${userId}`,
  );
};

export const getHirings = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.lawyerId) params.append("lawyerId", filters.lawyerId);
  if (filters.userId) params.append("userId", filters.userId);
  return await protectedFetch(`/api/hirings?${params.toString()}`);
};

export const getHiringById = async (id) => {
  return await serverFetch(`/api/hirings/${id}`);
};

export const getUserComments = async (userId) => {
  return await protectedFetch(`/api/comments/user?userId=${userId}`);
};

export const getUsers = async () => {
  return await protectedFetch("/api/users");
};

export const getTransactions = async () => {
  return await protectedFetch("/api/transactions");
};

export const getAnalytics = async () => {
  return await protectedFetch("/api/admin/analytics");
};
