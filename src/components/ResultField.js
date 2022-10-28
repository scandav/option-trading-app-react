import React from "react";
import TextField from "@mui/material/TextField";

function ResultField({ label, text }) {
  return (
    <TextField
      label={label}
      value={text}
      InputProps={{
        readOnly: true,
      }}
      variant="filled"
      inputProps={{ style: { textAlign: "right" } }}
      sx={{ input: { fontWeight: "normal", fontSize: "1.1rem" } }}
    />
  );
}

export default ResultField;
