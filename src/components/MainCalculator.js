import React, { useState } from "react";
import ProbabilityCalculator from "./ProbabilityCalculator";
import ContractCalculator from "./ContractCalculator";
import { Card, CardHeader, CardContent, Container, Stack } from "@mui/material";
import ResultField from "./ResultField";
import NumberField from "./NumberField";

function MainCalculator() {
  const [indexPrice, setIndexPrice] = useState(4500);
  const [strikePrice, setStrikePrice] = useState(4500);

  return (
    <Container maxWidth="xl">
      {/* <Container sx={{ minWidth: "100%", height: "100vh" }}> */}
      <Card variant="outlined">
        <CardHeader title="IOTA: Index Options Trading Aid" />
        <CardContent>
          <Stack spacing={6}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
              <NumberField
                label="Index Price"
                value={indexPrice.toString()}
                onChange={(e) => setIndexPrice(parseFloat(e.target.value))}
              />
              <NumberField
                label="Strike Price"
                value={strikePrice.toString()}
                onChange={(e) => setStrikePrice(parseFloat(e.target.value))}
              />
              <ResultField
                label="Distance from strike price"
                text={(((strikePrice - indexPrice) / indexPrice) * 100).toFixed(2)}
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
              <ProbabilityCalculator indexPrice={indexPrice} strikePrice={strikePrice} />
              <ContractCalculator />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default MainCalculator;
