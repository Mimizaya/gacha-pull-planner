export default function SelectGame({handleSelectGame, listOfGames}) {

  return (
    <>
      <div id="select-game">
        <ul>
          {listOfGames.map((game) => (
            <li key={game} onClick={() => handleSelectGame(game)}>
              <p>{game}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}