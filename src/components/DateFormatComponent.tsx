import React from 'react';

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear().toString();
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
