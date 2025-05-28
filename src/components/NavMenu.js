// src/components/NavMenu.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  padding: 0 1.5rem;
  border-top: 1px solid #9ca3af;
  font-size: 0.75rem;
`;

const List = styled.ul`
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

export default function NavMenu() {
  return (
    <Nav>
      <List>
        <li><StyledLink to="/">OUR PRODUCTS</StyledLink></li>
        <li><StyledLink to="/">MERCHANDISE</StyledLink></li>
        <li><StyledLink to="/">COSMETICS</StyledLink></li>
        <li><StyledLink to="/">OTHERS</StyledLink></li>
      </List>
    </Nav>
  );
}
