import React, { useState, useEffect } from 'react';
import { api } from '../../../../services/service';
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
    cidade: '',
    turno: ''
  });

  useEffect(() => {
    if (editarSelecionado) {
      const endereco = editarSelecionado.endereco || {};
      console.log(endereco)
      setFormData({
        nome: editarSelecionado.nome || '',
        formacao: editarSelecionado.formacao || '',
        telefone: editarSelecionado.telefone || '',
        email: editarSelecionado.email || '',
        cep: endereco.cep || '',
        bairro: endereco.bairro || '',
        logradouro: endereco.logradouro || '',
        numero: endereco.numero || '',
        pais: endereco.pais || '',
        uf: endereco.uf || '',
        cidade: endereco.cidade || '',
        turno: editarSelecionado.turno || ''
      });
    }
  }, [editarSelecionado]);

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = async () => {
    try {
      const professorAtualizado = {
        nome: formData.nome,
        formacao: formData.formacao,
        telefone: formData.telefone,
        email: formData.email,
        turno: formData.turno,
        endereco: {
          cep: formData.cep,
          bairro: formData.bairro,
          logradouro: formData.logradouro,
          numero: formData.numero,
          pais: formData.pais,
          uf: formData.uf,
          cidade: formData.cidade
        }
      };

      await api.put(`/professores/${editarSelecionado.id}`, professorAtualizado);
      alert('Professor atualizado com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      alert(error.response?.data?.mensagem || 'Erro ao atualizar professor.');
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
              <label>Nome completo</label>
              <input
                type="text"
                className="inputNome"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Formação</label>
              <input
                type="text"
                className="inputFormacao"
                value={formData.formacao}
                onChange={(e) => handleChange('formacao', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Telefone</label>
              <input
                type="text"
                className="inputTelefone"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Email</label>
              <input
                type="email"
                className="inputEmail"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label>CEP</label>
              <input
                type="text"
                className="inputCep"
                value={formData.cep}
                onChange={(e) => handleChange('cep', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Bairro</label>
              <input
                type="text"
                className="inputBairro"
                value={formData.bairro}
                onChange={(e) => handleChange('bairro', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Logradouro</label>
              <input
                type="text"
                className="inputLogradouro"
                value={formData.logradouro}
                onChange={(e) => handleChange('logradouro', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Número</label>
              <input
                type="number"
                className="inputNumero"
                value={formData.numero}
                onChange={(e) => handleChange('numero', e.target.value)}
              />
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label>País</label>
              <input
                type="text"
                className="selectPais"
                value={formData.pais}
                onChange={(e) => handleChange('pais', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Estado</label>
              <input
                type="text"
                className="selectEstado"
                value={formData.uf}
                onChange={(e) => handleChange('uf', e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Cidade</label>
              <input
                type="text"
                className="selectCidade"
                value={formData.cidade}
                onChange={(e) => handleChange('cidade', e.target.value)}
              />
            </div>
          </div>

          <div className="buttons-submit">
            <button className="btn-cancelar" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button className="btn-salvar" onClick={handleSubmit}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarProfessor;
