import { connect } from 'react-redux';
import { useState } from 'react';
import { CoinMarketData } from '../../services/coingecko';
import '../../styles/Assets.css';
import { addActiveAsset } from '../../actions/assets';
import { AppState } from '../../reducers';
import { getNonActiveAssets } from '../../reducers/assets';

type OwnProps = {
	onAddAsset: () => void;
};

type StateProps = {
	activeAssetIds: string[];
	nonActiveAssets: CoinMarketData[];
};

type DispatchProps = {
	addActiveAsset: (asset: string) => void;
};

type P = OwnProps & StateProps & DispatchProps;

function AddAssetSelect(props: P) {
	const [newAsset, setNewAsset] = useState(props.nonActiveAssets[0].id);
	if (!props.nonActiveAssets.length) return null;

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
				{props.nonActiveAssets.map((asset) => (
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

export default connect<StateProps, DispatchProps, {}, AppState>(
	(state) => ({
		activeAssetIds: state.assets.activeAssetIds,
		nonActiveAssets: getNonActiveAssets(state)
	}),
	{ addActiveAsset }
)(AddAssetSelect);
