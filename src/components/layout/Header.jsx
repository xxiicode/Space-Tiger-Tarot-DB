import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { useAuth } from '../../hooks/useAuth';

const Nav = styled.nav`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md} 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: ${theme.shadows.md};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Logo = styled(Link)`
  color: ${theme.colors.light};
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: 700;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.shadows.md};
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.light};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${theme.colors.accent};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover:after,
  &.active:after {
    transform: scaleX(1);
  }

  &.active {
    color: ${theme.colors.accent};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.light};
  font-size: ${theme.typography.fontSize.xl};
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Space Tiger Tarot</Logo>
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          <NavLink
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/library"
            className={location.pathname === '/library' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Library
          </NavLink>
          <NavLink
            to="/search"
            className={location.pathname === '/search' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/admin"
                className={location.pathname.startsWith('/admin') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </NavLink>
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className={location.pathname === '/login' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}; 