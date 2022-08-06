export const formatDate = (date?: Date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};
