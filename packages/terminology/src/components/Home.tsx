import { Input } from 'antd';
import React, { useState, ChangeEvent } from 'react';
import SearchResults from './SearchResults';
const { Search } = Input;

export const Home = () => {
  const [query, setQuery] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  return <div style={{ padding: 10 }}>
    <Search size="large" placeholder="Search concepts" onChange={onChange} value={query} />
    {query !== "" && <SearchResults query={query} />}
  </div>
}
