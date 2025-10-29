import React, { useState, useEffect } from 'react';
import { api } from '../../../services/service';
import './style.css';

function NovaSalaModal({ handlleCloseModal }) {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    async function fetchProfessores() {
      try {
        const response = await api.get("/professores");
        setProfessores(response.data.dados || response.data);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    }
    fetchProfessores();
  }, []);

  const handleSubmit = async () => {
    const novaSala = {
      nomeSala: document.getElementById("inputNomeSala")?.value,
      numeroSala: document.getElementById("inputNumeroSala")?.value,
      capacidade: Number(document.getElementById("inputCapacidade")?.value),
      tipoSala: document.getElementById("inputTipoSala")?.value,
      professorResponsavelId: Number(document.getElementById("selectProfessor")?.value),
      turno: document.getElementById("selectTurno")?.value,
      status: document.getElementById("selectStatus")?.value || "Ativa",
      observacoes: document.getElementById("inputObservacoes")?.value
    };

    try {
      await api.post("/salas", novaSala);
      alert("Sala cadastrada com sucesso!");
      handlleCloseModal();
    } catch (error) {
      console.error("Erro ao cadastrar sala:", error);
      alert(error.response?.data?.mensagem || "Erro ao cadastrar sala.");
    }
  };

  return (
    <div className="body-modalSala">
      <div className="modal-content">
        <h1 className='title-cadastroSala'>Cadastrar nova sala</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeSala">Nome da Sala</label>
              <input type="text" className='inputNomeSala' id="inputNomeSala" />
            </div>
            <div className="campo">
              <label htmlFor="inputNumeroSala">Número da Sala</label>
              <input type="text" className='inputNumeroSala' id="inputNumeroSala" />
            </div>
            <div className="campo">
              <label htmlFor="inputCapacidade">Capacidade</label>
              <input type="number" className='inputCapacidade' id="inputCapacidade" />
            </div>
            <div className="campo">
              <label htmlFor="inputTipoSala">Tipo de Sala</label>
              <input type="text" className='inputTipoSala' id="inputTipoSala" />
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectProfessor">Professor Responsável</label>
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
              <label htmlFor="selectTurno">Turno</label>
              <select className='selectTurno' id="selectTurno">
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Noturno">Noturno</option>
              </select>
            </div>
            {/* <div className="campo">
              <label htmlFor="selectStatus">Status</label>
              <select className='selectStatus' id="selectStatus">
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
              </select>
            </div> */}
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputObservacoes">Observações</label>
              <input type="text" className='inputObservacoes' id="inputObservacoes" />
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

export default NovaSalaModal;
