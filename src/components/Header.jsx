import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Container,
  Nav,
  Button,
  Offcanvas,
} from 'react-bootstrap'
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from '@clerk/clerk-react'
import { BsBookmark } from 'react-icons/bs'
import { X } from 'lucide-react'
import SearchBar from './SearchBar'
import './Header.css'

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const handleClose = () => setShowSidebar(false)
  const handleShow = () => setShowSidebar(true)

  return (
    <>
      <Navbar expand="lg" className="header">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand">
            <span className="game-vault-text">GameVault</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={handleShow}
          />

          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
            <div className="search-wrapper">
              <SearchBar
                className="mx-auto"
                placeholder="Search for games..."
              />
            </div>
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link as={Link} to="/library" className="bookmark-link">
                <div className="bookmark-icon-circle">
                  <BsBookmark size={16} />
                </div>
              </Nav.Link>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="sign-in-btn">Sign In</Button>
                </SignInButton>
              </SignedOut>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={handleClose}
        placement="start"
        className="custom-sidebar d-lg-none"
      >
        <Offcanvas.Header className="sidebar-header">
          <Offcanvas.Title>Menu</Offcanvas.Title>
          <button className="close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </Offcanvas.Header>

        <Offcanvas.Body className="sidebar-body">
          <div className="search-wrapper mb-3">
            <SearchBar placeholder="Search games..." />
          </div>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/library" onClick={handleClose}>
              <div className="bookmark-icon-circle mb-3">
                <BsBookmark size={16} />
              </div>
            </Nav.Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="sign-in-btn w-100 mt-3">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Header 