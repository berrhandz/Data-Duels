import { useState } from 'react'
import { Select, MantineProvider, Table } from '@mantine/core'
import getTeamStats from '../nba.tsx'
import team from '../../team.json'
import '@mantine/core/styles.css';
import './App.css'

getTeamStats('https://ghibliapi.herokuapp.com/films')
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
  const columnHeaders = columns.map(column => <Table.Th>{column}</Table.Th>)
  const [value, setValue] = useState<string | null>('');
  function teamSelect() {
    return <Select className='select'
      label="Pick A Team"
      placeholder={'Select Team'}
      data={teams}
      value={value}
      onChange={e => setValue(e)}
    />

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
          <div className='team2'>
            <MantineProvider>
              {teamSelect()}
            </MantineProvider>
          </div>
        </div>
        <div className='mainTable1'>
          <MantineProvider>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  {columnHeaders}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {player}
              </Table.Tbody>
            </Table>
          </MantineProvider>
        </div>
      </div>
    </>
  )
}

export default App
