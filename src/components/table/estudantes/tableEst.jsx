import { useState } from 'react';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg"
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import ModalArquivar from '../../modal/arquivar/arquivar';
import './style.css';

function TableEstudantes({ filtrar }) {
  const [ modalOpen, setModalOpen ] = useState(false);

    const handlleCloseModal = () => {
        setModalOpen(false)
    }

  const dados = [
    {
      matricula: '123456789',
      nomeCompleto: 'João Marques da Silva',
      dataNascimento: '12/12/2012',
      serie: '1 Ano',
      turno: 'Matutino',
      responsavel: 'Aline Marques da Silva',
      status: 'ativo'
    },
    {
      matricula: '234567890',
      nomeCompleto: 'Maria Helena Costa Souza',
      dataNascimento: '01/01/2012',
      serie: '1 Ano',
      turno: 'Matutino',
      responsavel: 'Osvaldo Costa Teixeira',
      status: 'inativo'
    },
  ];

  const dadosFiltrados = dados.filter((item) =>
    item.nomeCompleto.toLowerCase().includes(filtrar.toLowerCase())
  );

  const itensPorPagina = 8;
  const [paginaAtual, setPaginaAtual] = useState(1);

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
              <th>Matrícula</th>
              <th>Nome Completo</th>
              <th>Data de Nascimento</th>
              <th>Série</th>
              <th>Turno</th>
              <th>Responsável</th>
              <th className='th-acoes'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.map((item, index) => (
              <tr key={index}>
                <td>
                  <span
                    className={`status ${item.status === 'ativo' ? 'verde' : 'vermelho'}`}
                  ></span>
                  {item.matricula}
                </td>
                <td>{item.nomeCompleto}</td>
                <td>{item.dataNascimento}</td>
                <td>{item.serie}</td>
                <td>{item.turno}</td>
                <td>{item.responsavel}</td>
                <td className="acoes">
                  <button className="editar">
                      Editar <span className="icon editar-icon" />
                  </button>
                  <button className="arquivar" onClick={() => setModalOpen('arquivar')}>
                      Arquivar <span className="icon arquivar-icon"/>
                  </button>
                </td>
              </tr>
            ))}
            {dadosPaginados.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
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
      {modalOpen === 'arquivar' && (<ModalArquivar handlleCloseModal={handlleCloseModal}/>)}
    </div>
  );
}

export default TableEstudantes;
