import React, { useEffect, useState } from 'react';

const initialForm = {
  studentName: '',
  parentName: '',
  contactNumber: '',
  email: '',
  classApplyingFor: '',
  enquirySource: '',
  status: 'New',
  notes: '',
};

const validate = (values) => {
  const errors = {};

  if (!values.studentName.trim()) {
    errors.studentName = 'Student name is required';
  }
  if (!values.parentName.trim()) {
    errors.parentName = 'Parent name is required';
  }
  if (!values.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^\d{10}$/.test(values.contactNumber.trim())) {
    errors.contactNumber = 'Enter a valid 10-digit number';
  }
  if (!values.classApplyingFor.trim()) {
    errors.classApplyingFor = 'Class is required';
  }
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  return errors;
};

const LeadForm = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setValues((prev) => ({
        ...prev,
        ...initialData,
      }));
    } else {
      setValues(initialForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-2">
          <div className="field">
            <div className="label">Student Name *</div>
            <input
              className="input"
              name="studentName"
              value={values.studentName}
              onChange={handleChange}
            />
            {errors.studentName && (
              <small style={{ color: 'crimson' }}>
                {errors.studentName}
              </small>
            )}
          </div>
        </div>

        <div className="col-2">
          <div className="field">
            <div className="label">Parent Name *</div>
            <input
              className="input"
              name="parentName"
              value={values.parentName}
              onChange={handleChange}
            />
            {errors.parentName && (
              <small style={{ color: 'crimson' }}>
                {errors.parentName}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <div className="field">
            <div className="label">Contact Number *</div>
            <input
              className="input"
              name="contactNumber"
              value={values.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <small style={{ color: 'crimson' }}>
                {errors.contactNumber}
              </small>
            )}
          </div>
        </div>

        <div className="col-2">
          <div className="field">
            <div className="label">Email</div>
            <input
              className="input"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small style={{ color: 'crimson' }}>{errors.email}</small>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <div className="field">
            <div className="label">Class Applying For *</div>
            <input
              className="input"
              name="classApplyingFor"
              value={values.classApplyingFor}
              onChange={handleChange}
            />
            {errors.classApplyingFor && (
              <small style={{ color: 'crimson' }}>
                {errors.classApplyingFor}
              </small>
            )}
          </div>
        </div>

        <div className="col-2">
          <div className="field">
            <div className="label">Enquiry Source</div>
            <input
              className="input"
              name="enquirySource"
              placeholder="Walk-in / Call / Online..."
              value={values.enquirySource}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <div className="field">
            <div className="label">Status</div>
            <select
              className="select"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="label">Notes</div>
        <textarea
          className="textarea"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          placeholder="Any specific questions, follow-ups, or comments..."
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.5rem',
          marginTop: '0.75rem',
        }}
      >
        <button
          type="button"
          className="btn btn-outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Lead'}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
