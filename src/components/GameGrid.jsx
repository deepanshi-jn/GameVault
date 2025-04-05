import { Row, Col, Alert, Spinner } from 'react-bootstrap'
import GameCard from './GameCard'
import './GameGrid.css'

const GameGrid = ({ games, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading games...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-3">
        Error loading games: {error}
      </Alert>
    )
  }

  if (!games || games.length === 0) {
    return (
      <Alert variant="info" className="my-3">
        No games found matching your criteria. Try adjusting your filters.
      </Alert>
    )
  }

  return (
    <div className="game-grid-wrapper">
    <div className="game-grid">
      <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
        {games.map(game => (
          <Col key={game.id}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </div>
  </div>
  )
}

export default GameGrid
