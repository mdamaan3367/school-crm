import React from 'react';

const LeadFilters = ({ status, onStatusChange, search, onSearchChange }) => {
  return (
    <div className="filter-bar">
      <div>
        <span className="label">Status</span>
        <select
          className="select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div style={{ flex: 1, minWidth: '180px' }}>
        <span className="label">Search</span>
        <input
          className="input"
          placeholder="Search by student, parent, or contact..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LeadFilters;
