import { useState } from 'react'
import { Select, MantineProvider, Table } from '@mantine/core'
import team from '../team.json'
import '@mantine/core/styles.css';
import './App.css'
const teams = team.map((x) => {
  return {
    value: String(x.name),
    label: String(x.name)
  }
})
console.log(teams)
function App() {
  const [team1, setTeam1] = useState('Team 1')

  function teamSelect() {
    const [team1, setTeam1] = useState('Team 1')
    return <Select className='select'
      label="Pick A Team"
      placeholder={team1}
      data={teams}
      value={team1 ? team1 : null}
      onChange={(_value) => setTeam1(String(_value))}
      allowDeselect
    />

  }
  return (
    <>
      <div>
        <MantineProvider>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th colSpan={5}>Element position</Table.Th>
                <Table.Th colSpan={5}>Element name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{ }</Table.Tbody>
          </Table>
        </MantineProvider>
      </div>
      <div>
        <MantineProvider>
          <Select className='select'
            label="Pick A Team"
            placeholder={team1}
            data={teams}
            defaultValue={'Pick a Team'}
          />
        </MantineProvider>
      </div>
      <div>
        <MantineProvider>
          <Select className='select'
            label="Pick A Team"
            placeholder={team1}
            data={teams}
          />
        </MantineProvider>
      </div>
    </>
  )
}

export default App
