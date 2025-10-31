import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { api } from '../../services/service';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovoEstudanteModal from '../../components/cadastrar/estudante/novoEstudante';
import Table from '../../components/table/estudantes/tableEst';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css';

function Estudantes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [filtrosAtuais, setFiltrosAtuais] = useState({
    termo: '',
    status: 'ativo',
    matricula: '',
    nomeCompleto: '',
    dataNascimento: '',
    turno: '',
    nomeResponsavel: '',
  });

  const recarregarAlunos = async () => {
    try {
      const res = await api.get('/alunos');
      setDados(res.data.dados || []);
    } catch (error) {
      console.error('Erro ao recarregar estudantes:', error);
    }
  };

  useEffect(() => {
    recarregarAlunos();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/alunos');
        setDados(res.data.dados || res.data);
      } catch (error) {
        console.error('Erro ao buscar estudantes:', error);
      }
    }
    fetchData();
  }, []);

  const handleAplicarFiltros = (filtrosTemp) => {
    setFiltrosAtuais(filtrosTemp);
  };

  const exportarParaExcel = () => {
    if (!dados.length) {
      alert('Nenhum dado disponível para exportar.');
      return;
    }

    const planilha = XLSX.utils.json_to_sheet(
      dados.map(item => ({
        Matrícula: item.matricula,
        Nome: item.nome,
        Nascimento: new Date(item.nascimento).toLocaleDateString('pt-BR'),
        Turno: item.turno,
        Responsável: item.responsavel?.nome || '',
        Telefone: item.responsavel?.celular || '',
        Status: item.status,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, planilha, 'Estudantes');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'estudantes.xlsx');
  };

  return (
    <div className="body-page">
      <SideBar />
      <div className="content-page">
        <h2 className="h2-route">Home / Estudantes</h2>
        <div className="gerenciamento">
          <h1 className="h1-gerenciamento">Gerenciamento de Estudantes</h1>
          <div className="buttons-gerenciamento">
            <button className="btn-cadastrar" onClick={() => setModalOpen('estudante')}>
              <img src={MaisIcon} alt="" /> Novo estudante
            </button>
            <button className="btn-exportar" onClick={exportarParaExcel}>
              <img src={ExportarIcon} alt="" /> Exportar dados
            </button>
          </div>
        </div>

        <FiltrarTable 
          tipoEntidade="estudante"
          filtrosAtuais={filtrosAtuais} 
          onAplicarFiltros={handleAplicarFiltros} 
          />
        <div className="tabela-container">
          <Table filtros={filtrosAtuais} dadosOriginais={dados} />
        </div>
      </div>
      {modalOpen === 'estudante' && (
        <NovoEstudanteModal handlleCloseModal={() => setModalOpen(false)} onEstudanteCriado={recarregarAlunos}/>
      )}
    </div>
  );
}

export default Estudantes;