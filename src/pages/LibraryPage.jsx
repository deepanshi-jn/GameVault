import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrash, FaStar, FaGamepad, FaSearch, FaArrowRight, FaRegClock } from 'react-icons/fa'
import { removeBookmark } from '../redux/features/bookmarksSlice'
import './LibraryPage.css'

const LibraryPage = () => {
  const dispatch = useDispatch()
  const { bookmarkedGames } = useSelector(state => state.bookmarks)
  const [searchTerm, setSearchTerm] = useState('')
  const [isRemoving, setIsRemoving] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation on load
    setFadeIn(true)
  }, [])

  const handleRemoveBookmark = (gameId, event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsRemoving(true)
    setTimeout(() => {
      dispatch(removeBookmark(gameId))
      setIsRemoving(false)
    }, 300)
  }

  const filteredGames = bookmarkedGames.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Format the date added if available
  const formatDateAdded = (timestamp) => {
    if (!timestamp) return null
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).format(date)
  }

  return (
    <div className="library-page-wrapper">
      <Container className={`library-page py-5 ${fadeIn ? 'fade-in' : ''}`}>
        <header className="library-header mb-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <h1 className="library-title">
              <div className="icon-container">
                <FaGamepad className="icon-game" />
              </div>
              <span>My Game Library</span>
            </h1>
            <Link to="/" className="browse-button">
              <span>Discover Games</span> <FaArrowRight className="ms-2" />
            </Link>
          </div>
          <div className="library-stats">
            <div className="stat-pill">
              {bookmarkedGames.length} {bookmarkedGames.length === 1 ? 'game' : 'games'} in collection
            </div>
          </div>
        </header>

        {bookmarkedGames.length > 0 ? (
          <>
            <Row className="mb-4">
              <Col lg={6} md={8} sm={12} className="mx-auto">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search your library..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search games"
                  />
                  {searchTerm && (
                    <Button 
                      variant="link" 
                      className="clear-search" 
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear search"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </Col>
            </Row>

            {filteredGames.length === 0 ? (
              <div className="no-results">
                <FaSearch size={28} className="no-results-icon" />
                <h3>No games found</h3>
                <p>No games matching "<strong>{searchTerm}</strong>" were found in your library</p>
                <Button 
                  variant="outline-primary"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {filteredGames.map(game => (
                  <Col key={game.id}>
                    <Link to={`/game/${game.id}`} className="game-card-link">
                      <Card className="game-card">
                        <div className="card-img-wrapper">
                          {game.background_image ? (
                            <img 
                              src={game.background_image} 
                              alt={game.name}
                              className="card-img"
                            />
                          ) : (
                            <div className="card-img-placeholder">
                              <FaGamepad size={36} />
                            </div>
                          )}
                          
                          <div className="card-overlays">
                            {game.rating && (
                              <div className="rating-badge">
                                <FaStar className="rating-star" />
                                <span>{game.rating.toFixed(1)}</span>
                              </div>
                            )}
                            
                            <Button 
                              variant="danger"
                              className="remove-button"
                              disabled={isRemoving}
                              onClick={(e) => handleRemoveBookmark(game.id, e)}
                              aria-label="Remove from library"
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="card-content">
                          <h3 className="game-title">{game.name}</h3>
                          
                          <div className="game-meta">
                            {game.genres && game.genres.length > 0 && (
                              <div className="genres-list">
                                {game.genres.slice(0, 2).map((genre, index) => (
                                  <span key={index} className="genre-tag">
                                    {genre.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {game.added && (
                              <div className="added-date">
                                <FaRegClock className="date-icon" />
                                <span>Added {formatDateAdded(game.added)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </>
        ) : (
          <div className="empty-library">
            <div className="empty-content">
              <div className="empty-icon-container">
                <FaGamepad className="empty-icon" />
      
              <h2>Your library is empty</h2>
              <p>Start building your collection by browsing and bookmarking games you're interested in.</p>
              <Link to="/" className="cta-button">
                Discover Games <FaArrowRight className="ms-2" />
              </Link>
            </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default LibraryPage