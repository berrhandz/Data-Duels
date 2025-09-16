import { MantineProvider, Table } from "@mantine/core"
import type { ReactNode } from "react"

type tableProps = {
    data: {
      columnHeader: ReactNode[], 
      players: ReactNode[]
    }
}

function BuildTable ({data}: tableProps){
    return(
        <div className='mainTable1'>
          <MantineProvider>
            <Table>
              <Table.Thead>
                <Table.Tr>
                {data.columnHeader}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.players}
              </Table.Tbody>
            </Table>
          </MantineProvider>
        </div>
    )
}
export default BuildTable

