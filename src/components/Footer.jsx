import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaXTwitter, FaFacebook, FaInstagram, FaGamepad } from 'react-icons/fa6'
import { FaCcVisa, FaCcMastercard, FaPaypal, FaApple } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const navigate = useNavigate()

  const onSubscribe = () => {
    navigate('/')
  }

  return (
    <footer className="footer">
      <Container>
        <Row className="footer-top">
          {/* Logo & Description */}
          <Col xs={12} md={3} className="footer-brand mb-4 mb-md-0">
            <h4 className="footer-title">GameVault</h4>
            <p className="footer-text">
              Your go-to platform for exploring, managing, and discussing the best games out there.
            </p>
            <div className="footer-icons">
              <a href="#" rel="noreferrer"><FaXTwitter /></a>
              <a href="#"  rel="noreferrer"><FaFacebook /></a>
              <a href="#"  rel="noreferrer"><FaInstagram /></a>
              <a href="#" rel="noreferrer"><FaGamepad /></a>
            </div>
          </Col>

          {/* Navigation Links */}
          <Col xs={12} md={3} className="footer-links mb-4 mb-md-0">
            <h5>Explore</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Discover Games</a></li>
              <li><a href="/library">Saved Games</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </Col>

          {/* Help & Support */}
          <Col xs={12} md={3} className="footer-links mb-4 mb-md-0">
            <h5>Help</h5>
            <ul>
              <li>Support</li>
              <li>Reach Out</li>
              <li>FAQs</li>
              <li>Privacy</li>
              <li>Terms & Conditions</li>
            </ul>
          </Col>

          {/* Newsletter Section */}
          <Col xs={12} md={3} className="footer-subscribe mb-4 mb-md-0">
            <h5>Join Newsletter</h5>
            <p>Get the scoop on game launches, updates, and offers.</p>
            <Form className="subscribe-form" onSubmit={onSubscribe}>
              <Form.Control type="email" placeholder="Enter your email" />
              <Button type="submit" variant="primary">Join</Button>
            </Form>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="footer-bottom text-center">
          <Col xs={12}>
            <p className="text-center mb-0">© {new Date().getFullYear()} GameVault. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
