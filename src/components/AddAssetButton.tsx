import '../styles/AddAssetButton.css';

type P = {
	onClick: () => void;
};

export default function AddAssetButton(props: P) {
	return (
		<button className="add-asset-button" onClick={props.onClick}>
			Add Asset
		</button>
	);
}
