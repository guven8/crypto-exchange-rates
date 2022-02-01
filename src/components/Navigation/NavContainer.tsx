import '../../styles/Navigation.css';
import cryptoIcon from '../../icons/cryptoIcon.svg';
import batIcon from '../../icons/batIcon.svg';
import cardIcon from '../../icons/cardIcon.svg';
import NavButton from './NavButton';
import exchangeIcon from '../../icons/exchangeIcon.svg';

export default function NavContainer() {
	return (
		<div className="nav-container">
			<NavButton active name="crypto" icon={cryptoIcon} />
			<NavButton name="rewards" icon={batIcon} />
			<NavButton name="cards" icon={cardIcon} />
			<div className="divider"></div>
			<NavButton name="add exchange" icon={exchangeIcon} />
		</div>
	);
}
