import { useState } from 'react';
import '../styles/AddAssetButton.css';
import AddAssetSelect from './Assets/AddAssetSelect';

export default function AddAssetButton() {
	const [addAssetVisible, setAddAssetVisible] = useState(false);
	const toggleAddAssetVisible = () => setAddAssetVisible((v) => !v);

	return (
		<>
			{addAssetVisible && <AddAssetSelect onAddAsset={toggleAddAssetVisible} />}
			<button className="add-asset-button" onClick={toggleAddAssetVisible}>
				Add Asset
			</button>
		</>
	);
}
