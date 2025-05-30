import styled from 'styled-components';

export const PageContainer = styled.div`
  background-color: white;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
`;

export const TopBar = styled.div`
  background-color: black;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
`;

export const BackButton = styled.button`
  background-color: #2d2d2d;
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
`;

export const Container = styled.div`
  max-width: 72rem;
  margin: 1.5rem auto;
  padding: 0 1rem;
`;

export const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  text-align: center;
`;

export const LogoText = styled.div`
  background-color: black;
  color: white;
  font-size: 0.75rem;
  font-weight: normal;
  border-radius: 9999px;
  padding: 0.5rem 1.5rem;
  font-family: Arial, sans-serif;
`;

export const SubText = styled.div`
  font-size: 0.5rem;
  color: black;
  margin-top: 0.25rem;
`;

export const CheckoutLabel = styled.div`
  border-top: 1px solid #d1d5db;
  padding-top: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const CheckoutTag = styled.div`
  display: inline-block;
  background-color: black;
  color: white;
  font-size: 1rem;
  font-weight: normal;
  padding: 0.25rem 1rem;
  font-family: Arial, sans-serif;
`;

export const FlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media(min-width: 1024px) {
    flex-direction: row;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: black;
  font-weight: normal;
  font-family: Arial, sans-serif;
  margin-bottom: 0.5rem;
`;

export const SectionIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background-color: black;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const Form = styled.form`
  max-width: 24rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const Input = styled.input`
  border: 1px solid black;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  width: 96%;
  font-family: Arial, sans-serif;
`;

export const PaymentButtons = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 24rem;
`;

export const PayPalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00b050;
  border-radius: 9999px;
  width: 9rem;
  height: 2.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  font-family: Arial, sans-serif;
`;

export const CODButton = styled.button`
  background-color: #d1d5db;
  border-radius: 9999px;
  width: 9rem;
  height: 2.5rem;
  color: black;
  font-weight: bold;
  font-size: 1.125rem;
  font-family: Arial, sans-serif;
`;

export const RightSection = styled.div`
  flex: 1;
  background-color: #e5e7eb;
  padding: 1.5rem;
  max-width: 24rem;
`;

export const SummaryTitle = styled.h2`
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  font-family: Arial, sans-serif;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-family: Arial, sans-serif;
`;

export const SummaryTotal = styled(SummaryRow)`
  font-weight: bold;
`;

export const BottomButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;
`;

export const CancelButton = styled(CODButton)``;
export const OrderNowButton = styled(PayPalButton)`
  background-color: black;
`;