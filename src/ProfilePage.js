import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import './ProfilePage.css'; 
const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '/20240927_105822.jpg', 
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API Call to simulate fetching user data
    setTimeout(() => {
        // Simulate an error (e.g., network failure)
        const hasError = false; // Change this for testing the error condition

        if (hasError) {
            setError('Failed to load user data');
        } else {
            setUser({
                name: '',
                email: '',
                avatar: '/20240927_105822.jpg', // Assuming the avatar.png is in the public folder
            });
        }
    }, 1000);
}, []);

  const handleSubmit = (values, { setSubmitting }) => {
    
    setUser({
      ...user,
      name: values.name,
      email: values.email,
    });
    setSubmitting(false);
  };

  if (error) return <div className="error">{error}</div>; 
  if (!user) return <div className="loading">Loading...</div>; 
  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <div className="avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">
              {user.name ? user.name[0].toUpperCase() : '?'}
            </div>
          )}
        </div>

        <h2>{user.name || 'Your Name'}</h2>
        <p>{user.email || 'Your Email'}</p>
        <Formik
          enableReinitialize={true} 
          initialValues={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  className="form-control"
                />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn">
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfilePage;
