import type React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useForm } from 'react-hook-form';
// import { Dispatch, SetStateAction } from 'react';

interface IPlusOneDecisionProps {
  setDecision: (val: boolean) => boolean; // Dispatch<SetStateAction<boolean>>;
}
export const PlusOneDecision = ({setDecision}: IPlusOneDecisionProps) => {
  const {getValues} = useForm();
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="chooseLater"
      name="radio-buttons-group"
    >
      <FormControlLabel value="chooseNow" onChange={() => setDecision(true)} control={<Radio />} label={`Choose for ${getValues().firstName ?? 'them'}`} />
      <FormControlLabel value="chooseLater" onChange={() => setDecision(false)} control={<Radio />} label="Let them decide" />
    </RadioGroup>
  );
};