import type { FormattedDate } from "$lib/types";

export const formatDate = (date: Date): FormattedDate => {
  const ms = String(date.getUTCMilliseconds()).padStart(3, "0");
  const formattedDate = date.toUTCString().replace(" GMT", `.${ms} GMT`);
  return formattedDate as FormattedDate;
}