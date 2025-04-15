import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/Connection/firebaseConfig.js";

export const Library = () => {
    const [cards, setCards] = useState([]);

    const cardsCollection = collection(db, "Cards");

    const getCards = async () => {
        const data = await getDocs(cardsCollection);
        const cardsWithImageUrls = await Promise.all(
            data.docs.map(async (doc) => {
                const cardData = doc.data();
                const imgixUrl = `https://spacetiger9.imgix.net/${cardData.imageUrl}?w=150`;
                return { ...cardData, id: doc.id, imageUrl: imgixUrl };
            })
        );
        setCards(cardsWithImageUrls);
    };

    useEffect(() => {
        getCards();
    }, []);

    return (
        <div className="container  library">
            <h1 className="text-center mb-5">Library</h1>
            <div className="g-1 justify-content-between row row-cols-4 row-cols-md-6 row-cols-lg-8">
                {cards.map((card) => (
                    <Link to={`/card-detail/${card.id}`} key={card.id} className="col h-100">
                        <img className="img-fluid" src={card.imageUrl} alt={card.cardName} />
                    </Link>
                ))}
            </div>
        </div>
    );
};
