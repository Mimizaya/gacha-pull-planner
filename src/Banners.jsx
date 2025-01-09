import Banner from './Banner.jsx';

export default function Banners({bannerData, resourceGeneration, resourceName, pulls, shopMonthlyTerm, monthlyPassActive, gameName, selectedGame}) {

  return (
    <div id="banners">
      <table>
        <tbody>
          <tr className="header">
            <th>Banner</th>
            <th colSpan="2">Characters</th>

            {gameName === "honkaistarrail" && // HSR Has more concurrent banners
            <>
            <th></th>
            <th></th>
            </>}

            <th>Start</th>
            <th>End</th>
            <th>Time Left</th>
            <th>{shopMonthlyTerm}</th>
            <th>{resourceName}</th>
            <th>ROI</th>
            <th className="pulls">{pulls} Start</th>
            <th className="pulls">{pulls} End</th>
            <th colSpan="2" className="planned">Planned</th>

          </tr>

          {bannerData.map((banner) => (
            <Banner 
              id={banner.id}
              key={banner.patch}
              patch={banner.patch}
              character_1={banner.character_1}
              character_2={banner.character_2}
              character_3={banner.character_3}
              character_4={banner.character_4}
              startDate={banner.startDate}
              startTime={banner.startTime}
              endDate={banner.endDate}
              endTime={banner.endTime}
              resourceGeneration={resourceGeneration}
              monthlyPassActive={monthlyPassActive}
              selectedGame={selectedGame}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}