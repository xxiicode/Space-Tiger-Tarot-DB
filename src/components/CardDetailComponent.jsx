export const CardDetailComponent = ( {tarotCard} ) => {

return (
<div className="card-detail" key={tarotCard.id}>
<h2>{tarotCard.cardName}</h2>
<img src={tarotCard.imageUrl} alt={tarotCard.cardName} />
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
)
}