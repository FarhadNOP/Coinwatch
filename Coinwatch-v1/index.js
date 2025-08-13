
// const apiUrl = 'https://api.coinlayer.com/live?access_key=18be7d1b4aa41d995fad05731254c1b4';
const apiurl2 = 'https://api.goperigon.com/v1/all?category=Business&sourceGroup=top100&showReprints=false&apiKey=07cf7557-a5e2-4344-bc7b-49b20bc671ae'
const apiUrl3 = 'http://api.navasan.tech/latest/?api_key=freeLaVCpwZpdPFINJ7le1JKpZEHjeHG';


// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
    
//         document.getElementById('bitcoin-price').textContent = `Bitcoin Price: $${data.rates.BTC}`;
//         document.getElementById('ethereum-price').textContent = `Ethereum Price: $${data.rates.ETH}`;
//     })
//     .catch(error => console.error('Error fetching data:', error));





const url = 'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","TONUSDT","ADAUSDT","LTCUSDT","MATICUSDT","BNBUSDT","NOTUSDT","SOLUSDT"]';

        fetch(url)
            .then(response => {
               
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
          
                const bitcoinPrice = data.find(item => item.symbol === "BTCUSDT").price;
                const ethereumPrice = data.find(item => item.symbol === "ETHUSDT").price;
                const tonPrice = data.find(item => item.symbol === "TONUSDT").price;
				const adaPrice = data.find(item => item.symbol === "ADAUSDT").price;
				const ltcPrice = data.find(item => item.symbol === "LTCUSDT").price;
				const maticPrice = data.find(item => item.symbol === "MATICUSDT").price;
				const bnbPrice = data.find(item => item.symbol === "BNBUSDT").price;
				const notPrice = data.find(item => item.symbol === "NOTUSDT").price;
				const solPrice = data.find(item => item.symbol === "SOLUSDT").price;

				
                let bitcoinPrice2 = bitcoinPrice.slice(0, -4);
				let ethereumPrice2 = ethereumPrice.slice(0, -4);
				let ltcPrice2 = ltcPrice.slice(0, -4);
				let adaPrice2 = adaPrice.slice(0, -4);
				let notPrice2 = notPrice.slice(0, -4);
				let maticPrice2 = maticPrice.slice(0, -4);
				let bnbPrice2 = bnbPrice.slice(0, -4);
				let solPrice2 = solPrice.slice(0, -4);
				let tonPrice2 = tonPrice.slice(0, -4);

                document.getElementById('bitcoin-price').innerText = `Bitcoin Price: $${bitcoinPrice2}`+" "+ "USD";
                document.getElementById('ethereum-price').innerText = `Ethereum Price: $${ethereumPrice2}`+" "+ "USD" ;
                document.getElementById('ltc-price').innerText = `LTC Price: $${ltcPrice2}`+" "+ "USD" ;
				document.getElementById('ton-price').innerText = `Ton Price: $${tonPrice2}`+" "+ "USD" ;
				document.getElementById('ada-price').innerText = `ADA Price: $${adaPrice2}`+" "+ "USD" ;
				document.getElementById('bnb-price').innerText = `BNB Price: $${bnbPrice2}`+" "+ "USD" ;
				document.getElementById('sol-price').innerText = `SOL Price: $${solPrice2}`+" "+ "USD" ;
				document.getElementById('not-price').innerText = `NOT Price: $${notPrice2}`+" "+ "USD" ;
				document.getElementById('matic-price').innerText = `MATIC Price: $${maticPrice2}`+" "+ "USD" ;
				
             })
            .catch(error => {
              
                console.error('There was a problem with the fetch operation:', error);
            });

