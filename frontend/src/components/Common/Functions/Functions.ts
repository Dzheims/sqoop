const formatTimeAndDate = (date: any) => {
  const createdAtDate = new Date(date);
  const formattedCreateDate = `${createdAtDate.toLocaleTimeString()} ${createdAtDate.toDateString()}`;
  return formattedCreateDate;
};

export default formatTimeAndDate;
