/* eslint-disable prefer-template */
export const formatTimeAndDate = (date: any) => {
  const createdAtDate = new Date(date);
  const formattedCreateDate = `${createdAtDate.toLocaleTimeString()} ${createdAtDate.toDateString()}`;
  return formattedCreateDate;
};

export const truncateName = (name: string, length: number) => {
  if (name === undefined) return '';
  return name.length < length ? name : name.substring(0, length - 1) + '...';
};

export const get30DaysPriorDate = () => {
  const today = new Date();
  const priorDate = new Date().setDate(today.getDate() - 30);

  return new Date(priorDate).toISOString().slice(0, 10);
};

export const convertDate = (date: string | null) => {
  if (date !== null) return date.replace(/-/g, '') + '0000';
  return null;
};

export const scrollToElement = (id: string) => {
  const element = window.document.getElementById(id);
  element?.scrollIntoView(true);
  element?.focus();
};
