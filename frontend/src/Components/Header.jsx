import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        {isLoggedIn ? (
          <>
            <li style={styles.navItem}>
              <Link to="/all">User List</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/todo">Todo List</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/todo/add">Add Todo</Link>
            </li>
            <li style={styles.navItem}>
              <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li style={styles.navItem}>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// Simple styles for the navbar
const styles = {
  navbar: {
    backgroundColor: '',
    padding: '10px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '20px',
  },
  logoutButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Header;
