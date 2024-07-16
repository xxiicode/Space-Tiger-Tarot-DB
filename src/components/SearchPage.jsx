import React, { useState } from 'react';
import { collection, getDocs, query, terminate, where } from 'firebase/firestore';
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
        keyword: ''
    });

    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const capitalizeFirstLetterOfWords = (string) => {
        return string.split(' ')
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                     .join(' ');
    };
    
    const handleSearch = async (e) => {
        e.preventDefault();
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

        // Ejecutamos la consulta
        const querySnapshot = await getDocs(q);

            // Log de los datos de cada documento
    querySnapshot.forEach(doc => {
        console.log('Card Data:', doc.data());
    });

        // Filtrar resultados
        const filteredResults = querySnapshot.docs
            .map(doc => ({ ...doc.data(), id: doc.id }))
            .filter(card => {
                // Si se está buscando por nombre de carta, comparamos exactamente con la versión capitalizada
                if (searchParams.cardName) {
                    return card.cardName === capitalizedCardName;
                }
                // Aquí puedes agregar lógica para otros filtros si es necesario
                return true;
            });

        setResults(filteredResults);
    };

    return (
        <div>
            <h1>Search for Tarot Cards</h1>
            <form onSubmit={handleSearch}>
                <div>
                    <label>
                        Card Name:
                        <input
                            type="text"
                            name="cardName"
                            value={searchParams.cardName}
                            onChange={handleChange}
                            placeholder="Enter card name"
                        />
                    </label>

                    <label>
                        Card Number:
                        <select name="cardNumber" value={searchParams.cardNumber} onChange={handleChange}>
                            <option value="">Select number</option>
                            {[...Array(22).keys()].map((number) => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Element:
                        <select name="element" value={searchParams.element} onChange={handleChange}>
                            <option value="">All Elements</option>
                            <option value="Air">Air</option>
                            <option value="Earth">Earth</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                        </select>
                    </label>

                    <label>
                        Zodiac:
                        <select name="zodiac" value={searchParams.zodiac} onChange={handleChange}>
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
                    </label>
                </div>
                <div>
                    <label>
                        Planet:
                        <select name="planet" value={searchParams.planet} onChange={handleChange}>
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
                    </label>

                    <label>
                        Suit:
                        <select name="suit" value={searchParams.suit} onChange={handleChange}>
                            <option value="">All Suits</option>
                            <option value="Wands">Wands</option>
                            <option value="Swords">Swords</option>
                            <option value="Cups">Cups</option>
                            <option value="Pentacles">Pentacles</option>
                        </select>
                    </label>

                    <label>
                        Theme:
                        <input
                            type="text"
                            name="theme"
                            value={searchParams.theme}
                            onChange={handleChange}
                            placeholder="Enter theme"
                        />
                    </label>

                    <label>
                        Keyword/Theme:
                        <input
                            type="text"
                            name="keyword"
                            value={searchParams.keyword}
                            onChange={handleChange}
                            placeholder="Enter keyword or theme"
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Search</button>
                </div>
            </form>
            <div>
                {results.length > 0 ? (
                    results.map((card) => (
                        <div key={card.id}>
                            <h2>{card.cardName}</h2>
                            <p>{card.cardNumber}</p>
                            <p>{card.arcana}</p>
                            <p>{card.element}</p>
                            <p>{card.zodiac.join(', ')}</p>
                            <p>{card.planet}</p>
                            <p>{card.theme.join(', ')}</p>
                            <p>{card.keyword.join(', ')}</p>
                            <img src={`https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o/${card.imageUrl}?alt=media`} alt={card.cardName} />
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};