// src/components/Header.js
import React from 'react';
import styled from 'styled-components';

const TopBar = styled.header`
  background-color: #374151;
  color: #e5e7eb;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  border-top-right-radius: 1rem;
`;

export default function Header() {
  return <TopBar>EC Online Shop</TopBar>;
}
