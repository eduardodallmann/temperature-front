import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import React, { useEffect } from 'react';
import { equipamentosAtom, getEquipamentosAtom } from './atoms';

export const SelectEquipamento = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (e: string) => void;
}) => {
  const equipamentos = useAtomValue(equipamentosAtom);

  const getEquipamentos = useUpdateAtom(getEquipamentosAtom);

  useEffect(() => {
    getEquipamentos();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Equipamento</InputLabel>
      <Select
        value={value}
        label="Equipamento"
        onChange={(e) => {
          onChange(e.target.value);
        }}>
        {equipamentos.map(({ id, nome }) => (
          <MenuItem key={id} value={id}>
            {nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
