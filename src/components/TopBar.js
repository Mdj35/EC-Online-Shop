// src/components/TopBar.js
import React from 'react';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';

const Container = styled.div`
  background: black;
  color: white;
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 1rem;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const Button = styled.button`
  background: #1f2937;
  color: white;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background: #374151;
  }
`;

const Profile = styled.div`
  background: #16a34a;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

export default function TopBar() {
  return (
    <Container>
      <Button>
        <span>SHOP CART</span>
        <FaShoppingCart />
      </Button>
      <Button>CHECKOUT</Button>
      <Profile>JJ</Profile>
    </Container>
  );
}
