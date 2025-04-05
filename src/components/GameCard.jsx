import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap'
import { FaStar, FaBookmark } from 'react-icons/fa'
import { addBookmark, removeBookmark } from '../redux/features/bookmarksSlice'
import './GameCard.css'

const GameCard = ({ game }) => {
  const dispatch = useDispatch()
  const bookmarkedGames = useSelector(state => state.bookmarks.bookmarkedGames)
  const isBookmarked = bookmarkedGames.some(bookmark => bookmark.id === game.id)


  const toggleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isBookmarked) {
      dispatch(removeBookmark(game.id))
    } else {
      dispatch(addBookmark({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating
      }))
    }
  }

  return (
    <Link to={`/game/${game.id}`} className="game-card-link">
      <Card className="game-card h-100 shadow-sm">
        <div className="game-image-container">
          {game.background_image ? (
            <Card.Img 
              variant="top" 
              src={game.background_image} 
              alt={game.name}
              className="game-image"
            />  
          ) : (
            <div className="placeholder-image">
              No Image Available
            </div>
          )}
          <Button 
            variant="light"
            size="sm"
            className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
            onClick={toggleBookmark}
          >
            <FaBookmark />
          </Button>
        </div>
        
        <Card.Body className="game-card-body">
          <div className="title-rating">
            <Card.Title className="game-title">{game.name}</Card.Title>
            <div className="rating">
              <FaStar className="star-icon" />
              <span>{game.rating ? game.rating.toFixed(1) : 'N/A'}</span>
            </div>
          </div>

          <div className="game-genres">
            {game.genres && game.genres.slice(0, 3).map(genre => (
              <Badge key={genre.id} bg="light" text="dark" className="genre-badge">
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="release-year">{game.released ? new Date(game.released).getFullYear() : 'TBA'}</div>

          <Button variant="primary" className="view-details-btn">
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default GameCard
