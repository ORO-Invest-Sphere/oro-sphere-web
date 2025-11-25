import React, { useState } from 'react';
import { X } from 'lucide-react';
import './InquiryModal.css';

const InquiryModal = ({ isOpen, onClose }) => {
  const [inquiryType, setInquiryType] = useState('');
  const [customInquiry, setCustomInquiry] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const inquiryData = {
        type: inquiryType,
        details: inquiryType === 'Others' ? customInquiry : inquiryType,
        email: email
      };
      
      console.log('Sending inquiry to dummy@oro-invest-sphere.gov.ph:', inquiryData);
      alert(`Inquiry sent successfully!\n\nType: ${inquiryData.type}\nDetails: ${inquiryData.details}\nContact: ${inquiryData.email}`);
      
      setIsSubmitting(false);
      onClose();
      // Reset form
      setInquiryType('');
      setCustomInquiry('');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>Connect with Oro-Invest-Sphere</h2>
          <p>Staff for site visits, available warehouse listings, or customized reports.</p>
        </div>

        <form onSubmit={handleSubmit} className="inquiry-form">
          <div className="form-group">
            <label htmlFor="email">Your Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="investor@company.com"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="inquiryType">Nature of Inquiry</label>
            <select 
              id="inquiryType" 
              value={inquiryType} 
              onChange={(e) => setInquiryType(e.target.value)}
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Site Visit">Site Visit Request</option>
              <option value="Warehouse Listings">Available Warehouse Listings</option>
              <option value="Customized Reports">Customized Economic Reports</option>
              <option value="Others">Others (Please Specify)</option>
            </select>
          </div>

          {inquiryType === 'Others' && (
            <div className="form-group">
              <label htmlFor="customInquiry">Please specify your inquiry</label>
              <textarea 
                id="customInquiry" 
                value={customInquiry}
                onChange={(e) => setCustomInquiry(e.target.value)}
                placeholder="Tell us more about what you need..."
                rows={4}
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;
