import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizarPermissoes({ handleCloseModal, visualizarSelecionado }) {
    const [ formData, setFormData ] = useState({
        nomeCompleto: '',
        nivelAcesso: '',
        email: '',
        senha: ''
    })

  useEffect(() => {
    if (visualizarSelecionado) {
      setFormData(visualizarSelecionado);
    }
  }, [visualizarSelecionado]);

  return (
    <div className="body-modalVisualizarPermissoes">
      <div className="modal-content">
        <h1 className='title-modalVisualizarPermissoes'>Visualizar usuário</h1>
        <hr />
        <div className="formulario">

        <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeCompleto">Nome completo</label>
              <span className='inputNomeCompleto'>{formData.nomeCompleto}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <span className='inputEmail'>{formData.email}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectNivelAcesso">Nível de acesso</label>
              <span className='selectNivelAcesso'>{formData.nivelAcesso}</span>
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

export default ModalVisualizarPermissoes;
