import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { api } from '../../../../services/service';
import { validateForm, formatters, estadosBrasil, professorValidationSchema } from '../../../../utils/validatorUtil';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import './style.css';

function ModalEditarProfessor({ handleCloseModal, editarSelecionado }) {
  const [formData, setFormData] = useState({
    nome: '',
    formacao: '',
    telefone: '',
    email: '',
    cep: '',
    bairro: '',
    logradouro: '',
    numero: '',
    pais: '',
    uf: '',
    cidade: ''
  });

  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  useEffect(() => {
    if (editarSelecionado) {
      const endereco = editarSelecionado.endereco || {};
      
      setFormData({
        nome: editarSelecionado.nome || '',
        formacao: editarSelecionado.formacao || '',
        telefone: editarSelecionado.telefone ? formatters.phone(editarSelecionado.telefone) : '',
        email: editarSelecionado.email || '',
        cep: endereco.cep ? formatters.cep(endereco.cep) : '',
        bairro: endereco.bairro || '',
        logradouro: endereco.logradouro || '',
        numero: endereco.numero || '',
        pais: endereco.pais || '',
        uf: endereco.uf || '',
        cidade: endereco.cidade || ''
      });
    }
  }, [editarSelecionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'cep') {
      formattedValue = formatters.cep(value);
    } else if (name === 'telefone') {
      formattedValue = formatters.phone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, professorValidationSchema);
    
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      showError(firstError);
      return;
    }

    const professorAtualizado = {
      nome: formData.nome,
      formacao: formData.formacao,
      telefone: formData.telefone.replace(/\D/g, ''),
      email: formData.email,
      endereco: {
        cep: formData.cep.replace(/\D/g, ''),
        bairro: formData.bairro,
        logradouro: formData.logradouro,
        numero: formData.numero,
        pais: formData.pais,
        uf: formData.uf,
        cidade: formData.cidade
      }
    };

    try {
      setLoading(true);
      await api.put(`/professores/${editarSelecionado.id}`, professorAtualizado);
      showSuccess('Professor atualizado com sucesso!');
      
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      
      const errorMessage = error.response?.data?.mensagem 
        || error.request 
          ? "Não foi possível conectar ao servidor. Verifique sua conexão."
          : "Erro inesperado. Tente novamente.";
      
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body-modalEditarProfessor">
      <div className="modal-content">
        <h1 className="title-modalEditarProfessor">Editar professor</h1>
        <hr />
        <div className="formulario">
          <h2 className="h2-informacoes-pessoais">Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                className="inputNome"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="formacao">Formação</label>
              <input
                type="text"
                className="inputFormacao"
                id="formacao"
                name="formacao"
                value={formData.formacao}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="inputTelefone"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                disabled={loading}
                placeholder="(00) 00000-0000"
                maxLength="15"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="inputEmail"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                className="inputCep"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                disabled={loading}
                placeholder="00000-000"
                maxLength="9"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                className="inputBairro"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                type="text"
                className="inputLogradouro"
                id="logradouro"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="numero">Número</label>
              <input
                type="number"
                className="inputNumero"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="pais">País</label>
              <input
                type="text"
                className="inputPais"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                disabled={loading}
                placeholder="Brasil"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="uf">Estado</label>
              <select
                className="selectEstado"
                id="uf"
                name="uf"
                value={formData.uf}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Selecione</option>
                {estadosBrasil.map(estado => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="campo">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                className="inputCidade"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="buttons-submit">
            <button 
              className="btn-cancelar" 
              onClick={() => {
                handleCloseModal();
              }}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              className="btn-salvar" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
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

export default ModalEditarProfessor;