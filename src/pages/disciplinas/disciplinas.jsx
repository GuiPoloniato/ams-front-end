import React, {useState} from 'react';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovaDisciplinaModal from '../../components/cadastrar/disciplina/novaDisciplina';
import TableDisciplinas from '../../components/table/disciplinas/tableDisciplinas';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Disciplinas() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ filtrar, setFiltrar ] = useState('');

    const handlleCloseModal = () => {
        setModalOpen(false)
    }

    return(
        <div className="body-page">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Disciplinas</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Gerenciamento de Disciplinas</h1>
                    <div className="buttons-gerenciamento">
                        <button className='btn-cadastrar' onClick={() => setModalOpen('disciplina')}><img src={MaisIcon} alt="" /> Nova disciplina</button>
                        <button className='btn-exportar'><img src={ExportarIcon} alt="" /> Exportar dados</button>
                    </div>
                    
                </div>
                <FiltrarTable filtro={setFiltrar}/>
                <TableDisciplinas filtrar={filtrar}/>
            </div>
            {modalOpen === 'disciplina' && (<NovaDisciplinaModal handlleCloseModal={handlleCloseModal}/>)}
        </div>
    )
}
export default Disciplinas;