import React from 'react';
import { Link } from 'react-router-dom';

const StatusPill = ({ status }) => {
  let cls = 'status-pill ';
  if (status === 'New') cls += 'status-new';
  else if (status === 'In Progress') cls += 'status-progress';
  else if (status === 'Closed') cls += 'status-closed';

  return <span className={cls}>{status}</span>;
};

const LeadTable = ({ leads, onEdit }) => {
  if (!leads.length) {
    return <p style={{ color: '#6b7280' }}>No leads found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Parent</th>
            <th>Contact</th>
            <th>Class</th>
            <th>Status</th>
            <th>Source</th>
            <th>Created</th>
            <th style={{ width: '100px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.studentName}</td>
              <td>{lead.parentName}</td>
              <td>{lead.contactNumber}</td>
              <td>{lead.classApplyingFor}</td>
              <td>
                <StatusPill status={lead.status} />
              </td>
              <td>{lead.enquirySource || '—'}</td>
              <td>
                {lead.createdAt
                  ? new Date(lead.createdAt).toLocaleDateString()
                  : '—'}
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    onClick={() => onEdit(lead)}
                  >
                    Edit
                  </button>
                  <Link
                    to={`/leads/${lead._id}`}
                    className="btn btn-outline"
                    style={{
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.75rem',
                      textDecoration: 'none',
                    }}
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
