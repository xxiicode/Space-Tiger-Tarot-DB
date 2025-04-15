import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme/theme';
import { collection, getDocs, query, orderBy, limit, startAfter, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const BlogContainer = styled.div`
  padding: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const Description = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.lg};
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const FilterButton = styled.button`
  background: ${props => props.active ? theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? theme.colors.primaryDark : theme.colors.primaryLight};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const PostCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const PostTitle = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.lg};
`;

const PostExcerpt = styled.p`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

const PageButton = styled.button`
  background: ${props => props.active ? theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? theme.colors.primaryDark : theme.colors.primaryLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = async (category = 'all', startAfterDoc = null) => {
    try {
      let q = query(
        collection(db, 'blogPosts'),
        orderBy('createdAt', 'desc'),
        limit(6)
      );

      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      if (category !== 'all') {
        q = query(q, where('category', '==', category));
      }

      const snapshot = await getDocs(q);
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === 6);
      setPosts(prev => startAfterDoc ? [...prev, ...newPosts] : newPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setLastVisible(null);
    fetchPosts(newCategory);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    fetchPosts(category, lastVisible);
  };

  if (loading && posts.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <BlogContainer>
      <Header>
        <Title>Blog</Title>
        <Description>
          Explora nuestros artículos sobre tarot, astrología y espiritualidad
        </Description>
      </Header>

      <Filters>
        <FilterButton
          active={category === 'all'}
          onClick={() => handleCategoryChange('all')}
        >
          Todos
        </FilterButton>
        <FilterButton
          active={category === 'tarot'}
          onClick={() => handleCategoryChange('tarot')}
        >
          Tarot
        </FilterButton>
        <FilterButton
          active={category === 'astrology'}
          onClick={() => handleCategoryChange('astrology')}
        >
          Astrología
        </FilterButton>
        <FilterButton
          active={category === 'spirituality'}
          onClick={() => handleCategoryChange('spirituality')}
        >
          Espiritualidad
        </FilterButton>
      </Filters>

      <Grid>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostImage src={post.imageUrl} alt={post.title} />
            <PostContent>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <PostMeta>
                <span>{new Date(post.createdAt.toDate()).toLocaleDateString()}</span>
                <span>{post.category}</span>
              </PostMeta>
            </PostContent>
          </PostCard>
        ))}
      </Grid>

      <Pagination>
        <PageButton
          onClick={handleLoadMore}
          disabled={!hasMore || loading}
        >
          {loading ? 'Cargando...' : 'Cargar más'}
        </PageButton>
      </Pagination>
    </BlogContainer>
  );
};

export default Blog; 