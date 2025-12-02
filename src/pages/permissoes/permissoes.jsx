import React, {useState, useEffect} from 'react';
import { api } from '../../services/service';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import NovaPermissaoUsuarioModal from '../../components/cadastrar/permissoes/usuario';
import TablePermissoes from '../../components/table/permissoes/permissoes';
import FiltrarTable from '../../components/filtrar/filtrarTable';
import '../stylePages.css'

function Permissoes() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [dados, setDados] = useState([]);
    const [filtrosAtuais, setFiltrosAtuais] = useState({
        status: 'ativo',
        nomeCompleto: '',
        email: '',
        papel: '',
    });

    const recarregarUsuarios = async () => {
        try {
          const res = await api.get('/usuarios');
          setDados(res.data.dados || res.data);
        } catch (error) {
          console.error('Erro ao recarregar usuarios:', error);
        }
      };
    
      useEffect(() => {
        recarregarUsuarios();
      }, []);

    useEffect(() => {
    async function fetchData() {
        try {
        const res = await api.get('/usuarios');
        setDados(res.data.dados || res.data);
        } catch (error) {
        console.error('Erro ao buscar usuarios:', error);
        }
    }
    fetchData();
    }, []);

    const handleAplicarFiltros = (filtrosTemp) => {
        setFiltrosAtuais(filtrosTemp);
    };

    return(
        <div className="body-page">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Permissões</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Gerenciamento de Permissões</h1>
                    <div className="buttons-gerenciamento">
                        <button className='btn-cadastrar' onClick={() => setModalOpen('usuarios')}><img src={MaisIcon} alt="" /> Novo usuário</button>
                    </div>
                    
                </div>
                <FiltrarTable 
                    tipoEntidade="usuarios"
                    filtrosAtuais={filtrosAtuais} 
                    onAplicarFiltros={handleAplicarFiltros} 
                />
                <div className="tabela-container">
                    <TablePermissoes filtros={filtrosAtuais} dadosOriginais={dados} onDadosAtualizados={setDados}/>
                </div>
            </div>
            {modalOpen === 'usuarios' && (<NovaPermissaoUsuarioModal handlleCloseModal={() => setModalOpen(false)} onUsuariosCriados={recarregarUsuarios}/>)}
        </div>
    )
}
export default Permissoes;