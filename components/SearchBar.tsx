import '../styles/SearchBar.css';
import searchIcon from '../icons/searchIcon.svg';

type P = {
	value: string;
	onChange: (value: string) => void;
};

export default function SearchBar(props: P) {
	const handleChange = (e: any) => props.onChange(e.target.value);

	return (
		<div className="search-bar-container">
			<img src={searchIcon} alt="search" className="search-icon" />
			<input
				className="search-bar-input"
				placeholder="Search Coins"
				value={props.value}
				onChange={handleChange}
			></input>
		</div>
	);
}
