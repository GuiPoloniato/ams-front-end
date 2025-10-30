import React, {useState, useEffect} from 'react';
import { api } from '../../../../services/service';
import './style.css';

function ModalEditarUsuario({ handleCloseModal, editarSelecionado }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    papel: '',
  });

  useEffect(() => {
    if (editarSelecionado) {
      setFormData({
        nome: editarSelecionado.nome,
        email: editarSelecionado.email,
        papel: editarSelecionado.papel,
      });
    }
  }, [editarSelecionado]);

  const handleSubmit = async () => {
    try {
      await api.put(`/users/${editarSelecionado.id}`, formData);
      alert('Usuário atualizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert(error.response?.data?.mensagem || 'Erro ao atualizar usuário.');
    }
  };

  return (
    <div className="body-modalEditarUsuario">
      <div className="modal-content">
        <h1 className='title-modalEditarUsuario'>Editar usuário</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeCompleto">Nome completo</label>
              <input
                type="text"
                className="inputNomeCompleto"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div className="campo">
              <label htmlFor="selectNivelAcesso">Nível de acesso</label>
              <select
                className="selectNivelAcesso"
                value={formData.papel}
                onChange={(e) => setFormData({ ...formData, papel: e.target.value })}
              >
                <option value="admin">Administrador</option>
                <option value="professor">Professor</option>
                <option value="aluno">Aluno</option>
              </select>
            </div>
          </div>
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                className="inputEmail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            {/* <div className="campo">
              <label htmlFor="inputSenha">Senha</label>
              <input type="password" className='inputSenha' id="inputSenha" value={formData.senha} 
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}/>
            </div> */}
          </div>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handleCloseModal}>Cancelar</button>
            <button className='btn-salvar' onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarUsuario;
