import React, {useEffect} from 'react';
import {Checkbox, Grid, TextField} from '@mui/material';
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
  allIntermediateStateLeitoresAtom,
  deleteLeitorAtom,
  equipamentoAtom,
  getLeitoresAtom,
  leitoresAtom,
  salvarLeitorAtom,
  selectAllLeitoresAtom,
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
  const allIntermediate = useAtomValue(allIntermediateStateLeitoresAtom);

  const getLeitores = useUpdateAtom(getLeitoresAtom);
  const selectAll = useUpdateAtom(selectAllLeitoresAtom);
  const save = useUpdateAtom(salvarLeitorAtom);
  const deleteEquipamento = useUpdateAtom(deleteLeitorAtom);

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
    frequencia: yup
      .number()
      .min(1, 'Deve ser 1 ou maior')
      .required('Esse campo é obrigatório'),
    limiteToleranciaMaxima: yup.number().required('Esse campo é obrigatório'),
    toleranciaMaxima: yup.number().required('Esse campo é obrigatório'),
    toleranciaMinima: yup.number().required('Esse campo é obrigatório'),
    limiteToleranciaMinima: yup.number().required('Esse campo é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      nome: '',
      frequencia: 5,
      limiteToleranciaMaxima: 10,
      toleranciaMaxima: 5,
      toleranciaMinima: 0,
      limiteToleranciaMinima: -2,
      equipamento: id,
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
        title={showModal === 'new' ? 'Adicionar novo leitor' : 'Editar leitor'}
        visible={!!showModal}
        cancelText="Cancelar"
        onCancel={() => setShowModal()}
        okText={showModal === 'new' ? 'Adicionar' : 'Editar'}
        onOk={formik.handleSubmit}
        okDisabled={!formik.isValid}
      >
        <form style={{display: 'flex', gap: '14px'}}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="nome"
                name="nome"
                label="Descrição"
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="frequencia"
                name="frequencia"
                label="Frequência de leitura (minutos)"
                type="number"
                value={formik.values.frequencia}
                onChange={formik.handleChange}
                error={
                  formik.touched.frequencia && Boolean(formik.errors.frequencia)
                }
                helperText={
                  formik.touched.frequencia && formik.errors.frequencia
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="limiteToleranciaMaxima"
                name="limiteToleranciaMaxima"
                label="Limite de tolerância máxima (°C)"
                type="number"
                value={formik.values.limiteToleranciaMaxima}
                onChange={formik.handleChange}
                error={
                  formik.touched.limiteToleranciaMaxima &&
                  Boolean(formik.errors.limiteToleranciaMaxima)
                }
                helperText={
                  formik.touched.limiteToleranciaMaxima &&
                  formik.errors.limiteToleranciaMaxima
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="toleranciaMaxima"
                name="toleranciaMaxima"
                label="Tolerância máxima (°C)"
                type="number"
                value={formik.values.toleranciaMaxima}
                onChange={formik.handleChange}
                error={
                  formik.touched.toleranciaMaxima &&
                  Boolean(formik.errors.toleranciaMaxima)
                }
                helperText={
                  formik.touched.toleranciaMaxima &&
                  formik.errors.toleranciaMaxima
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="toleranciaMinima"
                name="toleranciaMinima"
                label="Tolerância mínima (°C)"
                type="number"
                value={formik.values.toleranciaMinima}
                onChange={formik.handleChange}
                error={
                  formik.touched.toleranciaMinima &&
                  Boolean(formik.errors.toleranciaMinima)
                }
                helperText={
                  formik.touched.toleranciaMinima &&
                  formik.errors.toleranciaMinima
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="limiteToleranciaMinima"
                name="limiteToleranciaMinima"
                label="Limite de tolerância mínima (°C)"
                type="number"
                value={formik.values.limiteToleranciaMinima}
                onChange={formik.handleChange}
                error={
                  formik.touched.limiteToleranciaMinima &&
                  Boolean(formik.errors.limiteToleranciaMinima)
                }
                helperText={
                  formik.touched.limiteToleranciaMinima &&
                  formik.errors.limiteToleranciaMinima
                }
              />
            </Grid>
          </Grid>
        </form>
      </Modal>
      <Panel
        title={`Leitores do equipamento ${equipamento?.nome || ''}`}
        scrollIn={650}
      >
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
              onClick={() => deleteEquipamento(id)}
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
                'Descrição',
                'Frequência de leitura',
                'Faixa de tolerâncias máxima e mínima',
              ]}
              data={leitores.map((leitor) => ({
                values: [
                  <Checkbox
                    key={`check${leitor.nome}`}
                    checked={!!selectedLeitores.find((s) => s.id === leitor.id)}
                    onChange={(_, check) => {
                      setSelectedLeitores({leitor, check});
                    }}
                  />,
                  leitor.nome,
                  `${leitor.frequencia} minuto${
                    leitor.frequencia === 1 ? '' : 's'
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
