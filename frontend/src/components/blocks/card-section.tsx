export const CardSection = () => {
	const cards = [{ title: "hey", content: "some content" }];
	return (
		<section>
			{cards.map((card, id) => {
				return <div key={id}>{card.title}</div>;
			})}
		</section>
	);
};
