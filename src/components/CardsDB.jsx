import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../assets/Connection/firebaseConfig.js"

/* Sweet Alert */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);


export const CardsDB = () => {
    const [cards, setCards] = useState([])

    /* referenciamos para conectar a la BD y su coleccion */
    const cardsCollection = collection(db, "Cards")

    /* funcion para mostrar todas las cartas */
/*     const getCards = async () => {
        const data = await getDocs(cardsCollection)
       setCards(
            data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))
        )
    } */
    
    /* funcion para eliminar un registro */
    const deleteCard = async (id) => {
        const cardDoc = doc(db, "Cards", id) //cardsCollection
        await deleteDoc(cardDoc)
    }
    /* Funcion para confirmar con sweetAlert */
    const confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCard(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "The card has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    /* useEffect */
    useEffect(() => {
        const getCards = async () => {
            const data = await getDocs(cardsCollection)
           setCards(
                data.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                }))
            )
        }
        getCards()
    }, [cards])

    return (
        <>
            <div className="container-fluid p-3 py-5 bg-terciary">
                <h1>Tarot Cards DataBase</h1>
                <div className="col">
                    <div className="row">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <td>Name:</td>
                                    <td>Number:</td>
                                    <td>Element:</td>
                                    <td>Planets:</td>
                                    <td>Zodiac:</td>
                                    <td>Themes:</td>
                                    <td>Keyword:</td>
                                    <td>action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((card) => (
                                    <tr key={card.id}>
                                        <td>{card.cardName}</td>
                                        <td>{card.cardNumber}</td>
                                        <td>{card.element}</td>
                                        <td>{Array.isArray(card.zodiac) ? card.zodiac.join(', ') : card.zodiac}</td>
                                        <td>{card.planet}</td>
                                        <td>{Array.isArray(card.theme) ? card.theme.join(', ') : card.theme}</td>
                                        <td>{card.keyword}</td>
                                        <td><Link to={`edit/${card.id}`} className="btn btn-light me-2">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => confirmDelete(card.id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};