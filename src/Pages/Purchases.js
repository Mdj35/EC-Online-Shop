import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
 display: flex;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OrderCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: #f9fafb;
`;

const OrderHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.5rem;
  th, td {
    border: 1px solid #e5e7eb;
    padding: 0.5rem;
    text-align: left;
  }
  th {
    background: #f3f4f6;
  }
`;

const NoPurchases = styled.div`
  text-align: center;
  color: #888;
  margin-top: 2rem;
`;
const MainContent = styled.div`
  flex: 1;
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2rem;
  overflow-y: auto;
  max-height: 90vh;
`;
export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://vynceianoani.helioho.st/ecos/purchases.php?purchases=1')
      .then(res => res.json())
      .then(res => {
        if (res.success) setPurchases(res.purchases);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
        <Sidebar />
        <MainContent>
      <Title>Purchase Records</Title>
      {loading ? (
        <div>Loading...</div>
      ) : purchases.length === 0 ? (
        <NoPurchases>No purchases found.</NoPurchases>
      ) : (
        purchases.map(order => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <span>Order #{order.id}</span>
              <span>{order.created_at}</span>
            </OrderHeader>
            <div>
              <strong>Name:</strong> {order.first_name} {order.last_name} <br />
              <strong>Email:</strong> {order.email} <br />
              <strong>Address:</strong> {order.address} <br />
              <strong>Payment:</strong> {order.payment} <br />
              <strong>Total:</strong> ₱{Number(order.total).toLocaleString()}
            </div>
            <ItemsTable>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>₱{Number(item.price).toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>₱{(Number(item.price) * Number(item.quantity)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </ItemsTable>
          </OrderCard>
        ))
      )}
      </MainContent>
    </Container>
  );
  
}