import { useState } from 'react'
import { Select, MantineProvider, Table } from '@mantine/core'
import team from '../../team.json'
import '@mantine/core/styles.css';
import './App.css'
import BuildTable from './tbl.tsx';

const teams = team.map((x) => {
  return {
    value: String(x.name),
    label: String(x.name)
  }
})
console.log(teams)
function App() {
  const columns = ['min', 'fg', '3pt', 'ft', 'oreb', 'dreb',
    'reb', 'ast', 'stl', 'blk', 'to', 'pf', 'pts'
  ]
  const players = ['player1', 'player2', 'player3', 'player4', 'player5', '2', '2', '4', '2', '3', 'e', '3', '4', '4', '']
  const player = players.map(x => <Table.Td>{x}</Table.Td>)
  const column = columns.map(column => <Table.Th>{column}</Table.Th>)
  const [value, setValue] = useState<string | null>('');
  console.log(players)
  const [playerQuery, setPlayerQuery] = useState('LeBron James')
  const [playerResult, setPlayerResult] = useState<any | null>(null)
  const [loadingPlayer, setLoadingPlayer] = useState(false)
  const [playerError, setPlayerError] = useState<string | null>(null)
  function teamSelect() {
    return <Select className='select'
      label="Pick A Team"
      placeholder={'Select Team'}
      data={teams}
      value={value}
      onChange={(e) => setValue(e)}
    />
  }

  const fetchPlayer = async (name: string) => {
    setLoadingPlayer(true)
    setPlayerError(null)
    try {
      const res = await fetch(`http://localhost:8000/api/player/${encodeURIComponent(name)}`)
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }))
        throw new Error(err.detail || res.statusText)
      }
      const data = await res.json()
      setPlayerResult(data)
    } catch (e: any) {
      setPlayerError(String(e.message || e))
      setPlayerResult(null)
    } finally {
      setLoadingPlayer(false)
    }
  }
  return (
    <>
      <div className='mainContainer'>
        <div className='teamSelector'>
          <div className='team1'>
            <MantineProvider>
              {teamSelect()}
            </MantineProvider>
          </div>
        </div>
        <div className='mainTable1'>
          <BuildTable
            data={{
              columnHeader: column,
              players: player
            }}
          />
          <div style={{ marginTop: 20 }}>
            <h3>Lookup player (calls local Python API)</h3>
            <input value={playerQuery} onChange={(e) => setPlayerQuery(e.target.value)} />
            <button onClick={() => fetchPlayer(playerQuery)} disabled={loadingPlayer}>Fetch</button>
            {loadingPlayer && <div>Loading...</div>}
            {playerError && <div style={{ color: 'red' }}>Error: {playerError}</div>}
            {playerResult && (
              <div style={{ marginTop: 10 }}>
                <strong>{playerResult.player.get('full_name') || playerResult.player.get('display_first_last') || playerResult.player.full_name}</strong>
                <div>Career seasons: {playerResult.career_stats.length}</div>
                <div>Latest season sample:</div>
                <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>{JSON.stringify(playerResult.career_stats[0] || {}, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
