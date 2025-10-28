import { useState, useEffect } from 'react';
import PesquisaIcon from "../../assets/iconsSvg/pesquisaIcon.svg";
import FiltroIcon from "../../assets/iconsSvg/filtroAvancado.svg";
import FecharFiltro from "../../assets/iconsSvg/xFecharIcon.svg";
import "./style.css";

function FiltrarTable({ filtrosAtuais, onAplicarFiltros }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [termoTemp, setTermoTemp] = useState(filtrosAtuais.termo);
    const [statusTemp, setStatusTemp] = useState(filtrosAtuais.status);
    const [matriculaTemp, setMatriculaTemp] = useState(filtrosAtuais.matricula);
    const [nomeCompletoTemp, setNomeCompletoTemp] = useState(filtrosAtuais.nomeCompleto);
    const [dataNascimentoTemp, setDataNascimentoTemp] = useState(filtrosAtuais.dataNascimento);
    const [turnoTemp, setTurnoTemp] = useState(filtrosAtuais.turno);
    const [nomeResponsavelTemp, setNomeResponsavelTemp] = useState(filtrosAtuais.nomeResponsavel);

    useEffect(() => {
    if (modalOpen) return; 
        setTermoTemp(filtrosAtuais.termo);
        setStatusTemp(filtrosAtuais.status);
        setMatriculaTemp(filtrosAtuais.matricula);
        setNomeCompletoTemp(filtrosAtuais.nomeCompleto);
        setDataNascimentoTemp(filtrosAtuais.dataNascimento);
        setTurnoTemp(filtrosAtuais.turno);
        setNomeResponsavelTemp(filtrosAtuais.nomeResponsavel);
    }, [filtrosAtuais, modalOpen]);

    const handleAbrirModal = () => {
        setTermoTemp(filtrosAtuais.termo);
        setStatusTemp(filtrosAtuais.status);
        setMatriculaTemp(filtrosAtuais.matricula);
        setNomeCompletoTemp(filtrosAtuais.nomeCompleto);
        setDataNascimentoTemp(filtrosAtuais.dataNascimento);
        setTurnoTemp(filtrosAtuais.turno);
        setNomeResponsavelTemp(filtrosAtuais.nomeResponsavel);
        setModalOpen(true);
    };

    const handleAplicar = () => {
        const novosFiltros = {
        termo: termoTemp,
        status: statusTemp,
        matricula: matriculaTemp,
        nomeCompleto: nomeCompletoTemp,
        dataNascimento: dataNascimentoTemp,
        turno: turnoTemp,
        nomeResponsavel: nomeResponsavelTemp,
        };
        onAplicarFiltros(novosFiltros);
        setModalOpen(false);
    };

    const handleLimpar = () => {
        const limpos = {
        termo: '',
        status: 'ativo',
        matricula: '',
        nomeCompleto: '',
        dataNascimento: '',
        turno: '',
        nomeResponsavel: '',
        };
        setTermoTemp(limpos.termo);
        setStatusTemp(limpos.status);
        setMatriculaTemp(limpos.matricula);
        setNomeCompletoTemp(limpos.nomeCompleto);
        setDataNascimentoTemp(limpos.dataNascimento);
        setTurnoTemp(limpos.turno);
        setNomeResponsavelTemp(limpos.nomeResponsavel);
        onAplicarFiltros(limpos);
        setModalOpen(false);
    };

    const handleTermoSimplesChange = (e) => {
        const value = e.target.value;
        onAplicarFiltros({
        ...filtrosAtuais,
        termo: value,
        });
    };

return (
    <>
        <div className="pesquisarTable">
            <div className="input-pesquisar">
                <img src={PesquisaIcon} alt="Pesquisar" />
                <input
                    type="text"
                    placeholder="Pesquisar por nome, matrícula ou responsável..."
                    value={filtrosAtuais.termo} 
                    onChange={handleTermoSimplesChange}
                />
            </div>
                <img
                className="img-filtroIcon"
                src={FiltroIcon}
                alt="Filtro avançado"
                onClick={handleAbrirModal}
                />

                {/* Mostra status ativo/inativo como filtro ativo */}
            <div className="filtro-selecionado">
                Status: {statusTemp === 'ativo' ? 'Ativos' : 'Inativos'}
                <img
                    src={FecharFiltro}
                    alt="Remover"
                    onClick={() => {
                    onAplicarFiltros({ ...filtrosAtuais, status: 'ativo' });
                    }}
                />
            </div>
        </div>

        {modalOpen && (
            <div className="body-modalFiltragem">
                <div className="modal-content">
                    <h2 className="h2-content">Filtros Avançados</h2>
                    <hr />
                <div className="formulario-filtros">
                <label className="label-status">Status</label>
                <div className="status-buttons">
                    <button
                    className={statusTemp === 'ativo' ? 'ativo selecionado' : 'ativo'}
                    onClick={() => setStatusTemp('ativo')}
                    >
                    Ativos
                    </button>
                    <button
                    className={statusTemp === 'inativo' ? 'inativo selecionado' : 'inativo'}
                    onClick={() => setStatusTemp('inativo')}
                    >
                    Inativos
                    </button>
                </div>

                <div className="linha-flex">
                    <div className="campo">
                        <label>Matrícula</label>
                        <input
                            type="text"
                            value={matriculaTemp}
                            onChange={(e) => setMatriculaTemp(e.target.value)}
                        />
                    </div>
                    <div className="campo">
                        <label>Nome completo</label>
                        <input
                            type="text"
                            value={nomeCompletoTemp}
                            onChange={(e) => setNomeCompletoTemp(e.target.value)}
                        />
                    </div>
                    <div className="campo">
                        <label>Data de nascimento</label>
                        <input
                        type="date"
                        value={dataNascimentoTemp}
                        onChange={(e) => setDataNascimentoTemp(e.target.value)}
                        />
                    </div>
                </div>

                <div className="linha-flex">
                    <div className="campo">
                        <label>Turno</label>
                        <select
                            value={turnoTemp}
                            onChange={(e) => setTurnoTemp(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="Matutino">Matutino</option>
                            <option value="Vespertino">Vespertino</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                        </div>
                        <div className="campo">
                        <label>Nome do responsável</label>
                        <input
                            type="text"
                            value={nomeResponsavelTemp}
                            onChange={(e) => setNomeResponsavelTemp(e.target.value)}
                        />
                        </div>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className="btn-cancelar" onClick={handleLimpar}>
                        Limpar
                    </button>
                    <button className="btn-salvar" onClick={handleAplicar}>
                        Aplicar
                    </button>
                    </div>
                </div>
            </div>
        )}
    </>
);
}

export default FiltrarTable;