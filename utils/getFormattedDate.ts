export function getFormattedDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate.replace(/\//g, "-");
}
