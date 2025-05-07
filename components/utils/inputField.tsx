import * as React from 'react';
import {
  // FormControl,
  // MenuItem,
  // InputLabel,
  Box,
  TextField,
  // Select,
  // NativeSelect,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';


interface InputFieldProps {
  textId: string;
  label: string;
  className?: string;
  type?: 'text' | 'select' | 'date';
  optionArr?: { label: string; value: string | number; keys: number }[];
  value?: string | number | null;
  onChange?: (value: string | number | Dayjs | null) => void;
}

export default function InputField({
  textId,
  label,
  className,
  type = 'text',
  optionArr,
  value,
  onChange,
}: InputFieldProps) {
  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   onChange?.(event.target.value);
  // };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    onChange?.(newValue);
  };

  if (type === 'select') {


    return (
      // <Box sx={{ minWidth: 120 }} className={className}>
      //   <FormControl fullWidth>
      //     <InputLabel id={`${textId}-label`}>{label}</InputLabel>
      //     <NativeSelect
      //       inputProps={{
      //         name: 'age',
      //         id: 'uncontrolled-native',
      //       }}
      //       value={value ?? ''}
      //       onChange={(e) => onChange?.(e.target.value)}
      //     >
      //       {optionArr?.map((option) => (
      //         <option key={option.keys} value={option.value}>
      //           {option.label}
      //         </option>
      //       ))}
      //     </NativeSelect>
      //   </FormControl>
      // </Box>
      <select defaultValue="Large" className="select bg-white border border-black w-full select-lg">
        <option disabled={false}>{label}</option>
        {optionArr?.map((option) => (
          <option key={option.keys} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === 'date') {
    return (
      <Box className={className}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            id={textId}
            label={label}
            onChange={handleDateChange}
            fullWidth
          />
        </LocalizationProvider>
      </Box>
    );
  }

  // Default to text
  return (
    <TextField
      className={className}
      id={textId}
      label={label}
      variant="outlined"
      fullWidth
      value={value ?? ''}
      onChange={handleTextChange}
      type={type}
    />
  );

}
