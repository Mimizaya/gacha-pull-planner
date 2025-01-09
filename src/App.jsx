import { useState, useEffect } from 'react';

import './style/app.css';

import SelectGame from './SelectGame.jsx';
import Resources from './Resources.jsx';
import Banners from './Banners.jsx';

export default function App() {
  const bannerDataGenshin = [
    {
      patch: '5.3 P1',
      character_1: 'Mavuika',
      character_2: 'Citlali',
      startDate: '01.01.2025',
      startTime: '04:00',
      endDate: '21.01.2025',
      endTime: '17:00',
    },
    {
      patch: '5.3 P2',
      character_1: 'Arlecchino',
      character_2: 'Clorinde',
      startDate: '21.01.2025',
      startTime: '18:00',
      endDate: '12.02.2025',
      endTime: '12:00',
    },
    {
      patch: '5.4 P1',
      character_1: 'Mizuki',
      character_2: 'Wriothesley',
      startDate: '12.02.2025',
      startTime: '04:00',
      endDate: '04.03.2025',
      endTime: '17:00',
    },
    {
      patch: '5.4 P2',
      character_1: 'Sigewinne',
      character_2: 'Furina',
      startDate: '04.03.2025',
      startTime: '18:00',
      endDate: '25.03.2025',
      endTime: '12:00',
    },
  ];
  const bannerDataHonkai = [
    {
      id: 1,
      patch: '3.0 P1',
      character_1: 'The Herta',
      character_2: 'Linghsa',
      character_3: 'Feixiao',
      character_4: 'Jade',
      startDate: '01.01.2025',
      startTime: '04:00',
      endDate: '21.01.2025',
      endTime: '04:00',
    },
    {
      id: 2,
      patch: '3.0 P2',
      character_1: 'Aglaea',
      character_2: 'Boothill',
      character_3: 'Robin',
      character_4: 'Silver Wolf',
      startDate: '21.01.2025',
      startTime: '00:00',
      endDate: '12.02.2025',
      endTime: '04:00',
    },
  ];

  let idGI = 0;
  let idHSR = 0;
  const bannerDataGenshinWithIDs = bannerDataGenshin.map(banner => {
    idGI++
    return {
      ...banner, id: idGI,
    }
  })
  const bannerDataHonkaiWithIDs = bannerDataHonkai.map(banner => {
    idHSR++
    return {
      ...banner, id: idHSR,
    }
  })





  // GAME SELECTION
  // #1 List of games 
    const listOfGames = ['Genshin Impact', 'Honkai: Star Rail',];
  // #2 Select game 
    // #1 Initialize the state from sessionStorage or fallback to default value 
      const [selectedGame, setSelectedGame] = useState(() => {
        const storedGame = localStorage.getItem('gpp-selectedGame');
        return storedGame ? storedGame : 'Genshin Impact';
      });
    // #2 Store the value in sessionStorage when it changes 
      useEffect(() => {
        // Whenever selectedGame changes, update sessionStorage
        localStorage.setItem('gpp-selectedGame', selectedGame);
      }, [selectedGame]);

      const handleSelectGame = (game) => {
        if(game === selectedGame) {
          return
        } else  {
          setSelectedGame(game); 
          location.reload()
        } 

      };

  let bannerData;
  let resourceName;
  let pullCurrencyName;
  let shopCurrencyName;
  let shopMonthlyTerm;
  let monthlyPass;
  let pulls;

  if(selectedGame === 'Genshin Impact') {
    bannerData = bannerDataGenshinWithIDs;
    resourceName = 'Primogems';
    pullCurrencyName = 'Intertwined Fates';
    shopCurrencyName = 'Starglitter';
    shopMonthlyTerm = 'Bargains';
    monthlyPass = 'Welkin Moon';
    pulls = 'Wishes';
  }
  if(selectedGame === 'Honkai: Star Rail') {
    bannerData = bannerDataHonkaiWithIDs;
    resourceName = 'Stellar Jades';
    pullCurrencyName = 'Special Pass';
    shopCurrencyName = 'Undying Starlight';
    shopMonthlyTerm = 'Exchange';
    monthlyPass = 'Express Pass';
    pulls = 'Warps';
  }

  // Define game name. Used as class for CSS selectors 
    const gameName = selectedGame.replace(/[\s:]+/g, '').toLowerCase();


    // Resource Generation 
    // Base value (calculate from history - todo)
    const [resourceGeneration, setResourceGeneration] = useState(() => {
      const saved = localStorage.getItem(`ggp-resourceGeneration-${selectedGame}`);
      return saved ? JSON.parse(saved) : 200; // Default to 0 if not found
    });
    // Edit remaining days of monthly pass
    const handleChangeResourceGeneration = (e) => {
      setResourceGeneration(e.target.value);
    }
  // SAVE/LOAD
  // Load data when changing games 
    useEffect(() => {
      const saved = localStorage.getItem(`ggp-resourceGeneration-${selectedGame}`);
      setResourceGeneration(saved ? JSON.parse(saved) : 0);
    }, [selectedGame]);
  // Save data whenever changes are made 
    useEffect(() => {
      localStorage.setItem(`ggp-resourceGeneration-${selectedGame}`, JSON.stringify(resourceGeneration));
    }, [resourceGeneration, selectedGame]);



    // Check for monthly pass (Welkin Moon, Express Pass)
    const [monthlyPassDaysLeft, setMonthlyPassDaysLeft] = useState(() => {
      const saved = localStorage.getItem(`ggp-monthlyPassDaysLeft-${selectedGame}`);
      return saved ? JSON.parse(saved) : 90; // Default to 90 if not found
    });
    // Edit remaining days of monthly pass
    const handleChangeMonthlyPass = (e) => {
      setMonthlyPassDaysLeft(e.target.value);
    }
    // Check if monthly pass is active or not
    let monthlyPassActive = false;
    if(monthlyPassDaysLeft > 0) {
      monthlyPassActive = true;
    }

  // SAVE/LOAD
  // Load data when changing games 
    useEffect(() => {
      const savedMonthlyPassDaysLeft = localStorage.getItem(`ggp-monthlyPassDaysLeft-${selectedGame}`);
      setMonthlyPassDaysLeft(savedMonthlyPassDaysLeft ? JSON.parse(savedMonthlyPassDaysLeft) : 0);
    }, [selectedGame]);
  // Save data whenever changes are made 
    useEffect(() => {
      localStorage.setItem(`ggp-monthlyPassDaysLeft-${selectedGame}`, JSON.stringify(monthlyPassDaysLeft));
    }, [monthlyPassDaysLeft, selectedGame]);


  return (
    <main id={gameName}>
      <SelectGame 
        listOfGames={listOfGames}
        handleSelectGame={handleSelectGame}
      />
      <Resources 
        selectedGame={selectedGame}
        resourceGeneration={resourceGeneration}
        resourceName={resourceName}
        pullCurrencyName={pullCurrencyName}
        shopCurrencyName={shopCurrencyName}
        monthlyPass={monthlyPass}
        monthlyPassDaysLeft={monthlyPassDaysLeft}
        pulls={pulls}
        handleChangeMonthlyPass={handleChangeMonthlyPass}
        handleChangeResourceGeneration={handleChangeResourceGeneration}
      />
      <Banners 
        selectedGame={selectedGame}
        gameName={gameName}
        bannerData={bannerData}
        resourceGeneration={resourceGeneration}
        monthlyPassActive={monthlyPassActive}
        resourceName={resourceName}
        shopMonthlyTerm={shopMonthlyTerm}
        pulls={pulls}
      />
    </main>
  );
}