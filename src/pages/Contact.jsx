import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme/theme';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ContactContainer = styled.div`
  padding: ${theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const Form = styled.form`
  background: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    background: ${theme.colors.border};
    cursor: not-allowed;
  }
`;

const SocialLinks = styled.div`
  margin-top: ${theme.spacing.xl};
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
`;

const SocialLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.lg};
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: new Date()
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContainer>
      <Title>Contacto</Title>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Asunto</Label>
          <Input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Mensaje</Label>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>
      </Form>

      {success && (
        <p style={{ textAlign: 'center', color: theme.colors.success, marginTop: theme.spacing.md }}>
          ¡Mensaje enviado exitosamente!
        </p>
      )}

      <SocialLinks>
        <SocialLink href="https://www.instagram.com/spacetigertarot9/" target="_blank" rel="noopener noreferrer">
          Instagram
        </SocialLink>
        <SocialLink href="https://www.youtube.com/@SpaceTigerTarot" target="_blank" rel="noopener noreferrer">
          YouTube
        </SocialLink>
      </SocialLinks>
    </ContactContainer>
  );
};

export default Contact; 