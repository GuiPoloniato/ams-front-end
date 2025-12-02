import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { api } from '../../../../services/service';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import './style.css';

function ModalEditarSala({ handleCloseModal, editarSelecionado }) {
  const [professores, setProfessores] = useState([]);
  const [formData, setFormData] = useState({
    nomeSala: '',
    numeroSala: '',
    capacidade: '',
    tipoSala: '',
    professorResponsavelId: '',
    turno: '',
    status: '',
    observacoes: ''
  });

  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchProfessores() {
      try {
        const response = await api.get('/professores');
        setProfessores(response.data.dados || response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    }
    fetchProfessores();
  }, []);

  useEffect(() => {
    if (editarSelecionado) {
      setFormData({
        nomeSala: editarSelecionado.nomeSala || '',
        numeroSala: editarSelecionado.numeroSala || '',
        capacidade: editarSelecionado.capacidade || '',
        tipoSala: editarSelecionado.tipoSala || '',
        professorResponsavelId: editarSelecionado.professorResponsavelId || '',
        turno: editarSelecionado.turno || '',
        status: editarSelecionado.status || 'Ativa',
        observacoes: editarSelecionado.observacoes || ''
      });
    }
  }, [editarSelecionado]);

  const handleSubmit = async () => {
    try {
      await api.put(`/salas/${editarSelecionado.id}`, formData);
      showSuccess('Sala atualizada com sucesso!');
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error('Erro ao atualizar sala:', error);
      showError(error.response?.data?.mensagem || 'Erro ao atualizar sala.');
    }
  };

  return (
    <div className="body-modalSala">
      <div className="modal-content">
        <h1 className='title-modalEditarSala'>Editar Sala</h1>
        <hr />
        <div className="formulario">

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeSala">Nome da Sala</label>
              <input
                type="text"
                className="inputNomeSala"
                id="inputNomeSala"
                value={formData.nomeSala}
                onChange={(e) => setFormData({ ...formData, nomeSala: e.target.value })}
              />
            </div>

            <div className="campo">
              <label htmlFor="inputNumeroSala">Número da Sala</label>
              <input
                type="text"
                className="inputNumeroSala"
                id="inputNumeroSala"
                value={formData.numeroSala}
                onChange={(e) => setFormData({ ...formData, numeroSala: e.target.value })}
              />
            </div>

            <div className="campo">
              <label htmlFor="inputCapacidade">Capacidade</label>
              <input
                type="number"
                className="inputCapacidade"
                id="inputCapacidade"
                value={formData.capacidade}
                onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })}
              />
            </div>

            <div className="campo">
              <label htmlFor="inputTipoSala">Tipo de Sala</label>
              <input
                type="text"
                className="inputTipoSala"
                id="inputTipoSala"
                value={formData.tipoSala}
                onChange={(e) => setFormData({ ...formData, tipoSala: e.target.value })}
              />
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectProfessor">Professor Responsável</label>
              <select
                className="selectProfessor"
                id="selectProfessor"
                value={formData.professorResponsavelId}
                onChange={(e) => setFormData({ ...formData, professorResponsavelId: e.target.value })}
              >
                <option value="">Selecione</option>
                {professores.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="selectTurno">Turno</label>
              <select
                className="selectTurno"
                id="selectTurno"
                value={formData.turno}
                onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
              >
                <option value="">Selecione</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Noturno">Noturno</option>
              </select>
            </div>

            {/* <div className="campo">
              <label htmlFor="selectStatus">Status</label>
              <select
                className="selectStatus"
                id="selectStatus"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
              </select>
            </div> */}
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputObservacoes">Observações</label>
              <input
                type="text"
                className="inputObservacoes"
                id="inputObservacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              />
            </div>
          </div>

          <div className="buttons-submit">
            <button className="btn-cancelar" onClick={handleCloseModal}>Cancelar</button>
            <button className="btn-salvar" onClick={handleSubmit}>Salvar</button>
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

export default ModalEditarSala;
