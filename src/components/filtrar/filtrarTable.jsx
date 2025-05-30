import { useState, useEffect } from 'react';
import PesquisaIcon from "../../assets/iconsSvg/pesquisaIcon.svg";
import FiltroIcon from "../../assets/iconsSvg/filtroAvancado.svg";
import FecharFiltro from "../../assets/iconsSvg/xFecharIcon.svg"
import "./style.css";

function FiltrarTable({ filtro }) {
    const [termo, setTermo] = useState('');
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ filtrosAvancados, setFiltrosAvancados ] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setTermo(value);
        filtro(value);
    };

    const aplicarFiltro = (filtrosSelecionados) => {
        setFiltrosAvancados(filtrosSelecionados);
        setModalOpen(false);
    }


    return (
        <>
            <div className="pesquisarTable">
                <div className="input-pesquisar">
                    <img src={PesquisaIcon} alt="Icon pesquisa" />
                    <input
                    type="text"
                    placeholder="Pesquisar por nome..."
                    value={termo}
                    onChange={handleChange}
                    />
                </div>
                <img className='img-filtroIcon' src={FiltroIcon} alt="Filtro" onClick={() => setModalOpen(true)} />

                {filtrosAvancados.map((filtro, idx) => (
                    <div className="filtro-selecionado" key={idx}>
                        {filtro} 
                        <img src={FecharFiltro} alt="Icon Fechar" onClick={() => {
                            const novaFiltragem = [...filtrosAvancados];
                            novaFiltragem.splice(idx, 1); //para eu remover o filtro criado
                            setFiltrosAvancados(novaFiltragem)
                        }}/>
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div className="body-modalFiltragem">
                    <div className="modal-content">
                        <h2 className='h2-content'>Filtros</h2>
                        <hr />
                        <div className="formulario-filtros">
                            <label htmlFor="" className='label-status'>Status</label>
                            <div className="status-buttons">
                                <button className="ativo">Ativos</button>
                                <button className="inativo">Inativos</button>
                            </div>
                            <div className="linha-flex">
                                <div className="campo">
                                    <label htmlFor="">Matrícula</label>
                                    <input type="text" className='inputMatricula' />
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Nome completo</label>
                                    <input type="text" className='inputName' />
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Data de nascimento</label>
                                    <input type="date" className='inputDataNascimento' />
                                </div>
                            </div>
                            <div className="linha-flex">
                                <div className="campo">
                                    <label htmlFor="">Série</label>
                                    <select className='selectSerie' id="selectSerie"></select>
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Turno</label>
                                    <select className='selectTurno' id="selectTurno"></select>
                                </div>
                                <div className="campo">
                                    <label htmlFor="">Nome do responsável</label>
                                    <input type="text" className='inputNomeResponsavel' />
                                </div>
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button className='btn-cancelar' onClick={() => setModalOpen(false)}>Cancelar</button>
                            <button className='btn-salvar' onClick={() => aplicarFiltro(['Matutino'])}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
        
        
    );
}

export default FiltrarTable;
