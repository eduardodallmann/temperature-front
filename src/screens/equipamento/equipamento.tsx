import React, {useEffect} from 'react';
import {Checkbox, TextField} from '@mui/material';
import {useAtom, useAtomValue} from 'jotai';
import {Thermostat} from '@mui/icons-material';
import {useUpdateAtom} from 'jotai/utils';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {BotaoTermometro, Button} from '../../components/styles';
import {Panel} from '../../components/panel';
import {EquipamentoStyled} from './styled';
import {Table} from '../../components/table/table';
import {equipamentosAtom, getEquipamentosAtom} from '../../components/atoms';
import {
  allCheckStateEquipamentosAtom,
  allIntermediateStateEquipamentosAtom,
  deleteEquipamentoAtom,
  showModalEquipamentoAtom,
  selectAllEquipamentosAtom,
  selectedEquipamentosAtom,
  salvarEquipamentoAtom,
} from './atoms';
import {Modal} from '../../components/modal';

export const Equipamento = () => {
  const [selectedEquipamentos, setSelectedEquipamentos] = useAtom(
    selectedEquipamentosAtom,
  );

  const [showModal, setShowModal] = useAtom(showModalEquipamentoAtom);
  const equipamentos = useAtomValue(equipamentosAtom);
  const allChecked = useAtomValue(allCheckStateEquipamentosAtom);
  const allIntermediate = useAtomValue(allIntermediateStateEquipamentosAtom);

  const getEquipamentos = useUpdateAtom(getEquipamentosAtom);
  const selectAll = useUpdateAtom(selectAllEquipamentosAtom);
  const save = useUpdateAtom(salvarEquipamentoAtom);
  const deleteEquipamento = useUpdateAtom(deleteEquipamentoAtom);

  useEffect(() => {
    getEquipamentos();
  }, []);

  const validationSchema = yup.object({
    nome: yup.string().required('Esse campo é obrigatório'),
    permanencia: yup
      .number()
      .min(1, 'Deve ser 1 ou maior')
      .required('Esse campo é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      nome: '',
      permanencia: 200,
    },
    validationSchema,
    onSubmit: (values) => {
      save(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <Modal
        title="Adicionar novo equipamento"
        visible={showModal}
        cancelText="Cancelar"
        onCancel={() => setShowModal(false)}
        okText="Adicionar"
        onOk={formik.handleSubmit}
        okDisabled={!formik.isValid}
      >
        <form style={{display: 'flex', gap: '14px'}}>
          <TextField
            fullWidth
            id="nome"
            name="nome"
            label="Nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
          />
          <TextField
            fullWidth
            id="permanencia"
            name="permanencia"
            label="Período de permanência dos dados (em dias)"
            type="number"
            value={formik.values.permanencia}
            onChange={formik.handleChange}
            error={
              formik.touched.permanencia && Boolean(formik.errors.permanencia)
            }
            helperText={formik.touched.permanencia && formik.errors.permanencia}
          />
        </form>
      </Modal>
      <Panel title="Equipamentos" scrollIn={650}>
        <EquipamentoStyled>
          <div className="buttons">
            <Button onClick={() => setShowModal(true)}>Adicionar</Button>
            <Button disabled={selectedEquipamentos.length !== 1}>Editar</Button>
            <Button
              disabled={!selectedEquipamentos.length}
              onClick={() => deleteEquipamento()}
            >
              Excluir
            </Button>
          </div>
          <div>
            <Table
              header={[
                <Checkbox
                  key="check"
                  indeterminate={allIntermediate}
                  checked={allChecked}
                  onChange={(_, e) => selectAll(e)}
                />,
                'Nome',
                'Período de permanência dos dados',
                'Ver leitores',
              ]}
              data={equipamentos.map((equipamento) => ({
                values: [
                  <Checkbox
                    key={`check${equipamento.nome}`}
                    checked={
                      !!selectedEquipamentos.find(
                        (s) => s.id === equipamento.id,
                      )
                    }
                    onChange={(_, check) => {
                      setSelectedEquipamentos({equipamento, check});
                    }}
                  />,
                  equipamento.nome,
                  `${equipamento.permanencia} dia${
                    equipamento.permanencia === 1 ? '' : 's'
                  }`,
                  <BotaoTermometro key={`icon${equipamento.nome}`}>
                    <Thermostat />
                  </BotaoTermometro>,
                ],
              }))}
            />
          </div>
        </EquipamentoStyled>
      </Panel>
    </>
  );
};
