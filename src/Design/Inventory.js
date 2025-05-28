import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

export const AddButton = styled.button`
  background: #111;
  color: #fff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1.5rem;
  align-self: flex-start;
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const Th = styled.th`
  background: #222;
  color: #fff;
  padding: 0.75rem;
`;

export const Td = styled.td`
  border-bottom: 1px solid #eee;
  padding: 0.75rem;
  text-align: center;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.25rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  min-width: 350px;
  max-width: 90vw;
`;

export const ModalTitle = styled.h3`
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 0.25rem;
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 0.25rem;
  resize: vertical;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 0.25rem;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const CancelButton = styled.button`
  background: #eee;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  background: #111;
  color: #fff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
`;

export const ActionButton = styled.button`
  background: #e11d48;
  color: #fff;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  margin: 0 0.25rem;
  cursor: pointer;
  &:hover {
    background: #be123c;
  }
`;

export const EditButton = styled(ActionButton)`
  background: #2563eb;
  &:hover {
    background: #1d4ed8;
  }
`;

export const ConfirmOverlay = styled(ModalOverlay)`
  z-index: 200;
`;

export const ConfirmBox = styled(ModalContent)`
  min-width: 300px;
  text-align: center;
`;