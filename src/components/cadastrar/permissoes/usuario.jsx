import React from 'react';
import './style.css';

function NovaPermissaoUsuarioModal({ handlleCloseModal }) {
  return (
    <div className="body-modalPermissao">
      <div className="modal-content">
        <h1 className='title-cadastroUsuario'>Cadastrar novo usuario</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeCompleto">Nome completo</label>
              <input type="text" className='inputNomeCompleto' id="inputNomeCompleto" />
            </div>
            <div className="campo">
              <label htmlFor="selectNivelAcesso">Nível de acesso</label>
              <select className='selectNivelAcesso' id="selectNivelAcesso"></select>
            </div>
          </div>
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" className='inputEmail' id="inputEmail" />
            </div>
            <div className="campo">
              <label htmlFor="inputSenha">Senha</label>
              <input type="password" className='inputSenha' id="inputSenha" />
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

export default NovaPermissaoUsuarioModal;
