import React, { useEffect, useState } from 'react';
import api from '../api';
import LeadFilters from '../components/LeadFilters';
import LeadTable from '../components/LeadTable';
import LeadForm from '../components/LeadForm';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';

const LeadListPage = () => {
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {
        page,
        limit: 10,
      };

      if (status) params.status = status;
      if (search.trim()) params.search = search.trim();

      const res = await api.get('/leads', { params });

      setLeads(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError('Failed to load leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  // If search text changes, reset to page 1 and refetch with small debounce
  useEffect(() => {
    const id = setTimeout(() => {
      setPage(1);
      fetchLeads();
    }, 400);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleAddClick = () => {
    setEditingLead(null);
    setShowForm(true);
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleSaveLead = async (values) => {
    try {
      setSaving(true);
      setError('');

      if (editingLead) {
        await api.put(`/leads/${editingLead._id}`, values);
      } else {
        await api.post('/leads', values);
      }

      setShowForm(false);
      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      console.error(err);
      setError('Failed to save lead. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Enquiry Leads</h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge">Mini CRM</span>
          <button className="btn btn-primary" onClick={handleAddClick}>
            + New Lead
          </button>
        </div>
      </div>

      <LeadFilters
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        search={search}
        onSearchChange={setSearch}
      />

      {error && (
        <div
          style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '0.75rem',
            fontSize: '0.8rem',
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading leads...</p>
      ) : (
        <>
          <LeadTable leads={leads} onEdit={handleEdit} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

     <Modal
  open={showForm}
  onClose={() => {
    setShowForm(false);
    setEditingLead(null);
  }}
  title={editingLead ? "Edit Lead" : "Add New Lead"}
>
  <LeadForm
    initialData={editingLead}
    onSubmit={handleSaveLead}
    onCancel={() => {
      setShowForm(false);
      setEditingLead(null);
    }}
    isSubmitting={saving}
  />
</Modal>

    </div>
  );
};

export default LeadListPage;
