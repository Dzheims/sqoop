/* eslint-disable prefer-template */
export const formatTimeAndDate = (date: any) => {
  const createdAtDate = new Date(date);
  const formattedCreateDate = `${createdAtDate.toLocaleTimeString()} ${createdAtDate.toDateString()}`;
  return formattedCreateDate;
};

export const truncateName = (name: string, length: number) =>
  name.length < length ? name : name.substring(0, length - 1) + '...';
