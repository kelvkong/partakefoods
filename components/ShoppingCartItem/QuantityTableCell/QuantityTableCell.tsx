import { TextField } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { ChangeEventHandler, useCallback, useState } from "react";

export interface QuantityTableCellProps {
  value: number;
  onChange: (val: number) => void;
}

export function QuantityTableCell({ value, onChange }: QuantityTableCellProps) {
  const [_value, _setValue] = useState(String(value));
  const _onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    useCallback(
      (event) => {
        const value = event.target.value;
        _setValue(value);
        if (value) {
          onChange(parseFloat(value));
        }
      },
      [onChange]
    );
  const hasError = !_value || parseFloat(_value) < 0;
  return (
    <TableCell align="right">
      <TextField
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: "0" }}
        value={_value}
        onChange={_onChange}
        type="number"
        error={hasError}
        helperText={hasError ? 'Invalid quantity' : ''}
      />
    </TableCell>
  );
}
