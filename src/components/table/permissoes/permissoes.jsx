import { useState } from 'react';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg"
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";

import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditarUsuario from '../../modal/editar/permissoes/editarUsuario';
import ModalVisualizarPermissoes from '../../modal/visualizar/permissoes/visualizarPermissoes';
import "../style.css"

function TablePermissoes({ filtrar }) {
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ paginaAtual, setPaginaAtual ] = useState(1);
  const [ dadosSelecionados, setDadosSelecionados ] = useState(null);

    const handleCloseModal = () => {
        setModalOpen(false)
    }

  const dados = [
    {
      nomeCompleto: 'João Marques da Silva',
      email: 'joao_marques@email.com',
      nivelAcesso: 'Administrador',
      status: 'ativo'
    },
    {
      nomeCompleto: 'Maria Helena Costa Souza',
      email: 'maria_costa@email.com',
      nivelAcesso: 'Secretário',
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
              <th>Nome Completo</th>
              <th>Email</th>
              <th>Nível de acesso</th>
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
                  {item.nomeCompleto}
                </td>
                <td>{item.email}</td>
                <td>{item.nivelAcesso}</td>
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
                {Array.from({ length: 4 }).map((_, j) => (
                  <td key={j}>&nbsp;</td>
                ))}
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
      {modalOpen === 'arquivar' && (<ModalArquivar handleCloseModal={handleCloseModal} nameTable='este usuário' textoArquivar='Ao arquivar este usuário, ele será desativado e não poderá mais acessar o sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente.'/>)}
      {modalOpen === 'editar' && (<ModalEditarUsuario handleCloseModal={handleCloseModal} editarSelecionado={dadosSelecionados}/>)}
      {modalOpen === 'visualizar' && (<ModalVisualizarPermissoes handleCloseModal={handleCloseModal} visualizarSelecionado={dadosSelecionados}/>)}
    </div>
  );
}

export default TablePermissoes;
