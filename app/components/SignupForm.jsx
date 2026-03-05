'use client';

import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  postcode: '',
  optInUpdates: true
};

export default function SignupForm({ supporterCount }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/petition-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit the form right now.');
      }

      setStatus('success');
      setMessage('Thanks for your support. Your details have been submitted.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <section className="signup-section" aria-labelledby="signup-title">
        <h3 id="signup-title">Show Your Support</h3>
        {/* <p>{`Add your name to the ${Number(supporterCount || 0).toLocaleString()} people who have already shown their support.`}</p> */}
        <p className="signup-message">{message}</p>
      </section>
    );
  }

  return (
    <section className="signup-section" aria-labelledby="signup-title">
      <h3 id="signup-title">Show Your Support</h3>
      <p>{`Add your name to the ${Number(supporterCount || 0).toLocaleString()} people who have already shown their support. If you like, we'll send
        you regular updates as the campaign progresses.`}</p>
      {/* <p>
        Show your support by entering your details below - 
      </p> */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="postcode">Postcode</label>
        <input
          id="postcode"
          name="postcode"
          type="text"
          autoComplete="postal-code"
          required
          value={form.postcode}
          onChange={handleChange}
        />

        <label className="checkbox-row" htmlFor="optInUpdates">
          <input
            id="optInUpdates"
            name="optInUpdates"
            type="checkbox"
            checked={form.optInUpdates}
            onChange={handleChange}
          />
          <span>
            Keep up to date with news about this campaign. We&apos;ll keep communication to
            a minimum.
          </span>
        </label>

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit'}
        </button>

        {status === 'error' && message ? <p className="signup-message error">{message}</p> : null}
      </form>
    </section>
  );
}
