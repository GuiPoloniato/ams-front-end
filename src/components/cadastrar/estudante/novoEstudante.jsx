import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './style.css';
import { api } from '../../../services/service';
import { validateForm, formatters, estadosBrasil } from '../../../utils/validatorUtil';
import { estudanteValidationSchema } from '../../../utils/validatorUtil';
import { useSnackbar } from '../../../hooks/useSnackbar';

function NovoEstudanteModal({ handlleCloseModal, onEstudanteCriado }) {
  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    nascimento: '',
    naturalidade: '',
    raca: '',
    turno: '',
    cep: '',
    bairro: '',
    logradouro: '',
    numero: '',
    pais: '',
    uf: '',
    cidade: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    rgResponsavel: '',
    orgaoExpedidor: '',
    ufResponsavel: '',
    telefoneResidencial: '',
    telefoneComercial: '',
    celular: '',
    email: '',
    profissao: '',
    parentesco: ''
  });

  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === 'cep') {
      formattedValue = formatters.cep(value);
    } else if (name === 'celular' || name === 'telefoneResidencial' || name === 'telefoneComercial') {
      formattedValue = formatters.phone(value);
    } else if (name === 'cpfResponsavel') {
      formattedValue = formatters.cpf(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, estudanteValidationSchema);
    
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      showError(firstError);
      return;
    }

    const novoEstudante = {
      matricula: String(formData.matricula),
      nome: formData.nome,
      nascimento: formData.nascimento,
      naturalidade: formData.naturalidade,
      raca: formData.raca,
      turno: formData.turno,
      endereco: {
        cep: formData.cep.replace(/\D/g, ''),
        bairro: formData.bairro,
        logradouro: formData.logradouro,
        numero: String(formData.numero),
        pais: formData.pais,
        uf: formData.uf,
        cidade: formData.cidade
      },
      responsavel: {
        nome: formData.nomeResponsavel,
        cpf: formData.cpfResponsavel.replace(/\D/g, ''),
        rg: formData.rgResponsavel,
        orgaoExpedidor: formData.orgaoExpedidor,
        uf: formData.ufResponsavel,
        telefoneResidencial: formData.telefoneResidencial.replace(/\D/g, ''),
        telefoneComercial: formData.telefoneComercial.replace(/\D/g, ''),
        celular: formData.celular.replace(/\D/g, ''),
        email: formData.email,
        profissao: formData.profissao,
        parentesco: formData.parentesco
      }
    };

    try {
      setLoading(true);
      await api.post("/alunos", novoEstudante);
      showSuccess("Estudante cadastrado com sucesso!");

      setTimeout(() => {
        if (onEstudanteCriado) {
          onEstudanteCriado();
        }
        handlleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar estudante:", error);
      
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
    <div className="body-modalEstudante">
      <div className="modal-content">
        <h1 className='title-cadastroEstudante'>Cadastrar novo estudante</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais'>Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="matricula">Matrícula</label>
              <input 
                type="number" 
                className='inputMatricula' 
                id="matricula"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="nome">Nome completo</label>
              <input 
                type="text" 
                className='inputName' 
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="nascimento">Data de nascimento</label>
              <input 
                type="date" 
                className='dataInput' 
                id="nascimento"
                name="nascimento"
                value={formData.nascimento}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="naturalidade">Naturalidade</label>
              <input 
                type="text" 
                className='inputNaturalidade' 
                id="naturalidade"
                name="naturalidade"
                value={formData.naturalidade}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="raca">Raça</label>
              <select 
                className='selectRaca' 
                id="raca"
                name="raca"
                value={formData.raca}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Selecione</option>
                <option value="branca">Branca</option>
                <option value="preta">Preta</option>
                <option value="parda">Parda</option>
                <option value="amarela">Amarela</option>
                <option value="indigena">Indígena</option>
              </select>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="cep">CEP</label>
              <input 
                type="text" 
                className='inputCep' 
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
                className='inputBairro' 
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
                className='inputLogradouro' 
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
                className='inputNumber' 
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
                className='inputPais' 
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
                className='selectEstado' 
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
                className='inputCidade' 
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="turno">Turno</label>
              <select 
                className='selectTurno' 
                id="turno"
                name="turno"
                value={formData.turno}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Selecione</option>
                <option value="vespertino">Vespertino</option>
                <option value="matutino">Matutino</option>
                <option value="noturno">Noturno</option>
              </select>
            </div>
          </div>

          <h2 className='h2-responsavel'>Responsável 1</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="nomeResponsavel">Nome completo</label>
              <input 
                type="text" 
                className='inputNomeResponsavel' 
                id="nomeResponsavel"
                name="nomeResponsavel"
                value={formData.nomeResponsavel}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="cpfResponsavel">CPF</label>
              <input 
                type="text" 
                className='inputCpfResponsavel' 
                id="cpfResponsavel"
                name="cpfResponsavel"
                value={formData.cpfResponsavel}
                onChange={handleChange}
                disabled={loading}
                placeholder="000.000.000-00"
                maxLength="14"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="rgResponsavel">RG</label>
              <input 
                type="text" 
                className='inputRgResponsavel' 
                id="rgResponsavel"
                name="rgResponsavel"
                value={formData.rgResponsavel}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="orgaoExpedidor">Órgão expedidor</label>
              <input 
                type="text" 
                className='inputOrgao' 
                id="orgaoExpedidor"
                name="orgaoExpedidor"
                value={formData.orgaoExpedidor}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="ufResponsavel">UF</label>
              <select 
                className='selectUf' 
                id="ufResponsavel"
                name="ufResponsavel"
                value={formData.ufResponsavel}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Selecione</option>
                {estadosBrasil.map(estado => (
                  <option key={estado.value} value={estado.value}>
                    {estado.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="telefoneResidencial">Telefone residencial</label>
              <input 
                type="text" 
                className='inputTelefone' 
                id="telefoneResidencial"
                name="telefoneResidencial"
                value={formData.telefoneResidencial}
                onChange={handleChange}
                disabled={loading}
                placeholder="(00) 0000-0000"
                maxLength="15"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="telefoneComercial">Telefone comercial</label>
              <input 
                type="text" 
                className='inputComercial' 
                id="telefoneComercial"
                name="telefoneComercial"
                value={formData.telefoneComercial}
                onChange={handleChange}
                disabled={loading}
                placeholder="(00) 0000-0000"
                maxLength="15"
              />
            </div>
            
            <div className="campo">
              <label htmlFor="celular">Celular</label>
              <input 
                type="text" 
                className='inputCelular' 
                id="celular"
                name="celular"
                value={formData.celular}
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
                className='inputEmail' 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="profissao">Profissão</label>
              <input 
                type="text" 
                className='inputProfissao' 
                id="profissao"
                name="profissao"
                value={formData.profissao}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            
            <div className="campo">
              <label htmlFor="parentesco">Parentesco</label>
              <input 
                type="text" 
                className='inputParentesco' 
                id="parentesco"
                name="parentesco"
                value={formData.parentesco}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <button className="button-responsavel" disabled={loading}>
            Adicionar responsável
          </button>

          <div className="buttons-submit">
            <button 
              className='btn-cancelar' 
              onClick={handlleCloseModal}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              className='btn-salvar' 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar do Material-UI */}
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

export default NovoEstudanteModal;