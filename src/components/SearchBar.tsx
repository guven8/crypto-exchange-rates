import '../styles/SearchBar.css';
import searchIcon from '../icons/searchIcon.svg';

export default function SearchBar() {
	return (
		<div className="search-bar-container">
			<img src={searchIcon} alt="search" className="search-icon" />
			<input className="search-bar-input" placeholder="Search Coins"></input>
		</div>
	);
}
