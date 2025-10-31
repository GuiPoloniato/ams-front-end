import { useState, useEffect, useMemo } from 'react';
import { api } from '../../../services/service';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg";
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarProfessor from '../../modal/editar/professor/editarProfessor';
import ModalVisualizarProfessor from '../../modal/visualizar/professores/visualizarProfessor';
import "../style.css";

function TableProfessor({ filtros, dadosOriginais }) {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [acaoPendente, setAcaoPendente] = useState(null);

  useEffect(() => {
    async function getDados() {
      try {
        const res = await api.get("/professores");
        setDados(res.data.dados || res.data);
      } catch (erro) {
        console.error("Erro ao buscar professores:", erro);
      }
    }
    getDados();
  }, []);


  const dadosFiltrados = useMemo(() => {
    let resultado = [...((dadosOriginais || []))];

    resultado = resultado.filter(prof => prof.status === filtros.status);

    if (filtros.termo) {
      const t = filtros.termo.toLowerCase();
      resultado = resultado.filter(prof =>
        prof.nome.toLowerCase().includes(t) ||
        (prof.telefone && prof.telefone.toLowerCase().includes(t))
      );
    }

    if (filtros.nomeCompleto) {
      resultado = resultado.filter(prof =>
        prof.nome.toLowerCase().includes(filtros.nomeCompleto.toLowerCase())
      );
    }
    if (filtros.telefone) {
      resultado = resultado.filter(prof =>
        prof.telefone && prof.telefone.includes(filtros.telefone)
      );
    }
    if (filtros.email) {
      resultado = resultado.filter(prof => 
        prof.email.toLowerCase().includes(filtros.email.toLowerCase())
      );
    }

    return resultado;
  }, [dadosOriginais, filtros]);

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
      await api.patch(`/professores/${dadosSelecionados.id}/status`, { status: acaoPendente });

      setDados(prev =>
        prev.map(professor =>
          professor.id === dadosSelecionados.id ? { ...professor, status: acaoPendente } : professor
        )
      );

      setModalOpen(false);
      setDadosSelecionados(null);
      setAcaoPendente(null);

      const acaoTexto = acaoPendente === 'ativo' ? 'reativado' : 'arquivado';
      alert(`Professor ${acaoTexto} com sucesso!`);
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
              <th>Nome Completo</th>
              <th>Telefone</th>
              <th>Formação</th>
              <th>Endereço</th>
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
                  {item.nome}
                </td>
                <td>{item.telefone}</td>
                <td>{item.formacao}</td>
                <td>
                  {item.endereco
                    ? `${item.endereco.logradouro}, ${item.endereco.numero} - ${item.endereco.bairro}, ${item.endereco.cidade} - ${item.endereco.uf}`
                    : 'Sem endereço'}
                </td>
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
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
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
          nameTable='este professor'
          textoArquivar={
            acaoPendente === 'ativo'
              ? "Ao reativar este estudante, ele voltará a estar disponível em todas as funcionalidades do sistema."
              : "Ao arquivar este estudante, ele será desativado e não poderá mais ser utilizado em nenhuma funcionalidade do sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente."
          }
          onConfirm={handleConfirmarStatus}
        />
      )}
      {modalOpen === 'editar' && (
        <ModalEditarProfessor
          handleCloseModal={handleCloseModal}
          editarSelecionado={dadosSelecionados}
        />
      )}
      {modalOpen === 'visualizar' && (
        <ModalVisualizarProfessor
          handleCloseModal={handleCloseModal}
          visualizarSelecionado={dadosSelecionados}
        />
      )}
    </div>
  );
}

export default TableProfessor;
