### Crypto Exchange

The data is fetched via the redux action `getAssets` in `src/actions/assets`, typescript-fsa allows me to handle any errors that may result from the http request.
In this action I am calling a single endpoint from the Gecko api via `src/services/coingecko.ts`.
From there I store the complete list of coin market data in the redux store under `assets.marketData`.

The array of coin market data is filtered by the array of asset id's assets.activeAssets, which is
initialised with bitcoin, ethereum, binancecoin and basic-attention-token.

App.tsx is pulling this complete list of coin market data and passing it to AssetList which is filtering the list (based off the search query and active assets list). I used the useEffect hook to track when AssetList receives new data via `props.assetList` and calling `getAssets` again with a setTimeout of 5 seconds.

I initially had an issue where it was calling the getAsset function twice every 5 seconds, as I was using two useEffect methods to fetch data (one for the initial fetch and another for each subsequent fetch), after handling both in one useEffect hook, I managed to get it to only make one call every five seconds.

If I had more time I would add the ability to remove assets from the list and make the left navigation functional.
