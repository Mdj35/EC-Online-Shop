import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: #d1d5db;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    merchandise: 0,
    cosmetics: 0,
    others: 0,
  });

 useEffect(() => {
  fetch('https://vynceianoani.helioho.st/ecos/stats.php')
    .then(res => res.json())
    .then(data => {
      setStats(data);
    });
}, []);

  return (
    <Grid>
      <Card>
        <p style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Total Products</p>
        <p style={{ fontSize: '2.25rem', fontWeight: '800' }}>{stats.total}</p>
      </Card>
      <Card>
        <p style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Merchandise</p>
        <p style={{ fontSize: '2.25rem', fontWeight: '800' }}>{stats.merchandise}</p>
      </Card>
      <Card>
        <p style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Cosmetics</p>
        <p style={{ fontSize: '2.25rem', fontWeight: '800' }}>{stats.cosmetics}</p>
      </Card>
      <Card>
        <p style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Others</p>
        <p style={{ fontSize: '2.25rem', fontWeight: '800' }}>{stats.others}</p>
      </Card>
    </Grid>
  );
}