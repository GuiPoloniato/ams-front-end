import { useState, useEffect } from 'react';
import { api } from '../../../services/service';
import SetaLeft from "../../../assets/iconsSvg/setaLeft.svg"
import SetaRigth from "../../../assets/iconsSvg/setaRigth.svg";
import ModalArquivar from '../../modal/arquivar/arquivar';
import ModalEditar from '../../modal/editar/estudante/editarEstudante';
import ModalVisualizarEstudante from '../../modal/visualizar/estudantes/visualizarEstudantes';
import '../style.css';

function TableEstudantes({ filtrar }) {
  const [dados, setDados] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ paginaAtual, setPaginaAtual ] = useState(1);
  const [ dadosSelecionados, setDadosSelecionados ] = useState(null);


  const handleCloseModal = () => {
    setModalOpen(false)
  }

//   useEffect(() => {
//     const fetchEstudantes = fetch('http://localhost:3000/estudante').then(res => res.json());
//     const fetchResponsaveis = fetch('http://localhost:3000/responsavel').then(res => res.json());

//   Promise.all([fetchEstudantes, fetchResponsaveis])
//     .then(([estudantesData, responsaveisData]) => {
//       setDados({ estudante: estudantesData });
//       setResponsaveis(responsaveisData);
//     })
//     .catch(err => {
//       console.error('Erro ao buscar dados:', err);
//     });
// }, []);

  useEffect(() => {
    async function getDados() {
    try {
      const res = await api.get("/alunos");
      console.log("RESPOSTA DO BACKEND:", res.data);
      if (res.data.sucesso) {
        setDados(res.data.dados);
      } else {
        console.warn("Resposta inesperada:", res.data);
      }
    } catch (erro) {
      console.error("Erro ao buscar alunos:", erro);
      if (erro.response?.status === 401) {
        alert("Token inválido ou expirado.");
      }
    }
  }

    getDados();
  }, []);

  useEffect(() => {
        setPaginaAtual(1);
    }, [filtrar]);

  console.log("dados:", dados);

  const estudantesArray = dados || [];


  const dadosFiltrados = estudantesArray.filter((item) =>
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
              <tr key={index} onClick={() => {
                const responsavel = responsaveis.find(resp => resp._id === item.responsavel_id);
                const dadosComResponsavel = {
                  ...item,
                  nomeResponsavel: responsavel?.nome || '',
                  cpfResponsavel: responsavel?.cpf || '',
                  rgResponsavel: responsavel?.rg || '',
                  orgao_expedidor: responsavel?.orgao_expedidor || '',
                  uf: responsavel?.uf || '',
                  telefoneResidencial: responsavel?.telefone_residencial || '',
                  telefoneComercial: responsavel?.telefone_comercial || '',
                  celular: responsavel?.celular || '',
                  email: responsavel?.email || '',
                  profissao: responsavel?.profissao || ''
                };
                setModalOpen('visualizar');
                setDadosSelecionados(dadosComResponsavel);
              }}>
                <td>
                  <span
                    className={`status ${item.status === 'ativo' ? 'verde' : 'vermelho'}`}
                  ></span>
                  {item.id}
                </td>
                <td>{item.nome}</td>
                <td>{item.data_nascimento}</td>
                <td>{item.turma_id}</td>
                <td>{item.turno}</td>
                <td>{item.nome}</td>
                <td className="acoes">
                  <button 
                    className="editar" 
                    onClick={(e) => {
                      const responsavel = responsaveis.find(resp => resp._id === item.responsavel_id);
                      const dadosComResponsavel = {
                        ...item,
                        nomeResponsavel: responsavel?.nome || '',
                        cpfResponsavel: responsavel?.cpf || '',
                        rgResponsavel: responsavel?.rg || '',
                        orgao_expedidor: responsavel?.orgao_expedidor || '',
                        uf: responsavel?.uf || '',
                        telefoneResidencial: responsavel?.telefone_residencial || '',
                        telefoneComercial: responsavel?.telefone_comercial || '',
                        celular: responsavel?.celular || '',
                        email: responsavel?.email || '',
                        profissao: responsavel?.profissao || ''
                      };
                      e.stopPropagation(); 
                      setModalOpen('editar');
                      setDadosSelecionados(dadosComResponsavel);
                    }}
                    >
                      Editar <span className="icon editar-icon" />
                  </button>
                  <button 
                    className="arquivar"
                    onClick={(e) => {
                      e.stopPropagation();  
                      setModalOpen('arquivar');
                      setDadosSelecionados(item);
                    }}
                    >
                      Arquivar <span className="icon arquivar-icon"/>
                  </button>
                </td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, itensPorPagina - dadosPaginados.length) }).map((_, i) => (
              <tr key={`ghost-${i}`} className="linha-fantasma">
                {Array.from({ length: 7 }).map((_, j) => (
                  <td key={j}>&nbsp;</td>
                ))}
              </tr>
            ))}
            {/* {dadosPaginados.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '0px' }}>
                Nenhum resultado encontrado.
              </td>
            </tr>
          )} */}
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
      {modalOpen === 'arquivar' && (<ModalArquivar handleCloseModal={handleCloseModal} nameTable='este estudante' textoArquivar='Ao arquivar este estudante, ele será desativado e não poderá mais ser utilizado em nenhuma funcionalidade do sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente.'/>)}
      {modalOpen === 'editar' && (<ModalEditar handleCloseModal={handleCloseModal} editarSelecionado={dadosSelecionados}/>)}
      {modalOpen === 'visualizar' && (<ModalVisualizarEstudante handleCloseModal={handleCloseModal} visualizarSelecionado={dadosSelecionados}/>)}
    </div>
  );
}

export default TableEstudantes;
