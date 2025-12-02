import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { api } from '../../../services/service';
import { useSnackbar } from '../../../hooks/useSnackbar';
import './style.css';

function NovaPermissaoUsuarioModal({ handlleCloseModal, onUsuariosCriados }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    papel: 'admin',
  });

  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.senha) {
      showError('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await api.post('/auth/register', formData);
      showSuccess('Usuário criado com sucesso!');

      setTimeout(() => {
        if (onUsuariosCriados) {
          onEstudanteCriado();
        }
        handlleCloseModal();
      }, 1500);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      showError(error.response?.data?.mensagem || 'Erro ao criar usuário.');
    }
  };

  return (
    <div className="body-modalPermissao">
      <div className="modal-content">
        <h1 className='title-cadastroUsuario'>Cadastrar novo usuario</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeCompleto">Nome completo</label>
              <input
                type="text"
                id="inputNomeCompleto"
                className="inputNomeCompleto"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div className="campo">
              <label htmlFor="selectNivelAcesso">Nível de acesso</label>
              <select
                id="selectNivelAcesso"
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
                id="inputEmail"
                className="inputEmail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="campo">
              <label htmlFor="inputSenha">Senha</label>
              <input
                type="password"
                id="inputSenha"
                className="inputSenha"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              />
            </div>
          </div>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handlleCloseModal}>Cancelar</button>
            <button className='btn-salvar' onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={hideSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NovaPermissaoUsuarioModal;
