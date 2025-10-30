import { useState, useEffect } from 'react';
import { api } from '../../services/service';
import PesquisaIcon from "../../assets/iconsSvg/pesquisaIcon.svg";
import FiltroIcon from "../../assets/iconsSvg/filtroAvancado.svg";
import FecharFiltro from "../../assets/iconsSvg/xFecharIcon.svg";
import "./style.css";

function FiltrarTable({ filtrosAtuais, onAplicarFiltros, tipoEntidade }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);

  // Estados temporários (todos inicializados com base nos filtrosAtuais)
  const [termoTemp, setTermoTemp] = useState(filtrosAtuais.termo || '');
  const [statusTemp, setStatusTemp] = useState(filtrosAtuais.status || 'ativo');
  const [matriculaTemp, setMatriculaTemp] = useState(filtrosAtuais.matricula || '');
  const [nomeCompletoTemp, setNomeCompletoTemp] = useState(filtrosAtuais.nomeCompleto || '');
  const [dataNascimentoTemp, setDataNascimentoTemp] = useState(filtrosAtuais.dataNascimento || '');
  const [turnoTemp, setTurnoTemp] = useState(filtrosAtuais.turno || '');
  const [nomeResponsavelTemp, setNomeResponsavelTemp] = useState(filtrosAtuais.nomeResponsavel || '');
  const [telefoneTemp, setTelefoneTemp] = useState(filtrosAtuais.telefone || '');
  const [emailTemp, setEmailTemp] = useState(filtrosAtuais.email || '');
  const [nomeSalaTemp, setNomeSalaTemop] = useState(filtrosAtuais.salaTemp || '');
  const [tipoEnsinoTemp, setTipoEnsinoTemp] = useState(filtrosAtuais.tipoEnsino || '');
  const [nomeDisciplinaTemp, setNomeDisciplinaTemp] = useState(filtrosAtuais.nome || '');
  const [cargahorariaTemp, setCargaHorariaTemp] = useState(filtrosAtuais.cargaHoraria || '');
  const [professoresReponsaveisTemp, setProfessoresResponsaveistemp] = useState(filtrosAtuais.professoresResponsaveis || '');

  useEffect(() => {
    async function fetchProfessores() {
      try {
        const reponseProfessor = await api.get("/professores");
        setProfessores(reponseProfessor.data.dados || reponseProfessor.data);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    }
    async function fetchSalas() {
      try {
        const reponseSalas = await api.get("/salas");
        setSalas(reponseSalas.data.dados || reponseSalas.data);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    }
    fetchProfessores();
    fetchSalas();
  }, []);

  // Sincroniza os campos temporários ao abrir o modal
  useEffect(() => {
    if (!modalOpen) return;

    setTermoTemp(filtrosAtuais.termo || '');
    setStatusTemp(filtrosAtuais.status || 'ativo');
    setMatriculaTemp(filtrosAtuais.matricula || '');
    setNomeCompletoTemp(filtrosAtuais.nomeCompleto || '');
    setDataNascimentoTemp(filtrosAtuais.dataNascimento || '');
    setTurnoTemp(filtrosAtuais.turno || '');
    setNomeResponsavelTemp(filtrosAtuais.nomeResponsavel || '');
    setTelefoneTemp(filtrosAtuais.telefone || '');
    setEmailTemp(filtrosAtuais.email || '');
    setNomeSalaTemop(filtrosAtuais.nomeSala || '');
    setTipoEnsinoTemp(filtrosAtuais.tipoEnsino || '');

    setNomeDisciplinaTemp(filtrosAtuais.nome || '');
    setCargaHorariaTemp(filtrosAtuais.cargaHoraria || '');
    setProfessoresResponsaveistemp(filtrosAtuais.professoresResponsaveis || '');
  }, [modalOpen, filtrosAtuais]);

  const handleAbrirModal = () => {
    // Mesmo que o useEffect acima, mas explícito
    setTermoTemp(filtrosAtuais.termo || '');
    setStatusTemp(filtrosAtuais.status || 'ativo');
    setMatriculaTemp(filtrosAtuais.matricula || '');
    setNomeCompletoTemp(filtrosAtuais.nomeCompleto || '');
    setDataNascimentoTemp(filtrosAtuais.dataNascimento || '');
    setTurnoTemp(filtrosAtuais.turno || '');
    setNomeResponsavelTemp(filtrosAtuais.nomeResponsavel || '');
    setTelefoneTemp(filtrosAtuais.telefone || '');
    setEmailTemp(filtrosAtuais.email || '');
    setNomeSalaTemop(filtrosAtuais.nomeSala || '');
    setTipoEnsinoTemp(filtrosAtuais.tipoEnsino || '');
    setNomeDisciplinaTemp(filtrosAtuais.nome || '');
    setCargaHorariaTemp(filtrosAtuais.cargaHoraria || '');
    setProfessoresResponsaveistemp(filtrosAtuais.professoresResponsaveis || '');
    setModalOpen(true);
  };

  const handleAplicar = () => {
    const base = {
      termo: termoTemp,
      status: statusTemp,
    };

    if (tipoEntidade === 'estudante') {
      Object.assign(base, {
        matricula: matriculaTemp,
        nomeCompleto: nomeCompletoTemp,
        dataNascimento: dataNascimentoTemp,
        turno: turnoTemp,
        nomeResponsavel: nomeResponsavelTemp,
      });
    } else if (tipoEntidade === 'professor') {
      Object.assign(base, {
        nomeCompleto: nomeCompletoTemp,
        telefone: telefoneTemp,
        email: emailTemp,
      });
    } else if (tipoEntidade === 'salas') {
      Object.assign(base, {
        nomeSala: nomeSalaTemp,
        tipoEnsino: tipoEnsinoTemp,
        turno: turnoTemp,
      });
    } else if (tipoEntidade === 'disciplinas') {
      Object.assign(base, {
        nomeDisciplina: nomeDisciplinaTemp,
        cargaHoraria: cargahorariaTemp,
        tipoEnsino: tipoEnsinoTemp,
        professoresResponsaveis: professoresReponsaveisTemp,
        nomeSala: nomeSalaTemp,
      });
    }

    onAplicarFiltros(base);
    setModalOpen(false);
  };

  const handleLimpar = () => {
    const limpos = { termo: '', status: 'ativo' };

    if (tipoEntidade === 'estudante') {
      Object.assign(limpos, {
        matricula: '',
        nomeCompleto: '',
        dataNascimento: '',
        turno: '',
        nomeResponsavel: '',
      });
    } else if (tipoEntidade === 'professor') {
      Object.assign(limpos, {
        nomeCompleto: '',
        telefone: '',
        email: '',
      });
    } else if (tipoEntidade === 'salas') {
      Object.assign(limpos, {
        nomeDisciplina: nomeDisciplinaTemp,
        cargaHoraria: cargahorariaTemp,
        tipoEnsino: tipoEnsinoTemp,
        professoresResponsaveis: professoresReponsaveisTemp,
        nomeSala: nomeSalaTemp,
      });
    }

    onAplicarFiltros(limpos);
    setModalOpen(false);
  };

  const handleTermoSimplesChange = (e) => {
    onAplicarFiltros({ ...filtrosAtuais, termo: e.target.value });
  };

  return (
    <>
      <div className="pesquisarTable">
        <div className="input-pesquisar">
          <img src={PesquisaIcon} alt="Pesquisar" />
          <input
            type="text"
            placeholder={
              tipoEntidade === 'estudante'
                ? "Pesquisar por nome, matrícula ou responsável..." : tipoEntidade === 'professor' ?  "Pesquisar por nome ou telefone..." : tipoEntidade === 'salas' ? "Pesquisar por nome da sala..." : "Pesquisar por nome da disciplina..."
            }
            value={filtrosAtuais.termo || ''}
            onChange={handleTermoSimplesChange}
          />
        </div>
        <img
          className="img-filtroIcon"
          src={FiltroIcon}
          alt="Filtro avançado"
          onClick={handleAbrirModal}
        />

        <div className="filtro-selecionado">
          Status: {statusTemp === 'ativo' ? 'Ativos' : 'Inativos'}
          <img
            src={FecharFiltro}
            alt="Remover"
            onClick={() => onAplicarFiltros({ ...filtrosAtuais, status: 'ativo' })}
          />
        </div>
      </div>

      {modalOpen && (
        <div className="body-modalFiltragem body-modalFiltragem-disciplinas">
          <div className="modal-content">
            <h2 className="h2-content">Filtros Avançados</h2>
            <hr />
            <div className="formulario-filtros">
              <label className="label-status">Status</label>
              <div className="status-buttons">
                <button
                  className={statusTemp === 'ativo' ? 'ativo ativoSelecionado' : 'ativo'}
                  onClick={() => setStatusTemp('ativo')}
                >
                  Ativos
                </button>
                <button
                  className={statusTemp === 'inativo' ? 'inativo inativoSelecionado' : 'inativo'}
                  onClick={() => setStatusTemp('inativo')}
                >
                  Inativos
                </button>
              </div>

              {/* Campos específicos por tipo */}
              {tipoEntidade === 'estudante' && (
                <>
                  <div className="linha-flex">
                    <div className="campo">
                      <label>Matrícula</label>
                      <input
                        type="text"
                        className='inputMatricula'
                        value={matriculaTemp}
                        onChange={(e) => setMatriculaTemp(e.target.value)}
                      />
                    </div>
                    <div className="campo">
                      <label>Nome completo</label>
                      <input
                        type="text"
                        className='inputName'
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
                        className='selectTurno'
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
                        className='inputNomeResponsavel'
                        value={nomeResponsavelTemp}
                        onChange={(e) => setNomeResponsavelTemp(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {tipoEntidade === 'professor' && (
                <>
                  <div className="linha-flex">
                    <div className="campo">
                      <label>Nome completo</label>
                      <input
                        type="text"
                        className='inputNomeProfessor'
                        value={nomeCompletoTemp}
                        onChange={(e) => setNomeCompletoTemp(e.target.value)}
                      />
                    </div>
                    <div className="campo">
                      <label>Telefone</label>
                      <input
                        type="text"
                        className='inputTelefone'
                        value={telefoneTemp}
                        onChange={(e) => setTelefoneTemp(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="linha-flex">
                    <div className="campo">
                      <label>Email</label>
                      <input 
                        type="text"
                        className='inputEmail'
                        value={emailTemp}
                        onChange={(e) => setEmailTemp(e.target.value)}
                    />
                    </div>
                  </div>
                </>
              )}

              {tipoEntidade === 'salas' && (
                <>
                  <div className="linha-flex">
                    <div className="campo">
                      <label>Nome da Sala</label>
                      <input
                        type="text"
                        className='inputNomeProfessor'
                        value={nomeSalaTemp}
                        onChange={(e) => setNomeSalaTemop(e.target.value)}
                      />
                    </div>
                    <div className="campo">
                      <label>Tipo de Ensino</label>
                      <input
                        type="text"
                        className='inputTelefone'
                        value={tipoEnsinoTemp}
                        onChange={(e) => setTipoEnsinoTemp(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="linha-flex">
                    <div className="campo">
                      <label>Turno</label>
                      <select
                        value={turnoTemp}
                        className='selectTurno'
                        onChange={(e) => setTurnoTemp(e.target.value)}
                      >
                        <option value="">Todos</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Noturno">Noturno</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {tipoEntidade === 'disciplinas' && (
                <>
                  <div className="linha-flex">
                    <div className="campo">
                      <label>Nome da Disciplina</label>
                      <input
                        type="text"
                        className='inputNomeDisciplina'
                        value={nomeDisciplinaTemp}
                        onChange={(e) => setNomeDisciplinaTemp(e.target.value)}
                      />
                    </div>
                    <div className="campo">
                      <label>Carga Horaria</label>
                      <input
                        type="text"
                        className='inputCargaHoraria'
                        value={cargahorariaTemp}
                        onChange={(e) => setCargaHorariaTemp(e.target.value)}
                      />
                    </div>
                    <div className="campo">
                      <label>Turno</label>
                        <select
                          value={tipoEnsinoTemp}
                          className='selectTipoEnsino'
                          onChange={(e) => setTipoEnsinoTemp(e.target.value)}
                        >
                          <option value="">Todos</option>
                          <option value="Ensino Fundamental">Ensino Fundamental</option>
                          <option value="Ensino Médio">Ensino Médio</option>
                        </select>
                    </div>
                  </div>
                  <div className="linha-flex">
                    <div className="campo">
                      <label>Professor Responsavel</label>
                      <select
                        type="text"
                        className='selectProfessorResponsavel'
                        value={professoresReponsaveisTemp}
                        onChange={(e) => setProfessoresResponsaveistemp(e.target.value)}
                      >
                        <option value="">Selecione</option>
                          {professores.map((prof) => (
                            <option key={prof.id} value={prof.id}>
                              {prof.nome}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="campo">
                      <label>Salas</label>
                      <select
                        type="text"
                        className='selectSalas'
                        value={nomeSalaTemp}
                        onChange={(e) => setNomeSalaTemop(e.target.value)}
                      >
                        <option value="">Selecione</option>
                          {salas.map((sala) => (
                            <option key={sala.id} value={sala.id}>
                              {sala.nomeSala}
                            </option>
                          ))}
                      </select>
                    </div>
                    
                  </div>
                </>
              )}
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