import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MainCalculator from "./components/MainCalculator";
import TabPanel from "./components/TabPanel";
import SeasonalityGrid from "./components/SeasonalityGrid";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tabNumber, setTabNumber] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabNumber} onChange={(e, v) => setTabNumber(v)} aria-label="basic tabs">
          <Tab label="Calculator" {...a11yProps(0)} />
          <Tab label="Seasonality" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabNumber} index={0}>
        <MainCalculator />
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        <SeasonalityGrid />
      </TabPanel>
    </Box>
  );
}

export default App;
