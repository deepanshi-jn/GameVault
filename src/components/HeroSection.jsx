import { Container, Button } from 'react-bootstrap';
import './HeroSection.css';

const HeroSection = ({ onExploreClick }) => {
  return (
    <Container fluid className="hero-section">
      <div className="hero-content">
        <h1>Discover Your Next Gaming Adventure</h1>
        <p>
          Explore thousands of games across all platforms and genres.
          Find your next favorite game today.
        </p>
        <Button variant="primary" className="explore-button" onClick={onExploreClick}>
          Explore Now
        </Button>
      </div>
    </Container>
  );
};

export default HeroSection;
