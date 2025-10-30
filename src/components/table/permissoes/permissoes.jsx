import { useState, useEffect, useMemo } from 'react';
import { api } from '../../../services/service';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg";
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarUsuario from '../../modal/editar/permissoes/editarUsuario';
import ModalVisualizarPermissoes from '../../modal/visualizar/permissoes/visualizarPermissoes';
import "../style.css";

function TablePermissoes({ filtros }) {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [acaoPendente, setAcaoPendente] = useState(null);

  // Carrega todos os usuários
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await api.get("/usuarios");
        setDados(res.data.dados || []);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };
    fetchUsuarios();
  }, []);

  // Filtragem local
  const dadosFiltrados = useMemo(() => {
    let resultado = [...dados];

    // resultado = resultado.filter(user => {
    //   const status = user.ativo ? 'ativo' : 'inativo';
    //   return status === filtros.status;
    // });

    // if (filtros.termo) {
    //   const t = filtros.termo.toLowerCase();
    //   resultado = resultado.filter(user =>
    //     user.nome.toLowerCase().includes(t) ||
    //     user.email.toLowerCase().includes(t) ||
    //     user.papel.toLowerCase().includes(t)
    //   );
    // }

    // if (filtros.nomeCompleto) {
    //   resultado = resultado.filter(user =>
    //     user.nome.toLowerCase().includes(filtros.nomeCompleto.toLowerCase())
    //   );
    // }
    // if (filtros.email) {
    //   resultado = resultado.filter(user =>
    //     user.email.toLowerCase().includes(filtros.email.toLowerCase())
    //   );
    // }
    // if (filtros.papel) {
    //   resultado = resultado.filter(user => user.papel === filtros.papel);
    // }

    return resultado;
  }, [dados, filtros]);

  // Paginação
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
      if (acaoPendente === 'inativo') {
        await api.patch(`/usuarios/${dadosSelecionados.id}/inativar`);
      } else {
        await api.put(`/usuarios/${dadosSelecionados.id}`, { ativo: true });
      }

      setDados(prev =>
        prev.map(user =>
          user.id === dadosSelecionados.id
            ? { ...user, ativo: acaoPendente === 'ativo' }
            : user
        )
      );

      setModalOpen(false);
      setDadosSelecionados(null);
      setAcaoPendente(null);

      const acaoTexto = acaoPendente === 'ativo' ? 'reativado' : 'arquivado';
      alert(`Usuário ${acaoTexto} com sucesso!`);
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
              <th>Email</th>
              <th>Nível de acesso</th>
              <th className='th-acoes'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.map((item, index) => (
              <tr key={item.id || index} onClick={() => {
                setModalOpen('visualizar');
                setDadosSelecionados(item);
              }}>
                <td>
                  <span className={`status ${item.ativo ? 'verde' : 'vermelho'}`}></span>
                  {item.nome}
                </td>
                <td>{item.email}</td>
                <td>{item.papel}</td>
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
                  {item.ativo ? (
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
                {Array.from({ length: 4 }).map((_, j) => <td key={j}>&nbsp;</td>)}
              </tr>
            ))}
            {dadosPaginados.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
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
          nameTable="este usuário"
          textoArquivar={
            acaoPendente === 'ativo'
              ? "Ao reativar este usuário, ele voltará a ter acesso ao sistema."
              : "Ao arquivar este usuário, ele será desativado e não poderá mais acessar o sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente."
          }
          onConfirm={handleConfirmarStatus}
        />
      )}
      {modalOpen === 'editar' && (
        <ModalEditarUsuario
          handleCloseModal={handleCloseModal}
          editarSelecionado={dadosSelecionados}
        />
      )}
      {modalOpen === 'visualizar' && (
        <ModalVisualizarPermissoes
          handleCloseModal={handleCloseModal}
          visualizarSelecionado={dadosSelecionados}
        />
      )}
    </div>
  );
}

export default TablePermissoes;