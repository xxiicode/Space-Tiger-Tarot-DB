import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../assets/Connection/firebaseConfig.js";

export const CardDetail = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);

    const getCard = async () => {
        const cardDoc = doc(db, "Cards", id);
        const cardData = await getDoc(cardDoc);
        if (cardData.exists()) {
            const data = cardData.data();
            const storage = getStorage();
            const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));
            setCard({ ...data, imageUrl });
        }
    };

    useEffect(() => {
        getCard();
    }, [id]);

    if (!card) {
        return <p>Loading...</p>;
    }

    return (
        <div className="card-detail">
            <h1>{card.cardName}</h1>
            <img src={card.imageUrl} alt={card.cardName} />
            <p><strong>Card Name:</strong> {card.cardName}</p>
            <p><strong>Number:</strong> {card.cardNumber}</p>
            <p><strong>Arcana:</strong> {card.arcana}</p>
            {card.arcana === 'Minor Arcana' && <p><strong>Suit:</strong> {card.suit}</p>}
            <p><strong>Element:</strong> {card.element}</p>
            <p><strong>Zodiac:</strong> {card.zodiac.join(', ')}</p>
            <p><strong>Planet:</strong> {card.planet}</p>
            <p><strong>Theme:</strong> {card.theme.join(', ')}</p>
            <p><strong>Keyword:</strong> {card.keyword.join(', ')}</p>
        </div>
    );
};
