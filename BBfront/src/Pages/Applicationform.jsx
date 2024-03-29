import React from 'react';
import { useFormik } from 'formik';
import './Page.css';
import useStore from '../State/store';

const ApplicationForm = () => {
  const { walletaddress, setaddress } = useStore((state) => ({
    walletaddress: state.walletaddress,
    setaddress: state.setaddress,
  }));

  const formik = useFormik({
    initialValues: {
      title: '',
      thumbnailLink: '',
      documentsLink: '',
      amountRequested: '',
      description: '',
      contactDetails: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      termsAndConditionsChecked: false,
    },
    onSubmit: async (values) => {
      // Combine address fields into a single string
      const address = `${values.street}, ${values.city}, ${values.state} ${values.zipCode}`;
      console.log(address)
      try {
        const response = await fetch('http://localhost:3000/api/opps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            Thumbnail: values.thumbnailLink,
            Description: values.contactDetails,
            amount_to_be_retured: values.amountRequested,
            pitch_Pdf: values.documentsLink,
            oppurtunity_id: walletaddress,
            Location: address,
            contact_Details: values.contactDetails,
            Status: 'Pending',
            duration_of_time: values.returnDate,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again.');
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <div className="form">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <label className="form-label">
          Title:
          <input
            className="form-input"
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="form-label">
          Thumbnail URL:
          <input
            className="form-input"
            type="text"
            name="thumbnailLink"
            value={formik.values.thumbnailLink}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="form-label">
          Documents (PDF file link):
          <input
            className="form-input"
            type="text"
            name="documentsLink"
            value={formik.values.documentsLink}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="form-label">
          Amount Requested [GETH]:
          <input
            className="form-input"
            type="number"
            name="amountRequested"
            value={formik.values.amountRequested}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="form-label">
          Return Date:
          <input
            className="form-input"
            type="date"
            name="returnDate"
            value={formik.values.returnDate}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="form-label">
          Description:
          <textarea
            className="form-textarea"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="form-label">
          Contact Details:
          <input
            className="form-input"
            type="text"
            name="contactDetails"
            value={formik.values.contactDetails}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="form-label">
          Address:
          <label className="form-label">
            Street:
            <input
              className="form-input"
              type="text"
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              required
            />
          </label>
          <label className="form-label">
            City:
            <input
              className="form-input"
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              required
            />
          </label>
          <label className="form-label">
            State:
            <input
              className="form-input"
              type="text"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              required
            />
          </label>
          <label className="form-label">
            ZIP Code:
            <input
              className="form-input"
              type="text"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              required
            />
          </label>
        </label>
        <label className="form-checkbox-label">
          <input
            className="form-checkbox"
            type="checkbox"
            name="termsAndConditionsChecked"
            checked={formik.values.termsAndConditionsChecked}
            onChange={formik.handleChange}
            required
          />
          I agree to the terms & conditions
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
