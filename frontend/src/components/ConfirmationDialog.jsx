import React from 'react';
import '../styles/ConfirmationDialog.css';

export default function ConfirmationDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-backdrop">
      <div className="confirm-card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
          <button className="btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
