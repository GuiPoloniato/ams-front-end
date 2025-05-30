import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizarTurmas({ handleCloseModal, visualizarSelecionado }) {
    const [ formData, setFormData ] = useState({
        nome: '',
        ano_letivo: '',
        tipo_ensino: '',
        turno: ''
    })

  useEffect(() => {
    if (visualizarSelecionado) {
      setFormData(visualizarSelecionado);
    }
  }, [visualizarSelecionado]);

  return (
    <div className="body-modalVisualizarTurmas">
      <div className="modal-content">
        <h1 className='title-modalVisualizarTurmas'>Visualizar turmas</h1>
        <hr />
        <div className="formulario">

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeIdentificacao">Nome da identificação</label>
              <span className='inputNomeIdentificacao'>{formData.nome}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputAno">Ano letivo</label>
              <span className='inputAno'>{formData.ano_letivo}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <span className='selectTipoEnsino'>{formData.tipo_ensino}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectTurno">Turno</label>
              <span className='selectTurno'>{formData.turno}</span>
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

export default ModalVisualizarTurmas;
