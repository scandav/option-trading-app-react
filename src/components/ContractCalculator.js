import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Input,
  InputAdornment,
  LinearProgress,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import NumberField from "./NumberField";
import ResultField from "./ResultField";

function ContractCalculator() {
  const [startCapital, setStartCapital] = useState(1000);
  const [expReturn, setExpReturn] = useState(0.1);
  const [safetyPrice, setSafetyPrice] = useState(200);
  const [contractValue, setContractValue] = useState(1);
  const [simulatedPrice, setSimulatedPrice] = useState(0);

  let maxContracts = (startCapital * (expReturn + 1)) / safetyPrice;
  let riskScore = Math.min((maxContracts / startCapital) * 1e4, 400);
  let cashedMonthly = startCapital * expReturn;
  let indicativeOpeningPrice = cashedMonthly / maxContracts;
  let profit = (indicativeOpeningPrice - simulatedPrice) * maxContracts;

  function riskColour(riskValue) {
    if (riskValue < 70) return "success";
    if (riskValue < 170) return "warning";
    return "error";
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Contract Details" />
      <CardContent>
        <NumberField
          label="Starting Capital"
          value={startCapital.toString()}
          onChange={(e) => setStartCapital(parseFloat(e.target.value))}
        />
        {/* EXPECTED RETURN */}
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Typography>Expected Return</Typography>
          <Slider
            aria-label="expected-return"
            aria-labelledby="expected-return-slider"
            min={0}
            max={1}
            step={0.01}
            value={expReturn}
            onChange={(e) => setExpReturn(parseFloat(e.target.value))}
          />
          <Input
            value={Math.round(expReturn * 100)}
            size="small"
            onChange={(e) =>
              setExpReturn(e.target.value === "" ? "" : parseFloat(e.target.value) / 100)
            }
            onBlur={() => {
              if (expReturn < 0) {
                setExpReturn(0);
              } else if (expReturn > 1) {
                setExpReturn(1);
              }
            }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            inputProps={{
              step: 0.01,
              min: 0,
              max: 1,
              type: "number",
              "aria-labelledby": "expected-return-slider",
            }}
          />
        </Stack>
        {/* SAFETY PRICE */}
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Typography>Safety Price</Typography>
          <Slider
            aria-label="safety-price"
            aria-labelledby="safety-price-slider"
            min={0}
            max={500}
            step={1}
            value={safetyPrice}
            onChange={(e) => setSafetyPrice(parseFloat(e.target.value))}
          />
          <Input
            value={safetyPrice}
            size="small"
            onChange={(e) =>
              setSafetyPrice(e.target.value === "" ? "" : parseFloat(e.target.value))
            }
            onBlur={() => {
              if (safetyPrice < 0) {
                setSafetyPrice(0);
              } else if (safetyPrice > 500) {
                setSafetyPrice(500);
              }
            }}
            endAdornment={<InputAdornment position="end">$/€</InputAdornment>}
            inputProps={{
              step: 1,
              min: 0,
              max: 500,
              type: "number",
              "aria-labelledby": "safety-price-slider",
            }}
          />
        </Stack>
        {/* RISK SCORE */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ minWidth: 100 }}>
            <Typography>Risk Score</Typography>
          </Box>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              color={riskColour(riskScore)}
              variant="determinate"
              value={riskScore / 4}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2">{riskScore.toFixed()}</Typography>
          </Box>
        </Box>
        {/* RESULTS SECTION */}
        <Box
          sx={{
            my: 2,
            display: "grid",
            columnGap: 3,
            rowGap: 2,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <ResultField label="Cashed Monthly" text={cashedMonthly.toFixed(2)}></ResultField>
          <ResultField
            label="Indicative Price for Opening"
            text={indicativeOpeningPrice.toFixed(2)}
          ></ResultField>
          <ResultField
            label="Max Number of Contracts"
            text={Math.round((maxContracts / contractValue) * 100) / 100}
          ></ResultField>
          <NumberField
            label="Contract Value"
            value={contractValue.toString()}
            onChange={(e) =>
              setContractValue(parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : 1)
            }
          />
          <NumberField
            label="Simulated Price"
            value={simulatedPrice.toString()}
            onChange={(e) => setSimulatedPrice(parseFloat(e.target.value))}
          />
          <ResultField label="Simulated Profit/Loss" text={profit.toFixed(2)}></ResultField>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ContractCalculator;
