// src/components/DashboardTitle.js
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 800;
  color: black;
`;

export default function DashboardTitle() {
  return <Title>Dashboard</Title>;
}
