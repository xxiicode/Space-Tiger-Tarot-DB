import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme/theme';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const AdminContainer = styled.div`
  padding: ${theme.spacing.xl};
`;

const Form = styled.form`
  background: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
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

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  background: white;
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

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'major',
    description: '',
    keywords: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cardData = {
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()),
        createdAt: new Date()
      };

      await addDoc(collection(db, 'tarotCards'), cardData);
      
      // Limpiar el formulario
      setFormData({
        name: '',
        type: 'major',
        description: '',
        keywords: '',
        imageUrl: ''
      });

      alert('Carta agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar la carta:', error);
      alert('Error al agregar la carta');
    }
  };

  return (
    <AdminContainer>
      <h1>Administración de Cartas</h1>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre de la Carta</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Carta</Label>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="major">Arcano Mayor</option>
            <option value="minor">Arcano Menor</option>
            <option value="cups">Copas</option>
            <option value="swords">Espadas</option>
            <option value="wands">Bastos</option>
            <option value="pentacles">Oros</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Descripción</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Palabras Clave (separadas por comas)</Label>
          <Input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>URL de la Imagen</Label>
          <Input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit">Agregar Carta</Button>
      </Form>
    </AdminContainer>
  );
};

export default Admin; 