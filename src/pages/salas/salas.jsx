import React, {useState, useEffect} from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { api } from '../../services/service';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovaSalaModal from '../../components/cadastrar/sala/novaSala';
import TableSalas from '../../components/table/salas/tableSalas';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Salas() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [dados, setDados] = useState([]);
    const [filtrosAtuais, setFiltrosAtuais] = useState({
        termo: '',
        status: 'ativo',
        nomeCompleto: '',
        email: '',
        telefone: '',
    });

    useEffect(() => {
        async function fetchData() {
            try {
            const res = await api.get('/salas');
            setDados(res.data.dados || res.data);
            } catch (error) {
            console.error('Erro ao buscar salas:', error);
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
    XLSX.utils.book_append_sheet(wb, planilha, 'Salas');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Salas.xlsx');
    };


return(
    <div className="body-page">
        <SideBar />
        <div className="content-page">
            <h2 className='h2-route'>Home / Salas</h2>
            <div className="gerenciamento">
                <h1 className='h1-gerenciamento'>Gerenciamento de Salas</h1>
                <div className="buttons-gerenciamento">
                    <button className='btn-cadastrar' onClick={() => setModalOpen('sala')}><img src={MaisIcon} alt="" /> Nova Sala</button>
                    <button className='btn-exportar' onClick={exportarParaExcel}><img src={ExportarIcon} alt="" /> Exportar dados</button>
                </div>
                
            </div>
            <FiltrarTable 
                tipoEntidade="salas"
                filtrosAtuais={filtrosAtuais} 
                onAplicarFiltros={handleAplicarFiltros}
            />
            <div className="tabela-container">
                <TableSalas filtros={filtrosAtuais} />
            </div>
        </div>
        {modalOpen === 'sala' && (<NovaSalaModal handlleCloseModal={() => setModalOpen(false) }/>)}
    </div>
)
}
export default Salas;