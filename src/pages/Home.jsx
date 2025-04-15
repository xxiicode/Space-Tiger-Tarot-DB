import React from 'react';
import styled from 'styled-components';
import { useYouTubeVideos } from '../hooks/useYouTubeVideos';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { theme } from '../theme/theme';

const HomeContainer = styled.div`
  padding: ${theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const VideoCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  padding: ${theme.spacing.md};
`;

const VideoTitle = styled.h3`
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
`;

const PostCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PostTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const PostExcerpt = styled.p`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const PostDate = styled.span`
  color: ${theme.colors.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const Home = () => {
  const { videos, loading: videosLoading, error: videosError } = useYouTubeVideos(
    process.env.REACT_APP_YOUTUBE_CHANNEL_ID,
    process.env.REACT_APP_YOUTUBE_API_KEY
  );

  const { posts, loading: postsLoading, error: postsError } = useBlogPosts();

  if (videosLoading || postsLoading) {
    return <div>Cargando...</div>;
  }

  if (videosError || postsError) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <HomeContainer>
      <Section>
        <SectionTitle>Últimos Videos</SectionTitle>
        <Grid>
          {videos.map((video) => (
            <VideoCard key={video.id.videoId}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VideoThumbnail
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                />
                <VideoInfo>
                  <VideoTitle>{video.snippet.title}</VideoTitle>
                </VideoInfo>
              </a>
            </VideoCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Últimos Posts</SectionTitle>
        <Grid>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <PostDate>
                {new Date(post.createdAt.toDate()).toLocaleDateString()}
              </PostDate>
            </PostCard>
          ))}
        </Grid>
      </Section>
    </HomeContainer>
  );
};

export default Home;
