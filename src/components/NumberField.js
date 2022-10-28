import React from "react";
import TextField from "@mui/material/TextField";

function NumberField({ label, value, onChange }) {
  return (
    <TextField
      label={label}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="standard"
      value={value}
      onChange={onChange}
    />
  );
}

export default NumberField;
