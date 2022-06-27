import React, {useEffect} from 'react';
import {Checkbox, TextField} from '@mui/material';
import {useAtom, useAtomValue} from 'jotai';
import {Thermostat} from '@mui/icons-material';
import {useUpdateAtom} from 'jotai/utils';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useParams} from 'react-router-dom';
import {Leitor} from '../../types/leitura';
import {BotaoTermometro, Button} from '../../components/styles';
import {Panel} from '../../components/panel';
import {EquipamentoStyled} from './styled';
import {Table} from '../../components/table/table';
import {
  allCheckStateLeitoresAtom,
  equipamentoAtom,
  getLeitoresAtom,
  leitoresAtom,
  selectedLeitoresAtom,
  showModalLeitorAtom,
} from './atoms';
import {Modal} from '../../components/modal';

export const Leitores = () => {
  const {id} = useParams<{id: string}>();

  const [selectedLeitores, setSelectedLeitores] = useAtom(selectedLeitoresAtom);

  const [showModal, setShowModal] = useAtom(showModalLeitorAtom);
  const equipamento = useAtomValue(equipamentoAtom);
  const leitores = useAtomValue(leitoresAtom);
  const allChecked = useAtomValue(allCheckStateLeitoresAtom);
  // const allIntermediate = useAtomValue(allIntermediateStateLeitoresAtom);

  const getLeitores = useUpdateAtom(getLeitoresAtom);
  // const selectAll = useUpdateAtom(selectAllLeitoresAtom);
  // const save = useUpdateAtom(salvarEquipamentoAtom);
  // const deleteEquipamento = useUpdateAtom(deleteEquipamentoAtom);

  useEffect(() => {
    getLeitores(id);
  }, []);

  const geraFaixa = ({
    limiteToleranciaMaxima,
    toleranciaMaxima,
    limiteToleranciaMinima,
    toleranciaMinima,
  }: Leitor) => {
    const c = '°C';

    return `${limiteToleranciaMaxima}${c} - ${toleranciaMaxima}${c} | ${toleranciaMinima}${c} - ${limiteToleranciaMinima}${c}`;
  };

  const validationSchema = yup.object({
    nome: yup.string().required('Esse campo é obrigatório'),
    permanencia: yup
      .number()
      .min(1, 'Deve ser 1 ou maior')
      .required('Esse campo é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      nome: '',
      permanencia: 200,
    },
    validationSchema,
    onSubmit: (values) => {
      // save(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <Modal
        title={
          showModal === 'new'
            ? 'Adicionar novo equipamento'
            : 'Editar equipamento'
        }
        visible={!!showModal}
        cancelText="Cancelar"
        onCancel={() => setShowModal()}
        okText={showModal === 'new' ? 'Adicionar' : 'Editar'}
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
      <Panel title="Leitores" scrollIn={650}>
        <EquipamentoStyled>
          <div className="buttons">
            <Button onClick={() => setShowModal('new')}>Adicionar</Button>
            <Button
              onClick={() => {
                formik.setValues(selectedLeitores[0]);
                setShowModal('edit');
              }}
              disabled={selectedLeitores.length !== 1}
            >
              Editar
            </Button>
            <Button
              disabled={!selectedLeitores.length}
              // onClick={() => deleteEquipamento()}
            >
              Excluir
            </Button>
          </div>
          <div>
            <Table
              header={[
                <Checkbox
                  key="check"
                  // indeterminate={allIntermediate}
                  checked={allChecked}
                  // onChange={(_, e) => selectAll(e)}
                />,
                'Descrição',
                'Frequência de leitura',
                'Faixa de tolerâncias máxima e mínima',
              ]}
              data={leitores.map((leitor) => ({
                values: [
                  <Checkbox
                    key={`check${leitor.descricao}`}
                    // checked={!!selectedLeitores.find((s) => s.id === leitor.id)}
                    // onChange={(_, check) => {
                    //   setSelectedLeitores({equipamento: leitor, check});
                    // }}
                  />,
                  leitor.descricao,
                  `${leitor.frequenciaLeitura} minuto${
                    leitor.frequenciaLeitura === 1 ? '' : 's'
                  }`,
                  geraFaixa(leitor),
                ],
              }))}
            />
          </div>
        </EquipamentoStyled>
      </Panel>
    </>
  );
};
