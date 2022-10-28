import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Input,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ResultField from "./ResultField";

function ProbabilityCalculator({ indexPrice, strikePrice }) {
  const [buyDate, setBuyDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState(31);

  const [volatility, setVolatility] = useState(0.1);

  const [probability, setProbability] = useState({ above: 0, below: 0 });
  const [estimatedPrices, setEstimatedPrices] = useState({ call: 0, put: 0 });

  const cumNormDist = function (t) {
    const s = 0.31938153,
      e = -0.356563782,
      i = 1.781477937,
      a = -1.821255978,
      o = 1.330274429,
      l = 0.2316419,
      r = 0.39894228;
    let c = 0;
    return t >= 0
      ? ((c = 1 / (1 + l * t)),
        1 - r * Math.exp((-t * t) / 2) * c * (c * (c * (c * (c * o + a) + i) + e) + s))
      : ((c = 1 / (1 - l * t)),
        r * Math.exp((-t * t) / 2) * c * (c * (c * (c * (c * o + a) + i) + e) + s));
  };

  useEffect(() => {
    const computeEstimatedPrices = function (
      underlyingPrice,
      strikePrice,
      volatility,
      interestRate,
      calendarDays
    ) {
      const t = interestRate;
      const s = volatility;
      const e = calendarDays;
      const i = Math.log(underlyingPrice / strikePrice);
      const a = t + 0.5 * Math.pow(s, 2);
      const o = e / 365;
      const l = cumNormDist((i + a * o) / (s * Math.sqrt(e / 365)));
      const callPrice =
        underlyingPrice * l -
        strikePrice *
          Math.exp((-t * e) / 365) *
          cumNormDist(
            (Math.log(underlyingPrice / strikePrice) + ((t + 0.5 * Math.pow(s, 2)) * e) / 365) /
              (s * Math.sqrt(e / 365)) -
              s * Math.sqrt(e / 365)
          );
      const putPrice =
        callPrice + strikePrice * Math.exp((-interestRate * e) / 365) - underlyingPrice;

      return { call: callPrice, put: putPrice };
    };

    const computeProbability = function (underlyingPrice, strikePrice, volatility) {
      const t = underlyingPrice;
      const s = strikePrice;
      const e = calendarDays / 365;
      const i = volatility;
      const a = i * Math.sqrt(e);
      const o = Math.log(s / t);
      const l = o / a;
      const r = Math.floor((1 / (1 + 0.2316419 * Math.abs(l))) * 1e5) / 1e5;
      const c = Math.floor(0.3989423 * Math.exp((-l * l) / 2) * 1e5) / 1e5;
      const n = 1.330274 * Math.pow(r, 5);
      const p = 1.821256 * Math.pow(r, 4);
      const m = 1.781478 * Math.pow(r, 3);
      const d = 0.356538 * Math.pow(r, 2);
      const f = 0.3193815 * r;
      let u = 1 - c * (n - p + m - d + f);

      u = Math.floor(1e5 * u) / 1e5;
      l < 0 && (u = 1 - u);
      return { above: Math.floor(1e3 * u) / 10, below: Math.floor(1e3 * (1 - u)) / 10 };
    };

    setProbability(computeProbability(indexPrice, strikePrice, volatility));
    setEstimatedPrices(
      computeEstimatedPrices(indexPrice, strikePrice, volatility, 0.04, calendarDays)
    );
  }, [volatility, calendarDays, strikePrice, indexPrice]);

  useEffect(() => {
    setCalendarDays(Math.ceil((expiryDate - buyDate) / (1000 * 60 * 60 * 24)));
  }, [buyDate, expiryDate]);

  return (
    <Card variant="outlined">
      <CardHeader title="Probability Calculator" />
      <CardContent>
        <Box
          sx={{
            display: "grid",
            columnGap: 3,
            rowGap: 2,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* <Stack spacing={3} direction="row"> */}
            <MobileDatePicker
              label="Buy Date"
              value={buyDate}
              onChange={(nd) => {
                setBuyDate(nd);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <MobileDatePicker
              label="Expiry Date"
              value={expiryDate}
              onChange={(nd) => {
                setExpiryDate(nd);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            {/* </Stack> */}
          </LocalizationProvider>
          {/* <Stack direction="row" spacing={2} sx={{ my: 2 }}> */}
          <ResultField label="Calendar Days" text={calendarDays}></ResultField>
          <ResultField label="Interest Rate" text={0.04}></ResultField>
          {/* </Stack> */}
        </Box>

        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Typography>Volatility</Typography>
          <Slider
            aria-label="Volatility"
            aria-labelledby="volatility-slider"
            min={0}
            max={100}
            step={1}
            value={Math.round(volatility * 100)}
            onChange={(e) => setVolatility(parseFloat(e.target.value) / 100)}
          />
          <Input
            value={Math.round(volatility * 100)}
            size="small"
            onChange={(e) =>
              setVolatility(e.target.value === "" ? "" : parseFloat(e.target.value) / 100)
            }
            onBlur={() => {
              if (volatility < 0) {
                setVolatility(0);
              } else if (volatility > 1) {
                setVolatility(1);
              }
            }}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "volatility-slider",
            }}
          />
        </Stack>
        <Box
          sx={{
            display: "grid",
            columnGap: 3,
            rowGap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <ResultField label="Probability Above" text={probability.above} />
          <ResultField label="Probability Below" text={probability.below} />
          <ResultField label="Call Price" text={estimatedPrices.call?.toFixed(2)} />
          <ResultField label="Put Price" text={estimatedPrices.put?.toFixed(2)} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProbabilityCalculator;
