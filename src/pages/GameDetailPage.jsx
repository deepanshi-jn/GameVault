import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Carousel, Badge, Spinner, Alert, ProgressBar } from 'react-bootstrap'
import { FaStar, FaBookmark, FaCalendar, FaMicrochip, FaGamepad, FaArrowLeft, FaGlobe, FaDollarSign, FaCode, FaBuilding, FaInfoCircle } from 'react-icons/fa'
import { fetchGameDetails, fetchGameScreenshots } from '../services/api'
import { addBookmark, removeBookmark } from '../redux/features/bookmarksSlice'
import './GameDetailPage.css'

const GameDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('description')

  const dispatch = useDispatch()
  const bookmarkedGames = useSelector(state => state.bookmarks.bookmarkedGames)
  const isBookmarked = bookmarkedGames.some(bookmark => bookmark.id === parseInt(id))

  useEffect(() => {
    const loadGameData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [gameData, screenshotsData] = await Promise.all([
          fetchGameDetails(id),
          fetchGameScreenshots(id)
        ])

        setGame(gameData)
        setScreenshots(screenshotsData)
        document.title = `${gameData.name} | GameVault`
      } catch (err) {
        console.error('Error loading game details:', err)
        setError(err.message || 'Failed to load game details')
      } finally {
        setIsLoading(false)
      }
    }

    loadGameData()

    return () => {
      document.title = 'GameVault'
    }
  }, [id])

  const toggleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(parseInt(id)))
    } else if (game) {
      dispatch(addBookmark({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating
      }))
    }
  }

  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'TBA'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderRatingBar = (rating) => {
    if (!rating) return null
    const percentage = (rating / 5) * 100
    let variant = 'danger'

    if (percentage >= 80) variant = 'success'
    else if (percentage >= 60) variant = 'info'
    else if (percentage >= 40) variant = 'warning'

    return (
      <div className="rating-bar">
        <ProgressBar now={percentage} variant={variant} className="mt-1" />
        <small className="mt-1 d-block text-secondary">
          {rating}/5 ({percentage.toFixed(0)}%)
        </small>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Container className="loading-container">
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h4 className="text-secondary">Loading game details...</h4>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="error-container my-5">
        <Alert variant="danger" className="text-center py-4">
          <FaInfoCircle size={32} className="mb-3" />
          <h4>Error loading game details</h4>
          <p>{error}</p>
          <div className="mt-4">
            <Button variant="outline-primary" onClick={() => navigate('/')}> <FaArrowLeft className="me-2" /> Return to Home </Button>
          </div>
        </Alert>
      </Container>
    )
  }

  if (!game) {
    return (
      <Container className="not-found-container my-5">
        <Alert variant="warning" className="text-center py-4">
          <FaInfoCircle size={32} className="mb-3" />
          <h4>Game Not Found</h4>
          <p>We couldn't find the game you're looking for.</p>
          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate('/')}> <FaArrowLeft className="me-2" /> Browse Games </Button>
          </div>
        </Alert>
      </Container>
    )
  }

  return (
    <>
      <div className="game-hero-section" style={{ backgroundImage: `url(${game.background_image})` }}>
        <div className="hero-overlay">
          <Container>
            <div className="hero-content">
              <h1 className="game-title">{game.name}</h1>
              <div className="game-meta">
                {game.rating > 0 && (
                  <div className="rating me-4">
                    <FaStar className="star-icon me-2" />
                    <span className="rating-value">{game.rating.toFixed(1)}</span>
                  </div>
                )}
                {game.released && (
                  <div className="released me-4">
                    <FaCalendar className="me-2" />
                    <span>{formatReleaseDate(game.released)}</span>
                  </div>
                )}
              </div>
              <div className="game-genres">
                {game.genres && game.genres.map((genre) => (
                  <span key={genre.id} className="custom-badge">{genre.name}</span>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="game-detail-page py-4">
        <Row className="mb-4">
          <Col>
            <div className="navigation-bar mb-4">
              <Link to="/" className="back-link"> <FaArrowLeft className="me-2" /> Back to Games </Link>
            </div>
            <div className="content-tabs mb-4">
              <Button className={`tab-button me-2 mb-2 ${activeTab === 'description' ? 'active-tab' : ''}`} onClick={() => setActiveTab('description')}>About Game</Button>
              <Button className={`tab-button me-2 mb-2 ${activeTab === 'screenshots' ? 'active-tab' : ''}`} onClick={() => setActiveTab('screenshots')}>Screenshots</Button>
              <Button className={`tab-button mb-2 ${activeTab === 'requirements' ? 'active-tab' : ''}`} onClick={() => setActiveTab('requirements')}>
                <FaMicrochip className="me-2" />System Requirements
              </Button>
            </div>
          </Col>
        </Row>

        {activeTab === 'screenshots' && screenshots.length > 0 && (
          <Row className="mb-4">
            <Col>
              <div className="section-header mb-3"><h3>Screenshots</h3></div>
              <Carousel className="game-carousel" indicators controls>
                {screenshots.map(screenshot => (
                  <Carousel.Item key={screenshot.id}>
                    <img className="d-block w-100" src={screenshot.image} alt={`Screenshot of ${game.name}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        )}

        {activeTab === 'description' && (
          <Row>
            <Col lg={8}>
              <div className="game-description-card">
                <div className="section-header mb-3"><h3>About {game.name}</h3></div>
                {game.rating > 0 && (
                  <div className="game-rating-details mb-4">
                    <h5 className="mb-2">Game Rating</h5>
                    {renderRatingBar(game.rating)}
                  </div>
                )}
                <div className="game-description" dangerouslySetInnerHTML={{ __html: game.description }} />
              </div>
            </Col>

            <Col lg={4}>
              <div className="game-details-card">
                <div className="section-header mb-3"><h3>Game Details</h3></div>
                {game.platforms && (
                  <div className="detail-item">
                    <h5><FaGamepad className="me-2" />Platforms</h5>
                    <p className="platforms-list">
                      {game.platforms.map(p => (
                        <Badge key={p.platform.id} bg="light" text="dark" className="platform-badge me-2 mb-2">{p.platform.name}</Badge>
                      ))}
                    </p>
                  </div>
                )}
                {game.developers?.length > 0 && (
                  <div className="detail-item">
                    <h5><FaCode className="me-2" />Developer</h5>
                    <p>{game.developers.map(dev => dev.name).join(', ')}</p>
                  </div>
                )}
                {game.publishers?.length > 0 && (
                  <div className="detail-item">
                    <h5><FaBuilding className="me-2" />Publisher</h5>
                    <p>{game.publishers.map(pub => pub.name).join(', ')}</p>
                  </div>
                )}
                {game.esrb_rating && (
                  <div className="detail-item">
                    <h5>Age Rating</h5>
                    <p><Badge bg="dark" className="esrb-badge">{game.esrb_rating.name}</Badge></p>
                  </div>
                )}
                {game.website && (
                  <div className="detail-item">
                    <h5><FaGlobe className="me-2" />Website</h5>
                    <a href={game.website} target="_blank" rel="noopener noreferrer" className="website-link">Visit Official Website</a>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}

        {activeTab === 'requirements' && (
          <Row>
            <Col>
              {game.platforms && game.platforms.some(p => p.requirements) ? (
                <div className="system-requirements-card">
                  <div className="section-header mb-3">
                    <h3><FaMicrochip className="me-2" />System Requirements</h3>
                  </div>
                  {game.platforms.filter(p => p.requirements?.minimum || p.requirements?.recommended).map(p => (
                    <div key={p.platform.id} className="platform-requirements">
                      <h4 className="platform-name">{p.platform.name}</h4>
                      <Row>
                        {p.requirements.minimum && (
                          <Col md={p.requirements.recommended ? 6 : 12}>
                            <div className="requirements-item">
                              <h6 className="req-header">Minimum Requirements</h6>
                              <div className="req-content">{p.requirements.minimum}</div>
                            </div>
                          </Col>
                        )}
                        {p.requirements.recommended && (
                          <Col md={p.requirements.minimum ? 6 : 12}>
                            <div className="requirements-item recommended">
                              <h6 className="req-header">Recommended Requirements</h6>
                              <div className="req-content">{p.requirements.recommended}</div>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <Alert variant="info">
                    <h5>No System Requirements Available</h5>
                    <p>System requirements for this game haven't been provided by the publisher.</p>
                  </Alert>
                </div>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default GameDetailPage
