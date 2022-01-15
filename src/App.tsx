import './App.css';
import SearchBar from './components/SearchBar';
import AddAssetButton from './components/AddAssetButton';
import SideBar from './components/SideBar';
import AssetList from './components/Assets/AssetList';
import NavContainer from './components/Navigation/NavContainer';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from './reducers';

type StateProps = {
	activeAssets: string[];
};

type P = StateProps;

function App(props: P) {
	const [visibleAssets, setVisibleAssets] = useState(props.activeAssets);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const filteredAssets = props.activeAssets.filter((asset) =>
			asset.includes(searchQuery)
		);
		setVisibleAssets(filteredAssets);
	}, [searchQuery]);

	return (
		<div className="App">
			<NavContainer />
			<div className="asset-graph-container">
				<SearchBar value={searchQuery} onChange={setSearchQuery} />
				<AssetList visibleAssets={visibleAssets} />
				<AddAssetButton />
			</div>
			<SideBar />
		</div>
	);
}

export default connect<StateProps, {}, {}, AppState>((state) => ({
	activeAssets: state.assets.activeAssets
}))(App);
