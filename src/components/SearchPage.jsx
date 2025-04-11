import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../assets/Connection/firebaseConfig';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    cardName: '',
    cardNumber: '',
    element: '',
    zodiac: '',
    planet: '',
    suit: '',
    theme: '',
    keyword: '',
  });

  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const capitalizeFirstLetterOfWords = (string) => {
    if (!string) return '';
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const hasSearchParams = Object.values(searchParams).some((value) => value);

    if (!hasSearchParams) {
      setErrorMessage('No search criteria selected.');
      return;
    }

    setErrorMessage('');

    const cardsCollection = collection(db, 'Cards');
    let q = cardsCollection;

    const capitalizedCardName = capitalizeFirstLetterOfWords(searchParams.cardName);

    if (searchParams.cardName) {
      q = query(q, where('cardName', '==', capitalizedCardName));
    }
    if (searchParams.cardNumber) {
      q = query(q, where('cardNumber', '==', searchParams.cardNumber));
    }
    if (searchParams.element) {
      q = query(q, where('element', '==', searchParams.element));
    }
    if (searchParams.zodiac) {
      q = query(q, where('zodiac', 'array-contains', searchParams.zodiac));
    }
    if (searchParams.planet) {
      q = query(q, where('planet', '==', searchParams.planet));
    }
    if (searchParams.suit) {
      q = query(q, where('suit', '==', searchParams.suit));
    }
    if (searchParams.theme) {
      const capitalizedTheme = capitalizeFirstLetterOfWords(searchParams.theme);
      q = query(q, where('theme', 'array-contains', capitalizedTheme));
    }
    if (searchParams.keyword) {
      const capitalizedKeyword = capitalizeFirstLetterOfWords(searchParams.keyword);
      q = query(q, where('keyword', 'array-contains', capitalizedKeyword));
    }

    try {
      const querySnapshot = await getDocs(q);

      const resultsWithImageUrls = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageUrl = `https://spacetiger9.imgix.net/${data.imageUrl}?w=150`;
          return { ...data, id: doc.id, imageUrl };
        })
      );

      setResults(resultsWithImageUrls);
    } catch (error) {
      console.error('Error searching cards:', error);
      setErrorMessage('An error occurred while searching. Please try again.');
    }
  };

  const handleReset = () => {
    setSearchParams({
      cardName: '',
      cardNumber: '',
      element: '',
      zodiac: '',
      planet: '',
      suit: '',
      theme: '',
      keyword: '',
    });
    setResults([]);
  };

  return (
    <div className="container p-3 py-5">
      <h1 className="text-center mb-5">Search for Tarot Cards</h1>
      <form className="justify-content-center" onSubmit={handleSearch}>
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="cardName"
                type="text"
                name="cardName"
                value={searchParams.cardName}
                onChange={handleChange}
                placeholder="Enter card name"
              />
              <label>Card Name:</label>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="cardNumber"
                name="cardNumber"
                value={searchParams.cardNumber}
                onChange={handleChange}
              >
                <option value="">Select number</option>
                {[...Array(22).keys()].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              <label>Card Number:</label>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-2">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="element"
                name="element"
                value={searchParams.element}
                onChange={handleChange}
              >
                <option value="">All Elements</option>
                <option value="Air">Air</option>
                <option value="Earth">Earth</option>
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
              </select>
              <label>Element:</label>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="zodiac"
                name="zodiac"
                value={searchParams.zodiac}
                onChange={handleChange}
              >
                <option value="">All Zodiac Signs</option>
                <option value="Aries">Aries</option>
                <option value="Taurus">Taurus</option>
                <option value="Gemini">Gemini</option>
                <option value="Cancer">Cancer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Sagittarius">Sagittarius</option>
                <option value="Capricorn">Capricorn</option>
                <option value="Aquarius">Aquarius</option>
                <option value="Pisces">Pisces</option>
              </select>
              <label>Zodiac:</label>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="planet"
                name="planet"
                value={searchParams.planet}
                onChange={handleChange}
              >
                <option value="">All Planets</option>
                <option value="Mercury">Mercury</option>
                <option value="Venus">Venus</option>
                <option value="Earth">Earth</option>
                <option value="Mars">Mars</option>
                <option value="Jupiter">Jupiter</option>
                <option value="Saturn">Saturn</option>
                <option value="Uranus">Uranus</option>
                <option value="Neptune">Neptune</option>
                <option value="Pluto">Pluto</option>
                <option value="Moon">Moon</option>
                <option value="Sun">Sun</option>
              </select>
              <label>Planet:</label>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-2">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="suit"
                name="suit"
                value={searchParams.suit}
                onChange={handleChange}
              >
                <option value="">All Suits</option>
                <option value="Wands">Wands</option>
                <option value="Swords">Swords</option>
                <option value="Cups">Cups</option>
                <option value="Pentacles">Pentacles</option>
              </select>
              <label>Suit:</label>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="theme"
                type="text"
                name="theme"
                value={searchParams.theme}
                onChange={handleChange}
                placeholder="Enter theme"
              />
              <label>Theme:</label>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="keyword"
                type="text"
                name="keyword"
                value={searchParams.keyword}
                onChange={handleChange}
                placeholder="Enter keyword or theme"
              />
              <label>Keyword/Theme:</label>
            </div>
          </div>
        </div>
        <div className="row row-cols-2 justify-content-center">
          <div className="col-1">
            <button className="btn btn-light" type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="col-1">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>

      <div className="card-result row row-cols-auto mt-5 ">
        {errorMessage && <p className="text-center mt-3 text-danger">{errorMessage}</p>}
        {results.length > 0 ? (
          results.map((card) => (
            <div key={card.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={card.imageUrl} className="card-img-top" alt={card.cardName} />
                <div className="card-body">
                  <h5 className="card-title">{card.cardName}</h5>
                  <p className="card-text">Number: {card.cardNumber}</p>
                  <Link to={`/card-detail/${card.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5"> No results found</p>
        )}
      </div>
    </div>
  );
};
