import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useAtom} from 'jotai';
import React, {useEffect} from 'react';
import {getEquipamentos} from '../services/equipamento.service';
import {equipamentosAtom} from './atoms';

export const SelectEquipamento = ({
  value,
  onChange,
}: {
  value?: number;
  onChange: (e: number) => void;
}) => {
  const [equipamentos, setEquipamentos] = useAtom(equipamentosAtom);

  useEffect(() => {
    getEquipamentos().then(setEquipamentos);
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Equipamento</InputLabel>
      <Select
        value={value}
        label="Equipamento"
        onChange={(e) => {
          onChange(Number(e.target.value));
        }}
      >
        {equipamentos.map(({id, nome}) => (
          <MenuItem key={id} value={id}>
            {nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
