import React from 'react'
import Grid from '@mui/material/Grid'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import ResearchMainTab from './research/researchmaintab'

export default function ResearchMain() {
  return (
    <Grid container>
      <Grid container style={{ paddingTop: '1%' }}>
        <Tabs style={{ width: '100%', flexGrow: 1 }}>
          <TabList style={{ fontSize: '0.9vw' }}>
            <Tab> Research </Tab>
          </TabList>
          <TabPanel>
            <ResearchMainTab />
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid>
  )
}
