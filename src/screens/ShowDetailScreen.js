// ShowDetailScreen.js
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { setUser, selectUser } from '../store/userSlice';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';



const ShowDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isSubmitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { userName, userEmail } = useSelector(selectUser);
  
  useEffect(() => {
    axios
    .get(`https://api.tvmaze.com/shows/${id}`)
    .then((response) => setShow(response.data))
    .catch((error) => console.error('Error fetching show details:', error));
  }, [id]);

  
  
  const formik = useFormik({
    initialValues: {
      userName: userName || '',
      userEmail: userEmail || '',
    },
    onSubmit: (values) => {
      console.log('Movie Name:', show ? show.name : 'Not available');
      console.log('Form Values:', values);

      dispatch(setUser({ userName: values.userName, userEmail: values.userEmail }));

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      alert(`Ticket booked for ${show.name} on ${new Date().toLocaleString()}`);
    },
  });

  return (
    <>
    <header className="text-center">
        <h1>TV Shows</h1>
      </header>
    <div className="container mt-5">
      {show ? (
        <>
          <div className="row">
            <div className="col-md-5">
              <img
                src={show.image?.medium || 'https://dummyimage.com/300x400/181818/ffffff.jpg&text=Image+not+found.'}
                alt={show.name}
                className="img-fluid rounded show-image"
              />
            </div>
            <div className="col-md-6">
              <h1>{show.name}</h1>
              <p>
                <strong>Rating:</strong> {show.rating.average || 'Not available'}
              </p>
              <p>
                <strong>Runtime:</strong> {show.runtime} minutes
              </p>
              <p>
                <strong>Status:</strong> {show.status}
              </p>
              <p>
                <strong>Genres:</strong> {show.genres.join(', ')}
              </p>
              {/* Add more details as needed */}
            </div>
          </div>
  
          <div className="mt-3">
            <h2 className="mt-4">About the movie</h2>
            <div dangerouslySetInnerHTML={{ __html: show.summary }}></div>
          </div>
  
          <form className="booking-form" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="userName" className="form-label">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  required
                />
              </div>
  
              <div className="col-md-6 mb-3">
                <label htmlFor="userEmail" className="form-label">
                  Your Email:
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.userEmail}
                  required
                />
              </div>
            </div>
  
            <button type="submit" className="btn btn-primary">
              Book Movie Ticket
            </button>
          </form>
  
          {isSubmitted && (
            navigate('/')
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
};

export default ShowDetailScreen;