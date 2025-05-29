import React, {useState, useEffect} from 'react';
import './style.css';

function ModalEditarUsuario({ handleCloseModal, editarSelecionado }) {
    const [ formData, setFormData ] = useState({
        nomeCompleto: '',
        nivelAcesso: '',
        email: '',
        senha: ''
    })

    useEffect(() => {
        if (editarSelecionado) {
          setFormData(editarSelecionado);
        }
      }, [editarSelecionado]);

  return (
    <div className="body-modalEditarUsuario">
      <div className="modal-content">
        <h1 className='title-modalEditarUsuario'>Editar usuário</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeCompleto">Nome completo</label>
              <input type="text" className='inputNomeCompleto' id="inputNomeCompleto" value={formData.nomeCompleto} 
                onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="selectNivelAcesso">Nível de acesso</label>
              <select className='selectNivelAcesso' id="selectNivelAcesso" value={formData.nivelAcesso} 
                onChange={(e) => setFormData({ ...formData, nivelAcesso: e.target.value })}></select>
            </div>
          </div>
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" className='inputEmail' id="inputEmail" value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputSenha">Senha</label>
              <input type="password" className='inputSenha' id="inputSenha" value={formData.senha} 
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}/>
            </div>
          </div>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handleCloseModal}>Cancelar</button>
            <button className='btn-salvar'>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarUsuario;
