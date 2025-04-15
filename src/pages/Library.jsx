import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme/theme';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const LibraryContainer = styled.div`
  padding: ${theme.spacing.xl};
`;

const SearchBar = styled.div`
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.md};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: white;
  font-size: ${theme.typography.fontSize.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const Card = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardInfo = styled.div`
  padding: ${theme.spacing.lg};
`;

const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const CardDescription = styled.p`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const Tag = styled.span`
  background: ${theme.colors.secondary};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
`;

const Library = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsRef = collection(db, 'tarotCards');
        const snapshot = await getDocs(cardsRef);
        const cardsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCards(cardsData);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || card.type === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <LibraryContainer>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Buscar cartas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas las cartas</option>
          <option value="major">Arcanos Mayores</option>
          <option value="minor">Arcanos Menores</option>
          <option value="cups">Copas</option>
          <option value="swords">Espadas</option>
          <option value="wands">Bastos</option>
          <option value="pentacles">Oros</option>
        </FilterSelect>
      </SearchBar>

      <Grid>
        {filteredCards.map((card) => (
          <Card key={card.id}>
            <CardImage src={card.imageUrl} alt={card.name} />
            <CardInfo>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
              <CardTags>
                <Tag>{card.type}</Tag>
                {card.keywords?.map((keyword, index) => (
                  <Tag key={index}>{keyword}</Tag>
                ))}
              </CardTags>
            </CardInfo>
          </Card>
        ))}
      </Grid>
    </LibraryContainer>
  );
};

export default Library; 