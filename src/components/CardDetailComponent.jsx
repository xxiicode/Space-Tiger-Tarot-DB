export const CardDetailComponent = ({ tarotCard }) => {

    return (
        <div className="container-fluid mt-4">
            <div className="card-detail" key={tarotCard.id}>
                <h2 className="text-center mb-3 mb-lg-3">{tarotCard.cardName}</h2>
                <div className="row justify-content-center align-items-center">
                    <div className="col col-lg-3">
                        <img className="img-fluid" src={tarotCard.imageUrl} alt={tarotCard.cardName} />
                    </div>
                    <div className="col col-lg-4 justify-content-center">
                        <p><strong>Card Name:</strong> {tarotCard.cardName}</p>
                        <p><strong>Number:</strong> {tarotCard.cardNumber}</p>
                        <p><strong>Arcana:</strong> {tarotCard.arcana}</p>
                        {tarotCard.arcana === 'Minor Arcana' && <p><strong>Suit:</strong> {tarotCard.suit}</p>}
                        <p><strong>Element:</strong> {tarotCard.element}</p>
                        <p><strong>Zodiac:</strong> {tarotCard.zodiac.join(', ')}</p>
                        <p><strong>Planet:</strong> {tarotCard.planet}</p>
                        <p><strong>Theme:</strong> {tarotCard.theme.join(', ')}</p>
                        <p><strong>Keyword:</strong> {tarotCard.keyword.join(', ')}</p>
                    </div>
                </div>
            </div >
        </div>
        
        );}