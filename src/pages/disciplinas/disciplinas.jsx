import React, {useState, useEffect} from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { api } from '../../services/service';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovaDisciplinaModal from '../../components/cadastrar/disciplina/novaDisciplina';
import TableDisciplinas from '../../components/table/disciplinas/tableDisciplinas';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Disciplinas() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [dados, setDados] = useState([]);
    const [filtrosAtuais, setFiltrosAtuais] = useState({
        termo: '',
        status: 'ativo',
        cargaHoraria: '',
        tipoEnsino: '',
        professoresResponsaveis: '',
        sala: ''
    });

    const recarregarDisciplinas = async () => {
        try {
          const res = await api.get('/disciplinas');
          setDados(res.data.dados || res.data);
        } catch (error) {
          console.error('Erro ao recarregar disciplinas:', error);
        }
      };
    
      useEffect(() => {
        recarregarDisciplinas();
      }, []);

    useEffect(() => {
        async function fetchData() {
            try {
            const res = await api.get('/disciplinas');
            setDados(res.data.dados || res.data);
            } catch (error) {
            console.error('Erro ao buscar professores:', error);
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
        Nome: item.nome,
        CargaHoraria: item.cargaHoraria,
        TipoEnsino: item.tipoEnsino,
        ProfessoresResponsaveis: item.responsavel?.nome,
        Salas: item.salas,
        Status: item.status,
        }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, planilha, 'Disciplinas');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Disciplinas.xlsx');
    };

    return(
        <div className="body-page">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Disciplinas</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Gerenciamento de Disciplinas</h1>
                    <div className="buttons-gerenciamento">
                        <button className='btn-cadastrar' onClick={() => setModalOpen('disciplina')}><img src={MaisIcon} alt="" /> Nova disciplina</button>
                        <button className='btn-exportar' onClick={exportarParaExcel}><img src={ExportarIcon} alt="" /> Exportar dados</button>
                    </div>
                    
                </div>
                <FiltrarTable 
                    tipoEntidade="disciplinas"
                    filtrosAtuais={filtrosAtuais} 
                    onAplicarFiltros={handleAplicarFiltros} 
                />
                <div className="tabela-container">
                    <TableDisciplinas filtros={filtrosAtuais} dadosOriginais={dados} onDadosAtualizados={setDados}/>
                </div>
            </div>
            {modalOpen === 'disciplina' && (<NovaDisciplinaModal handlleCloseModal={() => setModalOpen(false)} onDisciplinasCriadas={recarregarDisciplinas}/>)}
        </div>
    )
}
export default Disciplinas;