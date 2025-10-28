import { useState, useEffect } from 'react';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg";
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import { api } from '../../../services/service';
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarSala from '../../modal/editar/sala/editarSala';
import ModalVisualizarTurmas from '../../modal/visualizar/salas/visualizarSalas';
import "../style.css";

function TableSalas({ filtrar }) {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);

  const handleCloseModal = () => setModalOpen(false);

  const handleArquivarSalas = async () => {
    if (!dadosSelecionados) return;
    try {
      await api.delete(`/salas/${dadosSelecionados.id}`);

      setDados(prev => prev.map(sala =>
        sala.id === dadosSelecionados.id ? { ...sala, status: 'Inativo' } : sala
      ));

      setModalOpen(false);
      setDadosSelecionados(null);

      alert('Sala arquivado com sucesso!');
    } catch (error) {
      console.error('Erro ao arquivar salas:', error);
      alert('Erro ao arquivar salas. Tente novamente.');
    }
  };

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

  useEffect(() => {
    setPaginaAtual(1);
  }, [filtrar]);

  const salasArray = dados || [];

  const dadosFiltrados = salasArray.filter((item) =>
    Object.values(item).some((valor) =>
      String(valor).toLowerCase().includes(filtrar.toLowerCase())
    )
  );

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
                  <span className={`status ${item.status === 'ativa' ? 'verde' : 'vermelho'}`}>
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
                  <button
                    className="arquivar"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDadosSelecionados(item);
                      setModalOpen('arquivar');
                    }}
                  >
                    Arquivar <span className="icon arquivar-icon" />
                  </button>
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
          textoArquivar='Ao arquivar esta sala, ela será desativada e não poderá mais ser utilizada em nenhuma funcionalidade do sistema. Para utilizá-la novamente, será necessário reativá-la manualmente.' onConfirm={handleArquivarSalas}
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
