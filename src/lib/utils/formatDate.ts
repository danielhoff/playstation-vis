import type { UserFormattedDate } from "$lib/types";

export const formatDate = (date: Date): UserFormattedDate => {
  const ms = String(date.getUTCMilliseconds()).padStart(3, "0");
  const UserFormattedDate = date.toUTCString().replace(" GMT", `.${ms} GMT`);
  return UserFormattedDate as UserFormattedDate;
}