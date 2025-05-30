import React, {useState} from 'react';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovaTurmaModal from '../../components/cadastrar/turma/novaTruma';
import TableTurmas from '../../components/table/turmas/tableTurmas';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Turmas() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ filtrar, setFiltrar ] = useState('');

    const handlleCloseModal = () => {
        setModalOpen(false)
    }

    return(
        <div className="body-page">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Turmas</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Gerenciamento de Turmas</h1>
                    <div className="buttons-gerenciamento">
                        <button className='btn-cadastrar' onClick={() => setModalOpen('turma')}><img src={MaisIcon} alt="" /> Nova turma</button>
                        <button className='btn-exportar'><img src={ExportarIcon} alt="" /> Exportar dados</button>
                    </div>
                    
                </div>
                <FiltrarTable filtro={setFiltrar}/>
                <div className="tabela-container">
                    <TableTurmas filtrar={filtrar} />
                </div>
            </div>
            {modalOpen === 'turma' && (<NovaTurmaModal handlleCloseModal={handlleCloseModal}/>)}
        </div>
    )
}
export default Turmas;