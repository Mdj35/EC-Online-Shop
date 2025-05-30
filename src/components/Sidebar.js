import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Aside = styled.aside`
  background: black;
  color: white;
  width: 12rem;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1.5rem;
  gap: 2rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default function Sidebar() {
  return (
    <Aside>
      <Profile>
        <img
          src="https://storage.googleapis.com/a1aa/image/3a338b7a-32a7-4fbf-7653-c7f46faae3f7.jpg"
          alt="logo"
          width="40"
          height="40"
          style={{ borderRadius: '9999px' }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Administrator</span>
      </Profile>
      <Nav>
        <Link to="/">Dashboard</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/purchases">Purchases</Link>
      </Nav>
    </Aside>
  );
}