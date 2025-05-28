import styled from 'styled-components';

export const Body = styled.div`
  background-color: white;
  font-family: sans-serif;
`;

export const TopBar = styled.div`
  background-color: black;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.25rem 1rem;
  gap: 0.5rem;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const TopButton = styled.button`
  background-color: #2d2d2d;
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: bold;
  color: white; /* Ensure text is white */
  fill: white;  /* For SVG icons if any */
  &:hover {
    background-color: #3d3d3d;
  }
  span, i {
    color: white !important; /* Ensure both text and icon are white */
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 9999px;
  width: 5rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const Tagline = styled.div`
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  width: 10rem;
  height: 1.75rem;
  background: white;
  position: relative;
`;

export const SearchInput = styled.input`
  padding: 0.125rem 2rem 0.125rem 0.5rem;
  font-size: 0.75rem;
  outline: none;
  border: none;
  width: 100%;
  background: transparent;
`;

export const SearchIcon = styled.i`
  position: absolute;
  right: 0.5rem;
  color: #4b5563;
  pointer-events: none;
  font-size: 1rem;
`;

export const Nav = styled.nav`
  padding: 0 1.5rem;
  border-top: 1px solid #9ca3af;
  font-size: 0.75rem;
  font-weight: 400;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
`;

export const NavItem = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

export const Main = styled.main`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
`;

export const ProductBlock = styled.div`
  background-color: #f9fafb;
  width: 100%;
  aspect-ratio: 4 / 5;
`;