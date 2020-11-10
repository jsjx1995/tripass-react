import React from 'react';

interface DetailPageProps {
  name: string;
}

const DetailPage: React.FC<DetailPageProps> = (prop) => {
  return (
    <div>
      <h1>About</h1>
      <h2>I am {prop.name}</h2>
    </div>
  );
};

export default DetailPage;