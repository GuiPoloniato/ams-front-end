import React from 'react';
import './style.css';

function novaTurmaModal({ handlleCloseModal }) {
  return (
    <div className="body-modalTurma">
      <div className="modal-content">
        <h1 className='title-cadastroTurma'>Cadastrar novo professor</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeIdentificacao">Nome da identificação</label>
              <input type="text" className='inputNomeIdentificacao' id="inputNomeIdentificacao" />
            </div>
            <div className="campo">
              <label htmlFor="inputAno">Ano letivo</label>
              <input type="number" className='inputAno' id="inputAno" />
            </div>
            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <select className='selectTipoEnsino' id="selectTipoEnsino"></select>
            </div>
            <div className="campo">
              <label htmlFor="selectTurno">Turno</label>
              <select className='selectTurno' id="selectTurno"></select>
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

export default novaTurmaModal;
