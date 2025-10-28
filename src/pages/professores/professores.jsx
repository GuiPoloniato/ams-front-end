import React, {useState} from 'react';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import ExportarIcon from "../../assets/iconsSvg/exportar.svg";
import NovoProfessorModal from '../../components/cadastrar/professor/novoProfessor';
import TableProfessor from '../../components/table/professores/tableProf';
// import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Professores() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ filtrar, setFiltrar ] = useState('');

    const handlleCloseModal = () => {
        setModalOpen(false)
    }

    return(
        <div className="body-page">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Professores</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Gerenciamento de Professor</h1>
                    <div className="buttons-gerenciamento">
                        <button className='btn-cadastrar' onClick={() => setModalOpen('professor')}><img src={MaisIcon} alt="" /> Novo professor</button>
                        <button className='btn-exportar'><img src={ExportarIcon} alt="" /> Exportar dados</button>
                    </div>
                    
                </div>
                {/* <FiltrarTable filtro={setFiltrar}/> */}
                <div className="tabela-container">
                    <TableProfessor filtrar={filtrar} />
                </div>
            </div>
            {modalOpen === 'professor' && (<NovoProfessorModal handlleCloseModal={handlleCloseModal}/>)}
        </div>
    )
}
export default Professores;