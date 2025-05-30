import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizarDisciplinas({ handleCloseModal, visualizarSelecionado }) {
    const [ formData, setFormData ] = useState({
        disciplina: '',
        cargaHoraria: '',
        tipoEnsino: '',
        professorResponsável: '',
        turma: ''
    })

  useEffect(() => {
    if (visualizarSelecionado) {
      setFormData(visualizarSelecionado);
    }
  }, [visualizarSelecionado]);

  return (
    <div className="body-modalVisualizarDisciplinas">
      <div className="modal-content">
        <h1 className='title-modalVisualizarDisciplinas'>Visualizar disciplinas</h1>
        <hr />
        <div className="formulario">

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeDisciplina">Nome da disciplina</label>
              <span className='inputNomeDisciplina'>{formData.disciplina}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputCargaHoraria">Carga horária</label>
              <span className='inputCargaHoraria'>{formData.cargaHoraria}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <span className='selectTipoEnsino'>{formData.tipoEnsino}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectProfessorResponsavel">Professor responsável</label>
              <span className='selectProfessorResponsavel'>{formData.professorResponsável}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectTurma">Turma</label>
              <span className='selectTurma'>{formData.turma}</span>
            </div>
          </div>

          <div className="button">
            <button className='btn-voltar' onClick={handleCloseModal}>Voltar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalVisualizarDisciplinas;
