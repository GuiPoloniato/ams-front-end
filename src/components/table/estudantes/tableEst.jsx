import { useState, useEffect, useMemo } from 'react'; // useMemo: otimização de performance
import { api } from '../../../services/service';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg";
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditar from '../../modal/editar/estudante/editarEstudante';
import ModalVisualizarEstudante from '../../modal/visualizar/estudantes/visualizarEstudantes';
import '../style.css';

function TableEstudantes({ filtros }) {
  const [todosAlunos, setTodosAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);
  const [acaoPendente, setAcaoPendente] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get("/alunos");
        setTodosAlunos(res.data.dados || []);
        
        const resProf = await api.get("/professores");
        setProfessores(resProf.data.dados || []);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };
    fetchAll();
  }, []);

  const dadosFiltrados = useMemo(() => {
    let resultado = [...todosAlunos];

    resultado = resultado.filter(aluno => aluno.status === filtros.status);

    if (filtros.termo) {
      const t = filtros.termo.toLowerCase();
      resultado = resultado.filter(aluno => {
        const resp = aluno.responsavel?.nome || '';
        return (
          aluno.nome.toLowerCase().includes(t) ||
          aluno.matricula.toLowerCase().includes(t) ||
          resp.toLowerCase().includes(t)
        );
      });
    }

    if (filtros.matricula) {
      resultado = resultado.filter(a => a.matricula.includes(filtros.matricula));
    }
    if (filtros.nomeCompleto) {
      resultado = resultado.filter(a => a.nome.toLowerCase().includes(filtros.nomeCompleto.toLowerCase()));
    }
    if (filtros.dataNascimento) {
      resultado = resultado.filter(a => a.nascimento === filtros.dataNascimento);
    }
    if (filtros.turno) {
      resultado = resultado.filter(a => a.turno === filtros.turno);
    }
    if (filtros.nomeResponsavel) {
      resultado = resultado.filter(a => {
        const resp = a.responsavel?.nome || '';
        return resp.toLowerCase().includes(filtros.nomeResponsavel.toLowerCase());
      });
    }

    return resultado;
  }, [todosAlunos, filtros]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [filtros]);

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
      await api.patch(`/alunos/${dadosSelecionados.id}/status`, { status: acaoPendente });

      setTodosAlunos(prev =>
        prev.map(aluno =>
          aluno.id === dadosSelecionados.id ? { ...aluno, status: acaoPendente } : aluno
        )
      );

      setModalOpen(false);
      setDadosSelecionados(null);
      setAcaoPendente(null);

      const acaoTexto = acaoPendente === 'ativo' ? 'reativado' : 'arquivado';
      alert(`Estudante ${acaoTexto} com sucesso!`);
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
              <th>Matrícula</th>
              <th>Nome Completo</th>
              <th>Data de Nascimento</th>
              <th>Turno</th>
              <th>Responsável</th>
              <th>Telefone (celular)</th>
              <th className='th-acoes'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.map((item, index) => {
              const responsavel = item.responsavel || {};
              const professor = professores.find(p => p.id === item.ProfessorId);
              return (
                <tr key={item.id || index} onClick={() => {
                  setDadosSelecionados({ ...item, responsavel, professor });
                  setModalOpen('visualizar');
                }}>
                  <td>
                    <span className={`status ${item.status === 'ativo' ? 'verde' : 'vermelho'}`}></span>
                    {item.matricula}
                  </td>
                  <td>{item.nome}</td>
                  <td>{new Date(item.nascimento).toLocaleDateString('pt-BR')}</td>
                  <td>{item.turno}</td>
                  <td>{responsavel.nome || '-'}</td>
                  <td>{responsavel.celular || '-'}</td>
                  <td className="acoes">
                    <button
                      className="editar"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDadosSelecionados({ ...item, responsavel, professor });
                        setModalOpen('editar');
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
                        setAcaoPendente('inativo'); // define a ação
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
                        setAcaoPendente('ativo'); // define a ação
                        setModalOpen('arquivar'); // mesmo modal!
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
                {Array.from({ length: 7 }).map((_, j) => (<td key={j}>&nbsp;</td>))}
              </tr>
            ))}
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
          nameTable="este estudante"
          textoArquivar={
            acaoPendente === 'ativo'
              ? "Ao reativar este estudante, ele voltará a estar disponível em todas as funcionalidades do sistema."
              : "Ao arquivar este estudante, ele será desativado e não poderá mais ser utilizado em nenhuma funcionalidade do sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente."
          }
          onConfirm={handleConfirmarStatus}
        />
      )}
      {modalOpen === 'editar' && <ModalEditar handleCloseModal={handleCloseModal} editarSelecionado={dadosSelecionados} />}
      {modalOpen === 'visualizar' && <ModalVisualizarEstudante handleCloseModal={handleCloseModal} visualizarSelecionado={dadosSelecionados} />}
    </div>
  );
}

export default TableEstudantes;