import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { fetchGenres, fetchTags } from '../services/api';
import './Sidebar.css';

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [yearRange] = useState({ min: 2000, max: new Date().getFullYear() });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [ordering, setOrdering] = useState('');

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const genresData = await fetchGenres();
        const tagsData = await fetchTags();
        setGenres(genresData.slice(0, 15));
        setTags(tagsData.slice(0, 15));
      } catch (error) {
        console.error('Error loading filters:', error);
      }
    };

    loadFilters();
  }, []);

  useEffect(() => {
    const genresParam = searchParams.get('genres');
    const tagsParam = searchParams.get('tags');
    const yearParam = searchParams.get('dates');
    const orderingParam = searchParams.get('ordering');

    if (genresParam) setSelectedGenres(genresParam.split(','));
    if (tagsParam) setSelectedTags(tagsParam.split(','));
    if (yearParam) {
      const year = yearParam.split(',')[0].slice(0, 4);
      if (!isNaN(parseInt(year))) setSelectedYear(parseInt(year));
    }
    if (orderingParam) setOrdering(orderingParam);
  }, []);

  const handleGenreChange = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id.toString())
        ? prev.filter((genreId) => genreId !== id.toString())
        : [...prev, id.toString()]
    );
  };

  const handleTagChange = (id) => {
    setSelectedTags((prev) =>
      prev.includes(id.toString())
        ? prev.filter((tagId) => tagId !== id.toString())
        : [...prev, id.toString()]
    );
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedGenres.length) {
      params.set('genres', selectedGenres.join(','));
    } else {
      params.delete('genres');
    }

    if (selectedTags.length) {
      params.set('tags', selectedTags.join(','));
    } else {
      params.delete('tags');
    }

    if (selectedYear) {
      params.set('dates', `${selectedYear}-01-01,${selectedYear}-12-31`);
    } else {
      params.delete('dates');
    }

    if (ordering) {
      params.set('ordering', ordering);
    } else {
      params.delete('ordering');
    }

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSelectedGenres([])
    setSelectedTags([])
    setSelectedYear('')
    setOrdering('')
    
    // Remove filter params from URL
    const params = new URLSearchParams(searchParams)
    params.delete('genres')
    params.delete('tags')
    params.delete('dates')
    params.delete('ordering')
    setSearchParams(params)
  }

  return (
    <div className="sidebar">
      {/* Filters Header with Clear All */}
      <div className="sidebar-header">
        <h5 className="sidebar-title">Filters</h5>
        <span className="clear-all" onClick={resetFilters}>Clear all</span>
      </div>

      {/* Categories */}
      <div className="filter-section">
        <label className="filter-label">Categories</label>
        {genres.map((genre) => (
          <Form.Check key={genre.id} type="checkbox" label={genre.name} className="filter-checkbox" checked={selectedGenres.includes(genre.id.toString())} onChange={() => handleGenreChange(genre.id)} />
        ))}
      </div>

      {/* Tags */}
      <div className="filter-section">
        <label className="filter-label">Tags</label>
        {tags.map((tag) => (
          <Form.Check key={tag.id} type="checkbox" label={tag.name} className="filter-checkbox" checked={selectedTags.includes(tag.id.toString())} onChange={() => handleTagChange(tag.id)} />
        ))}
      </div>

      {/* Year Slider */}
      <div className="filter-section">
        <label className="filter-label">Release Year</label>
        <input type="range" min={yearRange.min} max={yearRange.max} value={selectedYear} onChange={handleYearChange} className="slider" />
        <span className="slider-value">{selectedYear}</span>
      </div>

      {/* Sorting */}
      <div className="filter-section">
        <label className="filter-label">Sort By</label>
        <div className="filter-radio-group">
          <label className="filter-radio">
            <input
              type="radio"
              name="ordering"
              value="-rating"
              checked={ordering === "-rating"}
              onChange={handleOrderingChange}
            />
            Popularity
          </label>
          <label className="filter-radio">
            <input
              type="radio"
              name="ordering"
              value="rating"
              checked={ordering === "rating"}
              onChange={handleOrderingChange}
            />
            Rating
          </label>
          <label className="filter-radio">
            <input
              type="radio"
              name="ordering"
              value="-released"
              checked={ordering === "-released"}
              onChange={handleOrderingChange}
            />
            Release Date
          </label>

        </div>
      </div>


      {/* Apply Button */}
      <Button className="apply-filters-btn" onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
};

export default Sidebar;
