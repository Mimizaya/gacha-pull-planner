import { useState, useEffect } from 'react';
import { parseDate, getRemainingTime, getRemainingDays, monthNames } from './utility/utility.jsx';

export default function Banner({      
  id,    
  patch,
  character_1,
  character_2,
  character_3,
  character_4,
  startDate,
  startTime,
  endDate,
  endTime,
  resourceGeneration,
  monthlyPassActive,
  selectedGame,
  }) {

  // Parse dates into JS date objects
    const parsedStartDate = parseDate(startDate, startTime);
    const parsedEndDate = parseDate(endDate, endTime);

  // Get start dates 
    const dayOfMonthStart = parsedStartDate.getDate();
    const monthNameStart = monthNames[parsedStartDate.getMonth()];
  // Get end dates 
    const dayOfMonthEnd = parsedEndDate.getDate();
    const monthNameEnd = monthNames[parsedEndDate.getMonth()];
  // Get remaining time 
    const bannerRemainingDaysString = getRemainingTime(parsedStartDate, parsedEndDate);
    const bannerRemainingTime = getRemainingDays(parsedStartDate, parsedEndDate);


  // Are bargains included? 
    const areBargainsIncluded = () => {
      if(parsedStartDate.getMonth() < parsedEndDate.getMonth()) {
        return true;
      } else {
        return false;
      }
    }
    const bargains = areBargainsIncluded()
  
  // Resource generation calculation 
    const calculateResourceGeneration = () => {
      const monthlyPass = 90;

      if(monthlyPassActive) {
        return Math.floor((parseInt(resourceGeneration)+parseInt(monthlyPass))*parseInt(bannerRemainingTime));
      } else {
        return Math.floor(resourceGeneration*bannerRemainingTime);
      } 
    }
    const resourcesRemaining = calculateResourceGeneration()




  const [plannedWishes1, setPlannedWishes1] = useState(() => {
    const saved = localStorage.getItem(`ggp-plannedWishes-1-${selectedGame}-${id}`);
    return saved ? JSON.parse(saved) : 0; // Default to 0 if not found
  });
  const [editPlannedWishes1, setEditPlannedWishes1] = useState(false);
  const handleEditPlannedWishes1 = (e) => {
    setPlannedWishes1(e.target.value);
  }

  const [plannedWishes2, setPlannedWishes2] = useState(() => {
    const saved = localStorage.getItem(`ggp-plannedWishes-2-${selectedGame}-${id}`);
    return saved ? JSON.parse(saved) : 0; // Default to 0 if not found
  });
  const [editPlannedWishes2, setEditPlannedWishes2] = useState(false);
  const handleEditPlannedWishes2 = (e) => {
    setPlannedWishes2(e.target.value);
  }


  // Save/load data whenever changes are made 

    useEffect(() => {
      localStorage.setItem(`ggp-plannedWishes-1-${selectedGame}-${id}`, JSON.stringify(plannedWishes1));
      localStorage.setItem(`ggp-plannedWishes-2-${selectedGame}-${id}`, JSON.stringify(plannedWishes2));
    }, [plannedWishes1, plannedWishes2]);

  // Return on investment generation
   const roi = Math.floor((parseInt(plannedWishes1) + parseInt(plannedWishes2)) * 0.06);

  // Calculate wishes
    // Pull numbers from storage
    const resourceNumber = JSON.parse(localStorage.getItem(`ggp-resourceNumber-${selectedGame}`));
    const pullsNumber = JSON.parse(localStorage.getItem(`ggp-pullsNumber-${selectedGame}`));
    const shopCurrencyNumber = JSON.parse(localStorage.getItem(`ggp-shopCurrencyNumber-${selectedGame}`));

    // Calculate
    const resourceNumberToWishes = Math.floor(Number(resourceNumber / 160));
    const shopCurrencyNumberToWishes = Math.floor(shopCurrencyNumber / 5)

    let wishesCurrent;
    let wishesEnd;

    if(id === 1) {
      wishesCurrent = (resourceNumberToWishes + shopCurrencyNumberToWishes + parseInt(pullsNumber)) - (parseInt(plannedWishes1)+parseInt(plannedWishes2));
      wishesEnd = wishesCurrent + Math.floor(resourcesRemaining / 160);
      if(bargains) {
        wishesEnd +=5;
      }
      if(roi > 0) {
        wishesEnd += roi;
      }
      localStorage.setItem(`ggp-wishesEnd-${selectedGame}-${id}`, JSON.stringify(wishesEnd));
    }
    if(id > 1) {
      wishesCurrent = JSON.parse(localStorage.getItem(`ggp-wishesEnd-${selectedGame}-${id-1}`)) - (parseInt(plannedWishes1)+parseInt(plannedWishes2));
      wishesEnd = wishesCurrent + Math.floor(resourcesRemaining / 160);
      if(bargains) {
        wishesEnd +=5;
      }
      if(roi > 0) {
        wishesEnd += roi;
      }
      localStorage.setItem(`ggp-wishesEnd-${selectedGame}-${id}`, JSON.stringify(wishesEnd));
    }







  return (
    <tr className="banner">
      <td>{patch}</td>
      <td>{character_1}</td>
      <td>{character_2}</td>
      {character_3 && <td>{character_3}</td>}
      {character_4 && <td>{character_4}</td>}
      <td>{dayOfMonthStart}. {monthNameStart}</td>
      <td>{dayOfMonthEnd}. {monthNameEnd}</td>
      <td>{bannerRemainingDaysString}</td>
      <td>{bargains ? 'Yes' : 'No'}</td>
      <td>{resourcesRemaining}</td>
      <td>{roi}</td>
      <td className="pulls">{wishesCurrent}</td>
      <td className="pulls">{wishesEnd}</td>

      {/* Planned Wishes 1 */}
      {editPlannedWishes1 ? 
        <>
        <td>
          <input 
            value={plannedWishes1}
            onChange={(e) => handleEditPlannedWishes1(e)}
          />
          <button onClick={() => {
            setEditPlannedWishes1(false);
            location.reload();
          }}>Save
          </button>
        </td>
        </>
        :
        <td className="planned bold editable" onClick={() => setEditPlannedWishes1(true)}>{plannedWishes1}</td>
      }

      {/* Planned Wishes 2 */}
      {editPlannedWishes2 ? 
        <>
        <td>
          <input 
            value={plannedWishes2}
            onChange={(e) => handleEditPlannedWishes2(e)}
          />
          <button onClick={() => {
            setEditPlannedWishes2(false);
            location.reload();
          }}>Save
          </button>
        </td>
        </>
        :
        <td className="planned bold editable" onClick={() => setEditPlannedWishes2(true)}>{plannedWishes2}</td>
      }
    </tr>
  );
}