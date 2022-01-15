import './App.css';
import SearchBar from './components/SearchBar';
import AddAssetButton from './components/AddAssetButton';
import SideBar from './components/SideBar';
import AssetList from './components/Assets/AssetList';
import NavContainer from './components/Navigation/NavContainer';

function App() {
	return (
		<div className="App">
			<NavContainer />
			<div className="asset-graph-container">
				<SearchBar />
				<AssetList />
				<AddAssetButton />
			</div>
			<SideBar />
		</div>
	);
}

export default App;
