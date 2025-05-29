import React from 'react';
import './style.css';

function NovaDisciplinaModal({ handlleCloseModal }) {
  return (
    <div className="body-modalDisciplina">
      <div className="modal-content">
        <h1 className='title-cadastroDisciplina'>Cadastrar nova desciplina</h1>
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
              <select className='selectTipoEnsino' id="selectTipoEnsino"></select>
            </div>
          </div>
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectProfessorResponsavel">Professor responsável</label>
              <select className='selectProfessorResponsavel' id="selectProfessorResponsavel" ></select>
            </div>
            <div className="campo">
              <label htmlFor="selectTruma">Turma</label>
              <select className='selectTurma' id="selectTurma"></select>
            </div>
          </div>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handlleCloseModal}>Cancelar</button>
            <button className='btn-salvar'>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovaDisciplinaModal;
