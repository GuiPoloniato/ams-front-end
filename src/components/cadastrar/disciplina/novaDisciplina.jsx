import React, {useState, useEffect} from 'react';
import { api } from '../../../services/service';
import './style.css';

function NovaDisciplinaModal({ handlleCloseModal, onDisciplinasCriadas }) {
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  
    useEffect(() => {
      async function fetchProfessores() {
        try {
          const reponseProfessor = await api.get("/professores");
          setProfessores(reponseProfessor.data.dados || reponseProfessor.data);
        } catch (error) {
          console.error("Erro ao buscar professores:", error);
        }
      }
      async function fetchSalas() {
        try {
          const reponseSalas = await api.get("/salas");
          setSalas(reponseSalas.data.dados || reponseSalas.data);
        } catch (error) {
          console.error("Erro ao buscar salas:", error);
        }
      }
      fetchProfessores();
      fetchSalas();
    }, []);
  
    const handleSubmit = async () => {
      const novaDisciplina = {
        nome: document.getElementById("inputNomeDisciplina")?.value,
        cargaHoraria: Number(document.getElementById("inputCargaHoraria")?.value),
        tipoEnsino: document.getElementById("selectTipoEnsino")?.value,
        professoresResponsaveis: Number(document.getElementById("selectProfessor")?.value) || null,
        sala: Number(document.getElementById("selectTurma")?.value) || null,
      };

      try {
        await api.post("/disciplinas", novaDisciplina);
        alert("Disciplina cadastrada com sucesso!");

        if (onDisciplinasCriadas) {
          onDisciplinasCriadas();
        }

        handlleCloseModal();
      } catch (error) {
        console.error("Erro ao cadastrar disciplina:", error);
        alert(error.response?.data?.mensagem || "Erro ao cadastrar disciplina.");
      }
    };


  return (
    <div className="body-modalDisciplina">
      <div className="modal-content">
        <h1 className='title-cadastroDisciplina'>Cadastrar nova disciplina</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeDisciplina">Nome da disciplina</label>
              <input type="text" className='inputNomeDisciplina' id="inputNomeDisciplina" />
            </div>
            <div className="campo">
              <label htmlFor="inputCargaHoraria">Carga horária</label>
              <input type="number" className='inputCargaHoraria' id="inputCargaHoraria" />
            </div>
            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <select className='selectTipoEnsino' id="selectTipoEnsino">
                <option value="">Selecione</option>
                <option value="Ensino Fundamental">Ensino Fundamental</option>
                <option value="Ensino Médio">Ensino Médio</option>
              </select>
            </div>
          </div>
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectProfessor">Professor responsável</label>
              <select className='selectProfessor' id="selectProfessor">
                <option value="">Selecione</option>
                {professores.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="campo">
              <label htmlFor="selectTurma">Sala</label>
              <select className='selectTurma' id="selectTurma">
                <option value="">Selecione</option>
                {salas.map((sala) => (
                  <option key={sala.id} value={sala.id}>
                    {sala.nomeSala}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handlleCloseModal}>Cancelar</button>
            <button className='btn-salvar' onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovaDisciplinaModal;
