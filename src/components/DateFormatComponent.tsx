import React from 'react';

const formatDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

interface DateComponentProps {
  mongoDate: string;
}

const DateComponent: React.FC<DateComponentProps> = ({ mongoDate }) => {
  return (
    <p className='pb-5'>{formatDate(mongoDate)}</p>
  );
};

export default DateComponent;
