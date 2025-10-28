import React, { useState } from 'react';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovoEstudanteModal from '../../components/cadastrar/estudante/novoEstudante';
import Table from '../../components/table/estudantes/tableEst';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css';

function Estudantes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filtrosAtuais, setFiltrosAtuais] = useState({
    termo: '',
    status: 'ativo',
    matricula: '',
    nomeCompleto: '',
    dataNascimento: '',
    turno: '',
    nomeResponsavel: '',
  });

  const handleAplicarFiltros = (filtrosTemp) => {
    setFiltrosAtuais(filtrosTemp);
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
            <button className="btn-exportar">
              <img src={ExportarIcon} alt="" /> Exportar dados
            </button>
          </div>
        </div>

        <FiltrarTable filtrosAtuais={filtrosAtuais}
        onAplicarFiltros={handleAplicarFiltros} />
        <div className="tabela-container">
          <Table filtros={filtrosAtuais} />
        </div>
      </div>
      {modalOpen === 'estudante' && (
        <NovoEstudanteModal handlleCloseModal={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export default Estudantes;