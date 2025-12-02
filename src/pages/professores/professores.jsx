import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { api } from '../../services/service';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovoProfessorModal from '../../components/cadastrar/professor/novoProfessor';
import TableProfessor from '../../components/table/professores/tableProf';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Professores() {
    const [modalOpen, setModalOpen] = useState(false);
    const [dados, setDados] = useState([]);
    const [filtrosAtuais, setFiltrosAtuais] = useState({
      status: 'ativo',
      nome: '',
      papel: '',
      email: '',
      senha: '',
    });
    const recarregarProfessores = async () => {
      try {
        const res = await api.get('/professores');
        setDados(res.data.dados || res.data);
      } catch (error) {
        console.error('Erro ao recarregar professores:', error);
      }
    };
  
    useEffect(() => {
      recarregarProfessores();
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
            Nome: item.nome,
            Formacao: item.formacao,
            Telefone: item.telefone,
            Email: item.email,
            Endereco: item.endereco 
              ? `${item.endereco.logradouro}, ${item.endereco.numero} - ${item.endereco.bairro}, ${item.endereco.cidade} - ${item.endereco.uf}`
              : 'Sem endereço',
            Status: item.status
          }))
        );
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, planilha, 'Professores');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'Professores.xlsx');
    };

    return (
        <div className="body-page">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Professores</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Gerenciamento de Professor</h1>
                    <div className="buttons-gerenciamento">
                        <button 
                            className='btn-cadastrar' 
                            onClick={() => setModalOpen('professor')}
                        >
                            <img src={MaisIcon} alt="" /> Novo professor
                        </button>
                        <button 
                            className='btn-exportar' 
                            onClick={exportarParaExcel}
                        >
                            <img src={ExportarIcon} alt="" /> Exportar dados
                        </button>
                    </div>
                </div>
                
                <FiltrarTable 
                    tipoEntidade="professor"
                    filtrosAtuais={filtrosAtuais} 
                    onAplicarFiltros={handleAplicarFiltros} 
                />
                
                <div className="tabela-container">
                    <TableProfessor 
                        filtros={filtrosAtuais} 
                        dadosOriginais={dados}
                        onDadosAtualizados={setDados}
                    />
                </div>
            </div>
            
            {modalOpen === 'professor' && (
                <NovoProfessorModal 
                    handlleCloseModal={() => setModalOpen(false)} 
                    onProfessoresCriados={recarregarProfessores}
                />
            )}
        </div>
    );
}

export default Professores;