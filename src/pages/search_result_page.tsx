import React from 'react';
import { useParams } from 'react-router-dom';

interface SearchResultPageProps {
  name: string;
}

const SearchResultPage: React.FC<SearchResultPageProps> = (prop) => {
  const { genre, target }: { genre: string, target: string; } = useParams();

  return (
    <div>
      <h1>About</h1>
      <h2>I am {genre} and {target}</h2>
    </div>
  );
};

export default SearchResultPage;