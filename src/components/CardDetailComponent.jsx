import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const CardDetailComponent = ({ tarotCard }) => {
  return (
    <div className="container p-3 py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://spacetiger9.imgix.net/${tarotCard.imageUrl}?w=500`}
            alt={tarotCard.cardName}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1>{tarotCard.cardName}</h1>
          <p>Number: {tarotCard.cardNumber}</p>
          <p>Arcana: {tarotCard.arcana}</p>
          {tarotCard.arcana === 'Minor Arcana' && <p>Suit: {tarotCard.suit}</p>}
          <p>Element: {tarotCard.element}</p>
          <p>Zodiac: {tarotCard.zodiac.join(', ')}</p>
          <p>Planet: {tarotCard.planet}</p>
          <p>Theme: {tarotCard.theme.join(', ')}</p>
          <p>Keyword: {tarotCard.keyword.join(', ')}</p>
          <Link to="/library" className="btn btn-primary">
            Back to Library
          </Link>
        </div>
      </div>
    </div>
  );
};

CardDetailComponent.propTypes = {
  tarotCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cardName: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    arcana: PropTypes.string.isRequired,
    suit: PropTypes.string,
    element: PropTypes.string.isRequired,
    zodiac: PropTypes.arrayOf(PropTypes.string).isRequired,
    planet: PropTypes.string.isRequired,
    theme: PropTypes.arrayOf(PropTypes.string).isRequired,
    keyword: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
