// components/ShowCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ShowCard.css';

const ShowCard = ({ show }) => {
  const imageUrl = show.image?.medium || 'https://dummyimage.com/2160x3050/181818/ffffff.jpg&text=Image+not+found.';

  return (
    <div className='col'>
      <Link to={`/show/${show.id}`} className="card1 card">
        <div className="card h-100 shadow-sm">
          <img src={imageUrl} className="card-img-top" alt={show.name} />
          <div className="card-body">
            <h5 className="card-title">{show.name}</h5>
            {/* Add other show details you want to display */}
            <Link to={`/show/${show.id}`} className="btn btn-primary">
              Show Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShowCard;
