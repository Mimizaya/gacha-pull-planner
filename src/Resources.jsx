import { useState, useEffect } from 'react';

export default function Resources({
  selectedGame, 
  resourceGeneration, 
  resourceName, 
  pullCurrencyName, 
  shopCurrencyName,
  monthlyPass,
  monthlyPassDaysLeft,
  pulls,
  handleChangeMonthlyPass,
  handleChangeResourceGeneration,
}) {

  const [resourceNumber, setResourceNumber] = useState(() => {
    const saved = localStorage.getItem(`ggp-resourceNumber-${selectedGame}`);
    return saved ? JSON.parse(saved) : 0; // Default to 0 if not found
  });
  const [editResourceNumber, setEditResourceNumber] = useState(false);
  const handleChangeResource = (e) => {
    setResourceNumber(e.target.value);
  }

  const [pullsNumber, setPullsNumber] = useState(() => {
    const saved = localStorage.getItem(`ggp-pullsNumber-${selectedGame}`);
    return saved ? JSON.parse(saved) : 0; // Default to 0 if not found
  });
  const [editPullsNumber, setEditPullsNumber] = useState(false);
  const handleChangePulls = (e) => {
    setPullsNumber(e.target.value);
  }

  const [shopCurrencyNumber, setShopCurrencyNumber] = useState(() => {
    const saved = localStorage.getItem(`ggp-shopCurrencyNumber-${selectedGame}`);
    return saved ? JSON.parse(saved) : 0; // Default to 0 if not found
  });
  const [editShopCurrencyNumber, setEditShopCurrencyNumber] = useState(false);
  const handleChangeShopCurrency = (e) => {
    setShopCurrencyNumber(e.target.value);
  }


  const [editMonthlyPassDaysLeft, setEditMonthlyPassDaysLeft] = useState(false);
  const [editResourceGeneration, setEditResourceGeneration] = useState(false);
  const resourceNumberToWishes = Math.floor(resourceNumber / 160);
  const shopCurrencyNumberToWishes = Math.floor(shopCurrencyNumber / 5)



  // SAVE/LOAD
  // Load data when changing games 
    useEffect(() => {
      const savedResourceNumber = localStorage.getItem(`ggp-resourceNumber-${selectedGame}`);
      const savedPullsNumber = localStorage.getItem(`ggp-pullsNumber-${selectedGame}`);
      const savedShopCurrencyNumber = localStorage.getItem(`ggp-shopCurrencyNumber-${selectedGame}`);

      setResourceNumber(savedResourceNumber ? JSON.parse(savedResourceNumber) : 0);
      setPullsNumber(savedPullsNumber ? JSON.parse(savedPullsNumber) : 0);
      setShopCurrencyNumber(savedShopCurrencyNumber ? JSON.parse(savedShopCurrencyNumber) : 0);
    }, [selectedGame]);
  // Save data whenever changes are made 
    useEffect(() => {
      localStorage.setItem(`ggp-resourceNumber-${selectedGame}`, JSON.stringify(resourceNumber));
    }, [resourceNumber, selectedGame]);

    useEffect(() => {
      localStorage.setItem(`ggp-pullsNumber-${selectedGame}`, JSON.stringify(pullsNumber));
    }, [pullsNumber, selectedGame]);

    useEffect(() => {
      localStorage.setItem(`ggp-shopCurrencyNumber-${selectedGame}`, JSON.stringify(shopCurrencyNumber));
    }, [shopCurrencyNumber, selectedGame]);

  return (
    <div id="resources">
      <table id="current-inventory">
        <tbody>
          <tr>
            <th colSpan="2">Current Inventory</th>
            <th>{pulls}</th>
          </tr>
          <tr>
            <td>{resourceName}</td>
            {editResourceNumber ? 
              <>
              <td>
              <input 
                value={resourceNumber}
                onChange={(e) => handleChangeResource(e)}
              />
              <button onClick={() => setEditResourceNumber(false)}>Save</button>
              </td>
              </>
              :
              <td className="editable" onClick={() => setEditResourceNumber(true)}>{resourceNumber}</td>
            }
            <td>{resourceNumberToWishes}</td>
          </tr>
          <tr>
            <td>{pullCurrencyName}</td>
            {editPullsNumber ? 
              <>
              <td>
              <input 
                value={pullsNumber}
                onChange={(e) => handleChangePulls(e)}
              />
              <button onClick={() => setEditPullsNumber(false)}>Save</button>
              </td>
              </>
              :
              <td className="editable" onClick={() => setEditPullsNumber(true)}>{pullsNumber}</td>
            }
            <td>{pullsNumber}</td>
          </tr>
          <tr>
            <td>{shopCurrencyName}</td>
            {editShopCurrencyNumber ? 
              <>
              <td>
              <input 
                value={shopCurrencyNumber}
                onChange={(e) => handleChangeShopCurrency(e)}
              />
              <button onClick={() => setEditShopCurrencyNumber(false)}>Save</button>
              </td>
              </>
              :
              <td className="editable" onClick={() => setEditShopCurrencyNumber(true)}>{shopCurrencyNumber}</td>
            }
            <td>{shopCurrencyNumberToWishes}</td>
          </tr>
          <tr>
            <td colSpan="2" className="sum-total bold">Total {pulls}</td>
            <td className="sum-total bold">{Number(resourceNumberToWishes) + Number(pullsNumber) + Number(shopCurrencyNumberToWishes)}</td>
          </tr>
        </tbody>
      </table>

      <table id="resource-generation">
        <tbody>
          <tr>
            <th colSpan="2">{resourceName} Income</th>
          </tr>
          <tr>
            <td>Per day</td>
            {editResourceGeneration ? 
              <>
              <td>
              <input 
                value={resourceGeneration}
                onChange={(e) => handleChangeResourceGeneration(e)}
              />
              <button onClick={() => setEditResourceGeneration(false)}>Save</button>
              </td>
              </>
              :
              <td className="editable" onClick={() => setEditResourceGeneration(true)}>{resourceGeneration}</td>
            }
          </tr>
          <tr>
            <td>{monthlyPass}</td>
            {editMonthlyPassDaysLeft ? 
              <>
              <td>
              <input 
                value={monthlyPassDaysLeft}
                onChange={(e) => handleChangeMonthlyPass(e)}
              />
              <button onClick={() => setEditMonthlyPassDaysLeft(false)}>Save</button>
              </td>
              </>
              :
              <td className="editable" onClick={() => setEditMonthlyPassDaysLeft(true)}>{monthlyPassDaysLeft}</td>
            }
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="sum-total bold">Total Income</td>
            <td className="sum-total bold">{monthlyPassDaysLeft > 0 ? 90 + parseInt(resourceGeneration) : resourceGeneration}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}