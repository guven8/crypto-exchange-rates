import { connect } from 'react-redux';
import { useState } from 'react';
import { CoinMarketData } from '../../services/coingecko';
import '../../styles/Assets.css';
import { addActiveAsset } from '../../actions/assets';

type OwnProps = {
	assetList: CoinMarketData[];
	activeAssets: string[];
	onAddAsset: () => void;
};

type DispatchProps = {
	addActiveAsset: (asset: string) => void;
};

type P = OwnProps & DispatchProps;

function AddAssetSelect(props: P) {
	const newAssetList = props.assetList.filter(
		(asset) => !props.activeAssets.includes(asset.id)
	);
	const [newAsset, setNewAsset] = useState(newAssetList?.[0].id);
	if (!props.assetList.length) return null;

	const handleChange = (e: any) => {
		setNewAsset(e.target.value);
	};

	const handleAddAsset = () => {
		props.addActiveAsset(newAsset);
		props.onAddAsset();
	};

	return (
		<div className="add-asset-container">
			<select
				name="asset-select"
				id="asset-select"
				className="add-asset-select"
				placeholder="Choose new asset..."
				value={newAsset}
				onChange={handleChange}
			>
				{newAssetList.map((asset) => (
					<option key={asset.id} value={asset.id}>
						{asset.name}
					</option>
				))}
			</select>
			<button
				className="add-asset-select-button"
				onClick={handleAddAsset}
			></button>
		</div>
	);
}

export default connect(null, { addActiveAsset })(AddAssetSelect);
