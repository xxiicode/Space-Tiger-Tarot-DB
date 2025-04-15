import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.light};
  padding: ${theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: ${theme.colors.accent};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    margin-bottom: ${theme.spacing.sm};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const SocialLink = styled.a`
  color: ${theme.colors.light};
  font-size: ${theme.typography.fontSize.xl};
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Space Tiger Tarot</h3>
          <p>Tu guía en el mundo del tarot y la espiritualidad.</p>
        </FooterSection>
        <FooterSection>
          <h3>Enlaces Rápidos</h3>
          <p>Biblioteca de Cartas</p>
          <p>Búsqueda Avanzada</p>
          <p>Área de Administración</p>
        </FooterSection>
        <FooterSection>
          <h3>Contacto</h3>
          <p>Email: contacto@spacetigertarot.com</p>
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
}; 