// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCard from '../components/ShowCard';

const HomeScreen = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLength, setSelectedLength] = useState('');

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
  }, []);

  const filterShows = () => {
    let filteredShows = shows;

    // Apply search term filter
    if (searchTerm.trim() !== '') {
      filteredShows = filteredShows.filter(show =>
        show.show.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenre !== '') {
      filteredShows = filteredShows.filter(show =>
        show.show.genres.includes(selectedGenre)
      );
    }

    // Apply show length filter
    if (selectedLength !== '') {
      filteredShows = filteredShows.filter(show =>
        show.show.runtime === parseInt(selectedLength, 10)
      );
    }

    return filteredShows;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleLengthChange = (event) => {
    setSelectedLength(event.target.value);
  };

  return (
    <div>
      <div className="container mt-5">
        <h1 className="mb-3 me-3">TV Shows</h1>
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search by name"
              className="form-control"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value="">Filter by Genre</option>
              {/* Add genre options based on available genres */}
              {/* For now, let's assume genres are available */}
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Action">Action</option>
              {/* Add more genres as needed */}
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              value={selectedLength}
              onChange={handleLengthChange}
            >
              <option value="">Filter by Length</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              {/* Add more length options as needed */}
            </select>
          </div>
        </div>
      </div>
  
      <div className='container p-2'>
      <div className='w-100 row row-cols-1 row-cols-md-4 g-2'> 
        {filterShows().length === 0 ? (
          <p>No shows found!</p>
        ) : (
          filterShows().map(show => (
            <ShowCard key={show.show.id} show={show.show} />
          ))
        )}
      </div>
      </div>

    </div>
  )
};

export default HomeScreen;
