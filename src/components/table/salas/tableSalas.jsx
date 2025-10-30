import { useState, useEffect, useMemo } from 'react';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg";
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import { api } from '../../../services/service';
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarSala from '../../modal/editar/sala/editarSala';
import ModalVisualizarTurmas from '../../modal/visualizar/salas/visualizarSalas';
import "../style.css";

function TableSalas({ filtros }) {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [acaoPendente, setAcaoPendente] = useState(null);

  useEffect(() => {
    async function getSalas() {
      try {
        const res = await api.get("/salas");
        setDados(res.data.dados || res.data); // já retorna array direto
      } catch (err) {
        console.error("Erro ao buscar salas:", err);
      }
    }
    getSalas();
  }, []);

  // useEffect(() => {
  //   setPaginaAtual(1);
  // }, [filtrar]);

  const dadosFiltrados = useMemo(() => {
    let resultado = [...dados];

    resultado = resultado.filter(salas => salas.status === filtros.status);

    if (filtros.termo) {
      const t = filtros.termo.toLowerCase();
      resultado = resultado.filter(salas =>
        salas.nome.toLowerCase().includes(t) ||
        (salas.tipoSala && salas.tipoSala.toLowerCase().includes(t))
      );
    }

    // 3. Filtros avançados
    if (filtros.nomeSala) {
      resultado = resultado.filter(salas =>
        salas.nomeSala.toLowerCase().includes(filtros.nomeSala.toLowerCase())
      );
    }
    if (filtros.tipoEnsino) {
      resultado = resultado.filter(salas =>
        salas.tipoEnsino.toLowerCase().includes(filtros.tipoEnsino.toLowerCase())
      );
    }
    if (filtros.turno) {
      resultado = resultado.filter(salas =>
        salas.turno.toLowerCase().includes(filtros.turno.toLowerCase())
      );
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
      await api.patch(`/salas/${dadosSelecionados.id}/status`, { status: acaoPendente });

      setDados(prev =>
        prev.map(sala =>
          sala.id === dadosSelecionados.id ? { ...sala, status: acaoPendente } : sala
        )
      );

      setModalOpen(false);
      setDadosSelecionados(null);
      setAcaoPendente(null);

      const acaoTexto = acaoPendente === 'ativo' ? 'reativado' : 'arquivado';
      alert(`Sala ${acaoTexto} com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    }
  };

  return (
    <div className="body-table">
      <div className="table-wrapper">
        <table className="table table-relatorio">
          <thead>
            <tr>
              <th>Nome da Sala</th>
              <th>Tipo de Sala</th>
              <th>Capacidade</th>
              <th>Turno</th>
              <th className='th-acoes'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.map((item, index) => (
              <tr key={index} onClick={() => {
                setModalOpen('visualizar');
                setDadosSelecionados(item);
              }}>
                <td>
                  <span className={`status ${item.status === 'ativo' ? 'verde' : 'vermelho'}`}>
                    </span>
                  {item.nomeSala}
                </td>
                <td>{item.tipoSala}</td>
                <td>{item.capacidade}</td>
                <td>{item.turno}</td>
                <td className="acoes">
                  <button
                    className="editar"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen('editar');
                      setDadosSelecionados(item);
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
            ))}
            {Array.from({ length: Math.max(0, itensPorPagina - dadosPaginados.length) }).map((_, i) => (
              <tr key={`ghost-${i}`} className="linha-fantasma">
                {Array.from({ length: 5 }).map((_, j) => (
                  <td key={j}>&nbsp;</td>
                ))}
              </tr>
            ))}
            {dadosPaginados.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Exibindo {inicio + 1} a {Math.min(fim, dadosFiltrados.length)} de {dadosFiltrados.length} itens</span>
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
          nameTable='esta sala'
          textoArquivar={
            acaoPendente === 'ativo'
              ? "Ao reativar este estudante, ele voltará a estar disponível em todas as funcionalidades do sistema."
              : "Ao arquivar este estudante, ele será desativado e não poderá mais ser utilizado em nenhuma funcionalidade do sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente."
          }
          onConfirm={handleConfirmarStatus}
        />
      )}
      {modalOpen === 'editar' && (
        <ModalEditarSala
          handleCloseModal={handleCloseModal}
          editarSelecionado={dadosSelecionados}
        />
      )}
      {modalOpen === 'visualizar' && (
        <ModalVisualizarTurmas
          handleCloseModal={handleCloseModal}
          visualizarSelecionado={dadosSelecionados}
        />
      )}
    </div>
  );
}

export default TableSalas;
