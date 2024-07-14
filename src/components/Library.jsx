import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../assets/Connection/firebaseConfig.js";

export const Library = () => {
    const [cards, setCards] = useState([]);

    const cardsCollection = collection(db, "Cards");

    const getCards = async () => {
        const data = await getDocs(cardsCollection);
        const cardsWithImageUrls = await Promise.all(
            data.docs.map(async (doc) => {
                const cardData = doc.data();
                const storage = getStorage();
                const imageUrl = await getDownloadURL(ref(storage, cardData.imageUrl));
                return { ...cardData, id: doc.id, imageUrl };
            })
        );
        setCards(cardsWithImageUrls);
    };

    useEffect(() => {
        getCards();
    }, []);

    return (
        <div className="container">
            <h1>Library</h1>
            <div className="cards-grid">
                {cards.map((card) => (
                    <Link to={`/card-detail/${card.id}`} key={card.id} className="card">
                        <img src={card.imageUrl} alt={card.cardName} />
                        <p>{card.cardName}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
