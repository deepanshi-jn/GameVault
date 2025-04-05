import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }else{
      navigate('/')
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Optional: Auto-search after typing stops
    if (value.trim()) {
      const timeoutId = setTimeout(() => {
        navigate(`/?search=${encodeURIComponent(value.trim())}`);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
    else{
      navigate('/')
    }
  };

  return (
    <Form className={`search-bar ${className || ''}`} onSubmit={handleSearch}>
      <InputGroup>
        <Form.Control
          type="text" 
          placeholder="Search games..."
          value={searchTerm}
          onChange={handleChange}
        />
        <InputGroup.Text
          onClick={handleSearch}
          className="search-icon-container"
        >
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
