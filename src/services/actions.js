"use server";
import {
  serverDelete,
  serverFetch,
  serverMutation,
  serverUpdate,
} from "@/core/apiClient";

export const createLawyerService = async (data) => {
  return await serverMutation("/api/lawyer/services", data);
};

export const updateLawyerService = async (id, data) => {
  return await serverUpdate(`/api/lawyer/services/${id}`, data);
};

export const deleteLawyerService = async (id) => {
  return await serverDelete(`/api/lawyer/services/${id}`);
};

export const getMyLawyerServices = async (lawyerId) => {
  if (!lawyerId) return [];
  const result = await serverFetch(
    `/api/lawyer/services?lawyerId=${lawyerId}`,
  );
  return Array.isArray(result) ? result : [];
};

export const saveHiring = async (data) => {
  return await serverMutation("/api/hirings", data);
};

export const saveComment = async (data) => {
  return await serverMutation("/api/comments", data);
};

export const updateHiringStatus = async (id, status, lawyerId) => {
  return await serverUpdate(`/api/hirings/${id}/status`, { status, lawyerId });
};

export const updateHiringPayment = async (id, stripeSessionId, amount) => {
  return await serverUpdate(`/api/hirings/${id}/payment`, {
    stripeSessionId,
    amount,
  });
};

export const updateComment = async (id, text, userId) => {
  return await serverUpdate(`/api/comments/${id}`, { text, userId });
};

export const deleteComment = async (id, userId) => {
  return await serverDelete(`/api/comments/${id}?userId=${userId}`);
};
