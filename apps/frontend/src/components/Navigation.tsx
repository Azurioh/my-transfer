import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav
      style={{
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        marginBottom: '2rem',
      }}>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '2rem',
          margin: 0,
          padding: 0,
        }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ textDecoration: 'none', color: '#007bff' }}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" style={{ textDecoration: 'none', color: '#007bff' }}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
