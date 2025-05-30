import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
`;

const ChartCard = styled.div`
  background: #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Charts() {
  const [donutData, setDonutData] = useState(null);
  const [barData, setBarData] = useState(null);
useEffect(() => {
    fetch('https://vynceianoani.helioho.st/ecos/chart.php?chart=dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setDonutData({
            labels: res.product_consumption.map(d => d.name),
            datasets: [{
              data: res.product_consumption.map(d => Number(d.total_qty)),
              backgroundColor: [
                '#111', '#222', '#333', '#444', '#555', '#666', '#777', '#000'
              ],
            }]
          });
          setBarData({
            labels: res.sales_per_month.map(d => d.month),
            datasets: [{
              label: 'Sales (₱)',
              data: res.sales_per_month.map(d => Number(d.sales)),
              backgroundColor: '#111'
            }]
          });
        }
      });
  }, []);
  return (
    <Grid>
      <ChartCard>
        <h3 style={{ marginBottom: 16 }}>Most Product Consumption</h3>
        {donutData ? (
          <Doughnut data={donutData} options={{
            plugins: { legend: { position: 'bottom' } }
          }} height={220} />
        ) : (
          <div>Loading...</div>
        )}
      </ChartCard>
      <ChartCard>
        <h3 style={{ marginBottom: 16 }}>Sales Per Month</h3>
        {barData ? (
          <Bar data={barData} options={{
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }} height={220} />
        ) : (
          <div>Loading...</div>
        )}
      </ChartCard>
    </Grid>
  );
}