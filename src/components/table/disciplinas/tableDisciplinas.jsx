import { useState, useEffect } from 'react';
import { api } from '../../../services/service';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg"
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarDisciplina from '../../modal/editar/disciplina/editarDisciplina';
import ModalVisualizarDisciplinas from '../../modal/visualizar/disciplinas/visualizarDisciplinas';
import "../style.css"

function TableDisciplinas({ filtrar }) {
  const [dados, setDados] = useState([]);
  const [salas, setSalas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosSelecionados, setDadosSelecionados] = useState(null);

  const handleCloseModal = () => setModalOpen(false);

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

  useEffect(() => {
    setPaginaAtual(1);
  }, [filtrar]);

  const disciplinasArray = dados || [];

  const dadosFiltrados = disciplinasArray.filter((item) =>
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
                    <span className={`status ${item.status === 'ativa' ? 'verde' : 'vermelho'}`}>
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
                    <button
                      className="arquivar"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalOpen('arquivar');
                      }}
                    >
                      Arquivar <span className="icon arquivar-icon" />
                    </button>
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
          textoArquivar='Ao arquivar esta disciplina, ela será desativada e não poderá mais ser utilizada em nenhuma funcionalidade do sistema. Para utilizá-la novamente, será necessário reativá-la manualmente.'
        />
      )}
      {modalOpen === 'editar' && (
        <ModalEditarDisciplina handleCloseModal={handleCloseModal} editarSelecionado={dadosSelecionados} />
      )}
      {modalOpen === 'visualizar' && (
        <ModalVisualizarDisciplinas handleCloseModal={handleCloseModal} selecionarDados={dadosSelecionados} visualizarSelecionado={dadosSelecionados}/>
      )}
    </div>
  );
}

export default TableDisciplinas;
