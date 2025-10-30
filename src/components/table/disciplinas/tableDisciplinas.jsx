import { useState, useEffect, useMemo } from 'react';
import { api } from '../../../services/service';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg"
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarDisciplina from '../../modal/editar/disciplina/editarDisciplina';
import ModalVisualizarDisciplinas from '../../modal/visualizar/disciplinas/visualizarDisciplinas';
import "../style.css"

function TableDisciplinas({ filtros }) {
  const [dados, setDados] = useState([]);
  const [salas, setSalas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [acaoPendente, setAcaoPendente] = useState(null);

  useEffect(() => {
    async function getDados() {
      try {
        const res = await api.get("/disciplinas");
        setDados(res.data.dados || res.data);

        const resSalas = await api.get("/salas");
        setSalas(resSalas.data.dados || resSalas.data);

      } catch (erro) {
        console.error("Erro ao buscar disciplinas:", erro);
      }
    }
    getDados();
  }, []);

  // useEffect(() => {
  //   setPaginaAtual(1);
  // }, [filtrar]);

  const dadosFiltrados = useMemo(() => {
    let resultado = [...dados];

    resultado = resultado.filter(disc => disc.status === filtros.status);

    if (filtros.termo) {
      const t = filtros.termo.toLowerCase();
      resultado = resultado.filter(disc =>
        disc.nome.toLowerCase().includes(t) ||
        (disc.telefone && disc.telefone.toLowerCase().includes(t))
      );
    }

    if (filtros.nome) {
      resultado = resultado.filter(disc =>
        disc.nome.toLowerCase().includes(filtros.nome.toLowerCase())
      );
    }
    if (filtros.cargaHoraria) {
      resultado = resultado.filter(disc =>
        disc.cargaHoraria && disc.cargaHoraria.includes(filtros.cargaHoraria)
      );
    }
    if (filtros.tipoEnsino) {
      resultado = resultado.filter(disc => 
        disc.tipoEnsino.toLowerCase().includes(filtros.tipoEnsino.toLowerCase())
      );
    }
    if (filtros.professoresReponsaveis) {
      resultado = resultado.filter(a => {
        const resp = a.responsavel?.nome || '';
        return resp.toLowerCase().includes(filtros.professoresReponsaveis.toLowerCase());
      });
    }
    if (filtros.salas) {
      resultado = resultado.filter(a => a.salas === filtros.salas);
    }

    return resultado;
  }, [dados, filtros]);

  const itensPorPagina = 9;
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const dadosPaginados = dadosFiltrados.slice(inicio, fim);

  const maximoBotoesVisiveis = 4;
  const primeiroBotao = Math.max(1, Math.min(paginaAtual - 1, totalPaginas - maximoBotoesVisiveis + 1));
  const botoesVisiveis = Array.from(
    { length: Math.min(maximoBotoesVisiveis, totalPaginas) },
    (_, i) => primeiroBotao + i
  );

  const mudarPagina = (numero) => setPaginaAtual(numero);
  const paginaAnterior = () => setPaginaAtual((prev) => Math.max(prev - 1, 1));
  const proximaPagina = () => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas));

  const handleCloseModal = () => {
    setModalOpen(false);
    setAcaoPendente(null);
  };

  const handleConfirmarStatus = async () => {
    if (!dadosSelecionados || !acaoPendente) return;

    try {
      await api.patch(`/disciplinas/${dadosSelecionados.id}/status`, { status: acaoPendente });

      setDados(prev =>
        prev.map(disciplina =>
          disciplina.id === dadosSelecionados.id ? { ...disciplina, status: acaoPendente } : disciplina
        )
      );

      setModalOpen(false);
      setDadosSelecionados(null);
      setAcaoPendente(null);

      const acaoTexto = acaoPendente === 'ativo' ? 'reativado' : 'arquivado';
      alert(`Disciplina ${acaoTexto} com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    }
  };

  return (
    <div className="body-table">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nome Disciplina</th>
              <th>Carga Horária</th>
              <th>Tipo de Ensino</th>
              <th>Sala</th>
              <th className='th-acoes'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.map((item, index) => {
              const sala = salas.find(s => s.id === item.sala);
              return (
                <tr key={index} onClick={() => {
                  setModalOpen('visualizar');
                  setDadosSelecionados({ ...item, sala });
                }}>
                  <td>
                    <span className={`status ${item.status === 'ativo' ? 'verde' : 'vermelho'}`}>
                    </span>
                    {item.nome}
                  </td>
                  <td>{item.cargaHoraria}</td>
                  <td>{item.tipoEnsino}</td>
                  <td>{sala ? sala.nomeSala : '-'}</td>
                  <td className="acoes">
                    <button
                      className="editar"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalOpen('editar');
                        setDadosSelecionados({ ...item, sala });
                      }}
                    >
                      Editar <span className="icon editar-icon" />
                    </button>
                    {item.status === 'ativo' ? (
                    <button
                      className="arquivar"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDadosSelecionados(item);
                        setAcaoPendente('inativo');
                        setModalOpen('arquivar');
                      }}
                    >
                      Arquivar <span className="icon arquivar-icon" />
                    </button>
                  ) : (
                    <button
                      className="reativar"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDadosSelecionados(item);
                        setAcaoPendente('ativo');
                        setModalOpen('arquivar');
                      }}
                    >
                      Reativar <span className="icon arquivar-icon" />
                    </button>
                  )}
                  </td>
                </tr>
              );
            })}
            {Array.from({ length: Math.max(0, itensPorPagina - dadosPaginados.length) }).map((_, i) => (
              <tr key={`ghost-${i}`} className="linha-fantasma">
                {Array.from({ length: 5 }).map((_, j) => (<td key={j}>&nbsp;</td>))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>
            Exibindo {inicio + 1} a {Math.min(fim, dadosFiltrados.length)} de {dadosFiltrados.length} itens
          </span>
          <div className="pagination">
            <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
              <img src={SetaLeft} alt="" />
            </button>
            {botoesVisiveis.map((num) => (
              <button
                key={num}
                className={paginaAtual === num ? 'active' : ''}
                onClick={() => mudarPagina(num)}
              >
                {num}
              </button>
            ))}
            <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas}>
              <img src={SetaRigth} alt="" />
            </button>
          </div>
        </div>
      </div>

      {modalOpen === 'arquivar' && (
        <ModalArquivar
          handleCloseModal={handleCloseModal}
          nameTable='esta disciplina'
          textoArquivar={
            acaoPendente === 'ativo'
              ? "Ao reativar este estudante, ele voltará a estar disponível em todas as funcionalidades do sistema."
              : "Ao arquivar este estudante, ele será desativado e não poderá mais ser utilizado em nenhuma funcionalidade do sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente."
          }
          onConfirm={handleConfirmarStatus}
        />
      )}
      {modalOpen === 'editar' && (
        <ModalEditarDisciplina 
          handleCloseModal={handleCloseModal} 
          editarSelecionado={dadosSelecionados} 
        />
      )}
      {modalOpen === 'visualizar' && (
        <ModalVisualizarDisciplinas 
          handleCloseModal={handleCloseModal} 
          selecionarDados={dadosSelecionados} 
          visualizarSelecionado={dadosSelecionados}/>
      )}
    </div>
  );
}

export default TableDisciplinas;
