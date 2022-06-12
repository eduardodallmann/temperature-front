import React from 'react';
import {Description} from '../components/description';
import {Panel} from '../components/panel';
import {CenterDash} from './styles';

export function HomeScreen() {
  return (
    <>
      <Panel title="Leitura fora da tolerância nas últimas 24 horas">
        <CenterDash>
          <Description
            title="20,65°C"
            subtitle="00:15:01 última leitura fora da tolerância"
            error
          >
            O equipamento Geladeira Fundos fez 1 leitura fora da tolerância
          </Description>
        </CenterDash>
      </Panel>

      <Panel title="Status atual dos equipamentos">
        <CenterDash>
          <Description title="14,32°C" subtitle="00:25:01 última leitura">
            O equipamento Geladeira Fundos está com a temperatura dentro do
            esperado
          </Description>
          <Description title="10,11°C" subtitle="00:02:15 última leitura">
            O equipamento Geladeira Pública está com a temperatura dentro do
            esperado
          </Description>
          <Description title="10,11°C" subtitle="00:02:15 última leitura">
            O equipamento Geladeira Pública está com a temperatura dentro do
            esperado
          </Description>
          <Description title="10,11°C" subtitle="00:02:15 última leitura">
            O equipamento Geladeira Pública está com a temperatura dentro do
            esperado
          </Description>
          <Description title="10,11°C" subtitle="00:02:15 última leitura">
            O equipamento Geladeira Pública está com a temperatura dentro do
            esperado
          </Description>
          <Description title="10,11°C" subtitle="00:02:15 última leitura">
            O equipamento Geladeira Pública está com a temperatura dentro do
            esperado
          </Description>
          <Description title="10,11°C" subtitle="00:02:15 última leitura">
            O equipamento Geladeira Pública está com a temperatura dentro do
            esperado
          </Description>
        </CenterDash>
      </Panel>
    </>
  );
}
