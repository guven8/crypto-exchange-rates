type P = {
	active?: boolean;
	name: string;
	icon: string;
};

export default function NavButton(props: P) {
	return (
		<button className={`nav-button${props.active ? ' active' : ''}`}>
			<img src={props.icon} alt={props.name} className="nav-button-image" />
			{props.name}
		</button>
	);
}
