import { useState } from 'react';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg"
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";

import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarTurma from '../../modal/editar/turma/editarTurma';
import ModalVisualizarTurmas from '../../modal/visualizar/turmas/visualizarTurmas';
import "../style.css"

function TableTurmas({ filtrar }) {
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ paginaAtual, setPaginaAtual ] = useState(1);
  const [ dadosSelecionados, setDadosSelecionados ] = useState(null);

    const handleCloseModal = () => {
        setModalOpen(false)
    }

  const dados = [
    {
      Identificacao: '1ANO_MAT',
      tipoEnsino: 'Ensino fundamental',
      anoLetivo: '2025',
      turno: 'Integral',
      status: 'ativo'
    },
    {
      Identificacao: '1ANO_VES',
      tipoEnsino: 'Ensino fundamental',
      anoLetivo: '2025',
      turno: 'Vespertino',
      status: 'inativo'
    },

  ];

  const dadosFiltrados = dados.filter((item) =>
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
              <th>Identificação</th>
              <th>Tipo de ensino</th>
              <th>Ano letivo</th>
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
                  <span
                    className={`status ${item.status === 'ativo' ? 'verde' : 'vermelho'}`}
                  ></span>
                  {item.Identificacao}
                </td>
                <td>{item.tipoEnsino}</td>
                <td>{item.anoLetivo}</td>
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
                    onClick={(e) => {e.stopPropagation();  setModalOpen('arquivar')}
                  }>
                      Arquivar <span className="icon arquivar-icon"/>
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
      {modalOpen === 'arquivar' && (<ModalArquivar handleCloseModal={handleCloseModal} nameTable='esta turma' textoArquivar='Ao arquivar esta turma, ela será desativada e não poderá mais ser utilizada em nenhuma funcionalidade do sistema. Para utilizá-la novamente, será necessário reativá-la manualmente.'/>)}
      {modalOpen === 'editar' && (<ModalEditarTurma handleCloseModal={handleCloseModal} editarSelecionado={dadosSelecionados}/>)}
      {modalOpen === 'visualizar' && (<ModalVisualizarTurmas handleCloseModal={handleCloseModal} editarSelecionado={dadosSelecionados}/>)}
    </div>
  );
}

export default TableTurmas;
