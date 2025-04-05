import { useRef, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import HeroSection from '../components/HeroSection'
import GameGrid from '../components/GameGrid'
import Pagination from '../components/Pagination'
import { fetchGames } from '../services/api'
import './HomePage.css'

const HomePage = () => {
  const [searchParams] = useSearchParams()
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 1,
    totalPages: 0
  })

  const gameGridRef = useRef(null)

  const scrollToGameGrid = () => {
    if (gameGridRef.current) {
      gameGridRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const loadGames = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const page = parseInt(searchParams.get('page')) || 1

      const params = {
        page,
        page_size: 12,
      }

      const searchQuery = searchParams.get('search')
      if (searchQuery) params.search = searchQuery

      const genres = searchParams.get('genres')
      if (genres) params.genres = genres

      const tags = searchParams.get('tags')
      if (tags) params.tags = tags

      const dates = searchParams.get('dates')
      if (dates) params.dates = dates

      const ordering = searchParams.get('ordering')
      if (ordering) params.ordering = ordering

      const data = await fetchGames(params)
      setGames(data.results)

      const totalPages = Math.ceil(data.count / params.page_size)

      setPagination({
        count: data.count,
        currentPage: page,
        totalPages
      })
    } catch (err) {
      console.error('Error loading games:', err)
      setError(err.message || 'Failed to load games')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGames()
  }, [searchParams])

  return (
    <Container fluid className="home-page">
      <Row>
        <Col lg={3} md={4} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col lg={9} md={8} className="content-col">
            <div className='hero'>
                 <HeroSection onExploreClick={scrollToGameGrid} />
              </div>

          <div ref={gameGridRef} className="game-list-header">
            <h2>
              {searchParams.get('search')
                ? `Search results for "${searchParams.get('search')}"`
                : 'Featured Games'}
            </h2>
          </div>
          <div className='grid'> 
          <GameGrid
            games={games}
            isLoading={isLoading}
            error={error}
          />
          </div>

          {!isLoading && !error && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={() => { }}
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
