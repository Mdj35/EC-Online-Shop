// src/components/Charts.js
import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const ChartCard = styled.div`
  background: #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Charts() {
  return (
    <Grid>
      <ChartCard>
        <img
          src="https://storage.googleapis.com/a1aa/image/d5dc3629-f2d2-44c5-1293-ba2fd2c5ffce.jpg"
          alt="Donut Chart"
          height="100"
        />
      </ChartCard>
      <ChartCard>
        <img
          src="https://storage.googleapis.com/a1aa/image/0538c6a2-134b-4849-1d44-38dc6b1087a9.jpg"
          alt="Bar Chart"
          height="100"
        />
      </ChartCard>
    </Grid>
  );
}
