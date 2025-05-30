import React from 'react';
import SideBar from '../../components/sideBar/sideBar';
import MaisIcon from "../../assets/iconsSvg/mais.svg";
import '../stylePages.css'

function Relatorios() {
    return(
        <div className="body-page body-page-relatorios">
            <SideBar />
            <div className="content-page">
                <h2 className='h2-route'>Home / Relatórios</h2>
                <div className="gerenciamento">
                    <h1 className='h1-gerenciamento'>Relatórios e Documentos</h1>
                </div>
                <div className="documentos">
                    <h2>Documentos</h2>
                    <div className="buttons-relatorios">
                        <button className='btn-relatorios'>Gerar lista de chamada</button>
                        <button className='btn-relatorios'>Registrar ocorrência</button>
                    </div>
                </div>
                <div className="frequencia">
                    <h2>Frequência e Notas</h2>
                    <div className="buttons-relatorios">
                        <button className='btn-relatorios'>Buscar frequência</button>
                        <button className='btn-relatorios'><img src={MaisIcon} alt="" /> Registrar frequência</button>
                        <button className='btn-relatorios'>Buscar notas</button>
                        <button className='btn-relatorios'><img src={MaisIcon} alt="" /> Registrar notas</button>
                    </div>
                </div>
                <div className="financeiro">
                    <h2>Financeiro</h2>
                    <div className="buttons-relatorios">
                        <button className='btn-relatorios'>Busca mensalidades</button>
                        <button className='btn-relatorios'><img src={MaisIcon} alt="" /> Registrar mensalidades</button>
                    </div>
                </div>
                <div className="horarios">
                    <h2>Horários</h2>
                    <button className='btn-relatorios'><img src={MaisIcon} alt="" /> Novo horário</button>
                </div>
            </div>
        </div>
    )
}
export default Relatorios;