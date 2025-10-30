import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizarPermissoes({ handleCloseModal, visualizarSelecionado }) {
    const [formData, setFormData] = useState({
    nome: '',
    email: '',
    papel: '',
  });

  useEffect(() => {
    if (visualizarSelecionado) {
      setFormData({
        nome: visualizarSelecionado.nome,
        email: visualizarSelecionado.email,
        papel: visualizarSelecionado.papel,
      });
    }
  }, [visualizarSelecionado]);

  const formatValue = (val) => val || 'NÃO INFORMADO';

  return (
    <div className="body-modalVisualizarPermissoes">
      <div className="modal-content">
        <h1 className='title-modalVisualizarPermissoes'>Visualizar usuário</h1>
        <hr />
        <div className="formulario">

        <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeCompleto">Nome completo</label>
              <span className='inputNomeCompleto'>{formData.nome}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <span className='inputEmail'>{formData.email}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectNivelAcesso">Nível de acesso</label>
              <span className='selectNivelAcesso'>{formData.papel}</span>
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
