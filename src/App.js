import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const BitcoinPriceGraph = () => {
  const [bitcoinPrices, setBitcoinPrices] = useState(null);

  useEffect(() => {
    const fetchBitcoinPrices = async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=gbp&days=14'
      );
      const data = await response.json();
      setBitcoinPrices(data.prices);
    };

    fetchBitcoinPrices();
  }, []);

  const transformData = (data) => {
    return data.map((price) => ({
      y: price[1],
    }));
  };

  return (

      <div className="App">
        <header className="App-header">
          <div>
            <h1>Price Graph (GBP)</h1>
            {bitcoinPrices && (
              <VictoryChart theme={VictoryTheme.material} style = {{fontSize: 2}}width={400} height={400}>
                <VictoryLine data={transformData(bitcoinPrices)}style={{ data: {strokeWidth: 0.5} }} />
              </VictoryChart>
            )}
          </div>
        </header>
    </div>
  );
};

export default BitcoinPriceGraph;
