import React from 'react';
import DashboardTitle from './components/DashboardTitle';
import StatsCards from './components/StatsCards';
import Charts from './components/Charts';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import styled from 'styled-components';

export  const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.section`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <Main>
        <Header />
        <Content>
          <DashboardTitle />
          <StatsCards />
          <Charts />
        </Content>
      </Main>
    </Container>
  );
}