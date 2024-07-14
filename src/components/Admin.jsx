import { Link } from 'react-router-dom';

export const Admin = () => {
    return (
        <>
            <h1>Admin section</h1>
            <p>Create cards, edit, and give permissions</p>
            <ul>
                <li className="btn btn-light"><Link to="/admin/cardsDB">Full card DataBase</Link></li>
                <li className="btn btn-light"><Link to="/admin/cards/create">Create NEW card</Link></li>
            </ul>
        </>
    );
};
