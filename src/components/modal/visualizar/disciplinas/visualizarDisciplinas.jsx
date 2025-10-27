import React, { useState, useEffect } from 'react';
import { api } from '../../../../services/service';
import './style.css';

function ModalVisualizarDisciplinas({ handleCloseModal, visualizarSelecionado }) {
  const [formData, setFormData] = useState({
    nome: '',
    cargaHoraria: '',
    tipoEnsino: '',
  });
  const [professorNome, setProfessorNome] = useState('NÃO INFORMADO');
  const [salaNome, setSalaNome] = useState('NÃO INFORMADO');

  const formatValue = (valor) => valor ? valor : 'NÃO INFORMADO';

  useEffect(() => {
    if (!visualizarSelecionado) return;

    setFormData({
      nome: visualizarSelecionado.nome || 'NÃO INFORMADO',
      cargaHoraria: visualizarSelecionado.cargaHoraria || 'NÃO INFORMADO',
      tipoEnsino: visualizarSelecionado.tipoEnsino || 'NÃO INFORMADO',
    });

    // Professor
    const profNome = visualizarSelecionado.professoresResponsaveis?.[0]?.nome;
    setProfessorNome(profNome || 'NÃO INFORMADO');

    // Sala
    const salaNome = visualizarSelecionado.salaInfo?.nomeSala;
    setSalaNome(salaNome || 'NÃO INFORMADO');
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
              <span className='inputNomeDisciplina'>{formatValue(formData.nome)}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputCargaHoraria">Carga horária</label>
              <span className='inputCargaHoraria'>{formatValue(formData.cargaHoraria)}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <span className='selectTipoEnsino'>{formatValue(formData.tipoEnsino)}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectProfessorResponsavel">Professor responsável</label>
              <span className='selectProfessorResponsavel'>{formatValue(professorNome)}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectTurma">Sala</label>
              <span className='selectTurma'>{formatValue(salaNome)}</span>
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
