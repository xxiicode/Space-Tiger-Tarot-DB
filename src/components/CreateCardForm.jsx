import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from "../assets/Connection/firebaseConfig.js"
/* Sweet Alert */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

export const CreateCardForm = () => {
    // Estado local para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        arcana: '',
        suit: '',
        element: '',
        zodiac: '',
        planet: '',
        theme: '',
        keyword: '',
        imageFile: undefined
    });

    // Manejar cambios en los campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, imageFile: e.target.files[0] });
        } else {
            setFormData({ ...formData, imageFile: undefined });
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const storage = getStorage();
        const fileName = `${formData.cardNumber}_${formData.cardName.replace(/\s+/g, '-')}.webp`;
        const storageRef = ref(storage, `Cards/${fileName}`);


        try {
            await uploadBytes(storageRef, formData.imageFile);
            console.log('file updated correctly');

            const zodiacs = formData.zodiac.split(',').map(item => item.trim());
            const themes = formData.theme.split(',').map(item => item.trim());
            const keywords = formData.keyword.split(',').map(item => item.trim());

            // Si arcana es 'Minor Arcana', agrega el suit; de lo contrario, deja suit vacío.
            if (formData.arcana === 'Minor Arcana') {
                formData.suit = formData.suit;
            } else {
                formData.suit = '';
            }

            // Agregar los datos del formulario a Firestore
            const db = getFirestore();
            await addDoc(collection(db, 'Cards'), {
                cardName: formData.cardName,
                cardNumber: formData.cardNumber,
                arcana: formData.arcana,
                suit: formData.suit,
                element: formData.element,
                zodiac: zodiacs,
                planet: formData.planet,
                theme: themes,
                keyword: keywords,
                imageUrl: `Cards/${fileName}`
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "New card has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            console.log('Document added successfully');

            // Reiniciar el estado del formulario después del envío
            setFormData({
                cardName: '',
                cardNumber: '',
                arcana: '',
                suit: '',
                element: '',
                zodiac: '',
                planet: '',
                theme: '',
                keyword: '',
                imageFile: ''
            });
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    return (
        <div>
            <h1>Create New Tarot Card</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Card Name:
                        <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="Name of the card"
                            required
                        />
                    </label>

                    <label>
                        Card number:
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            inputMode="numeric" // Para teclados numéricos en dispositivos móviles
                            pattern="[0-9]*" // Solo permite números
                            placeholder="Numeric [0 - 99]"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Arcana:
                        <select
                            name="arcana"
                            value={formData.arcana}
                            onChange={handleChange}
                        >
                            <option value="">Type of Arcana</option>
                            <option value="Major Arcana">Major</option>
                            <option value="Minor Arcana">Minor</option>
                        </select>
                    </label>
                    {formData.arcana === 'Minor Arcana' && (
                        <label>
                            Suit:
                            <select
                                name="suit"
                                value={formData.suit}
                                onChange={handleChange}
                            >
                                <option value="">Select the suit</option>
                                <option value="Wands">Wands</option>
                                <option value="Swords">Swords</option>
                                <option value="Cups">Cups</option>
                                <option value="Pentacles">Pentacles</option>
                            </select>
                        </label>
                    )}
                </div>
                <div>
                    <label>
                        Element:
                        <select
                            name="element"
                            value={formData.element}
                            onChange={handleChange}
                        >
                            <option value="">Select element</option>
                            <option value="Air">Air</option>
                            <option value="Earth">Earth</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                        </select>
                    </label>

                    <label>
                        Zodiac Signs:
                        <input
                            type="text"
                            name="zodiac"
                            value={formData.zodiac}
                            onChange={handleChange}
                            placeholder="Separate by comma (,)"
                        />
                    </label>

                    <label>
                        Planet:
                        <select
                            name="planet"
                            value={formData.planet}
                            onChange={handleChange}
                        >
                            <option value="">Select the planet</option>
                            <option value="Mercury">Mercury</option>
                            <option value="Venus">Venus</option>
                            <option value="Mars">Mars</option>
                            <option value="Jupiter">Jupiter</option>
                            <option value="Saturn">Saturn</option>
                            <option value="Uranus">Uranus</option>
                            <option value="Neptune">Neptune</option>
                            <option value="Pluto">Pluto</option>
                            <option value="Sun">Sun</option>
                            <option value="Moon">Moon</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Themes:
                        <input
                            type="text"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            placeholder="Separe by comma (,)"
                        />
                    </label>

                    <label>
                        Keyword:
                        <input
                            type="text"
                            name="keyword"
                            value={formData.keyword}
                            onChange={handleChange}
                            placeholder="Separe by comma (,)"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Select image:
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept=".webp"

                        />
                    </label>
                </div>
                <br />
                <div>
                    <button className="btn btn-light" type="submit">Create Card</button>
                </div>
            </form>
        </div>
    );
};
