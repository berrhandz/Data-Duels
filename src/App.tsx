import { useState } from 'react'
import { Select, MantineProvider } from '@mantine/core'
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
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <MantineProvider>
          <Select className='select'
            label="Pick A Team"
            placeholder='Pick Value'
            data={teams}
          />
        </MantineProvider>
      </div>
    </>
  )
}

export default App
