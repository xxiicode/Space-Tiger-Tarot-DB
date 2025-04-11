import { YoutubeFeed } from '../components/YoutubeFeed';
import { InstagramLogo } from '@phosphor-icons/react';

export const Home = () => {
  return (
    <>
      <div className="container text-center mt-4 mb-3">
        <p className="lead">
          Welcome to the home page of
          <br />
          <a href="https://www.instagram.com/spacetigertarot9/">
            <InstagramLogo size={24} color="#e883b5" />
            /SpaceTigerTarot9
          </a>
        </p>

        <p>🚧 Still under construction 🚧</p>
      </div>

      <YoutubeFeed />
    </>
  );
};
