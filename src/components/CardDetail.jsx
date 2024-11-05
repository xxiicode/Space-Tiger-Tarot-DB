import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/Connection/firebaseConfig.js";
import { CardDetailComponent } from './CardDetailComponent';

export const CardDetail = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);

    const getCard = async () => {
        const cardDoc = doc(db, "Cards", id);
        const cardData = await getDoc(cardDoc);
        if (cardData.exists()) {
            const data = cardData.data();
            const imageUrl = `https://spacetiger9.imgix.net/${data.imageUrl}?w=500`;
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
        <>
        <CardDetailComponent key={card.id} tarotCard={card} />
        <div className="d-flex justify-content-center">
        <a className="btn btn-primary justify-content-end" href="/library">Back to Library</a>
        </div>
        </>
    );
};
