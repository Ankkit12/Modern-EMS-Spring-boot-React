import React from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="searchbar">
      <input
        placeholder="Search employees by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="btn" onClick={onSearch}>Search</button>
    </div>
  );
}
