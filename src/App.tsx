import { useState } from 'react'
import { Select, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <MantineProvider>
          <Select className='select'
            label="Pick A Team"
            placeholder='Pick Value'
            data={['react', 'angular', 'vue', 'svelte']}
          />
        </MantineProvider>
      </div>
    </>
  )
}

export default App
