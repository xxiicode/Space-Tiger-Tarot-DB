import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
        <CardDetailComponent key={card.id} tarotCard={card} />
    );
};
