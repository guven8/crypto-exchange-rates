import '../styles/AddAssetButton.css';

export default function AddAssetButton() {
	const handleClick = () => alert('add asset');
	return (
		<button className="add-asset-button" onClick={handleClick}>
			Add Asset
		</button>
	);
}
