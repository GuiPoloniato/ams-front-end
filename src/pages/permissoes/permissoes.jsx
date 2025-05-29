import React, {useState} from 'react';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import NovaPermissaoUsuarioModal from '../../components/cadastrar/permissoes/usuario';
import TablePermissoes from '../../components/table/permissoes/permissoes';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Permissoes() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ filtrar, setFiltrar ] = useState('');

    const handlleCloseModal = () => {
        setModalOpen(false)
    }

    return(
        <div className="body-page">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Permissões</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Gerenciamento de Permissões</h1>
                    <div className="buttons-gerenciamento">
                        <button className='btn-cadastrar' onClick={() => setModalOpen('permissao')}><img src={MaisIcon} alt="" /> Novo usuário</button>
                    </div>
                    
                </div>
                <FiltrarTable filtro={setFiltrar}/>
                <TablePermissoes filtrar={filtrar}/>
            </div>
            {modalOpen === 'permissao' && (<NovaPermissaoUsuarioModal handlleCloseModal={handlleCloseModal}/>)}
        </div>
    )
}
export default Permissoes;