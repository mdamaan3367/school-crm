import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

const LeadDetailPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLead = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/leads/${id}`);
      setLead(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load lead details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <p>Loading lead...</p>;
  }

  if (error) {
    return (
      <div className="card">
        <p style={{ color: '#b91c1c' }}>{error}</p>
        <Link to="/" className="btn btn-outline">
          Back to list
        </Link>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="card">
        <p>Lead not found.</p>
        <Link to="/" className="btn btn-outline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Lead Details</h2>
        <Link to="/" className="btn btn-outline">
          ← Back
        </Link>
      </div>

      <div className="detail-grid">
        <div className="detail-item">
          <div className="detail-label">Student Name</div>
          <div className="detail-value">{lead.studentName}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Parent Name</div>
          <div className="detail-value">{lead.parentName}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Contact Number</div>
          <div className="detail-value">{lead.contactNumber}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Email</div>
          <div className="detail-value">{lead.email || '—'}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Class Applying For</div>
          <div className="detail-value">{lead.classApplyingFor}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Status</div>
          <div className="detail-value">{lead.status}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Enquiry Source</div>
          <div className="detail-value">
            {lead.enquirySource || '—'}
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Created At</div>
          <div className="detail-value">
            {lead.createdAt
              ? new Date(lead.createdAt).toLocaleString()
              : '—'}
          </div>
        </div>
        <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <div className="detail-label">Notes</div>
          <div className="detail-value">
            {lead.notes ? (
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                }}
              >
                {lead.notes}
              </pre>
            ) : (
              'No notes added.'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
