import React, { useState, useEffect } from 'react';
import { api } from '../../../../services/service';
import './style.css';

function ModalVisualizarSalas({ handleCloseModal, visualizarSelecionado }) {
    const [ formData, setFormData ] = useState({
        nomeSala: '',
        numeroSala: '',
        capacidade: '',
        tipoSala: '',
        professorResponsavelId: '',
        turno: '',
        status: '',
        observacoes: '',
    })
    const [professorNome, setProfessorNome] = useState('NAO INFORMADO');

    const formatValue = (valor) => valor ? valor : 'NAO INFORMADO';

  useEffect(() => {
    if (visualizarSelecionado) {
      setFormData(visualizarSelecionado);

      const profNome = visualizarSelecionado.professorResponsavelId;
      if (!profNome) return;

      if (typeof profNome === 'object') {
        setProfessorNome(profNome.nome || 'NAO INFORMADO');
      } else {
        api.get(`/professores/${profNome}`)
          .then(res => {
            const prof = res.data?.dados || res.data;
            setProfessorNome(prof?.nome || 'NAO INFORMADO');
          })
          .catch(() => setProfessorNome('NAO INFORMADO'));
      }
    }
  }, [visualizarSelecionado]);
  

  return (
    <div className="body-modalVisualizarSalas">
      <div className="modal-content">
        <h1 className='title-modalVisualizarSalas'>Visualizar salas</h1>
        <hr />
        <div className="formulario">

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="spanNomeSala">Nome da Sala</label>
              <span className='spanNomeSala'>{formatValue(formData.nomeSala)}</span>
            </div>
            <div className="campo">
              <label htmlFor="spanNumeroSala">Número da Sala</label>
              <span className='spanNumeroSala'>{formatValue(formData.numeroSala)}</span>
            </div>
            <div className="campo">
              <label htmlFor="spanCapacidade">Capacidade</label>
              <span className='spanCapacidade'>{formatValue(formData.capacidade)}</span>
            </div>
            <div className="campo">
              <label htmlFor="spanTipoSala">tipoSala</label>
              <span className='spanTipoSala'>{formatValue(formData.turno)}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="spanProfessor">Professor Responsável</label>
              <span className='spanProfessor'>{formatValue(professorNome)}</span>
            </div>
            <div className="campo">
              <label htmlFor="spanTurno">Turno</label>
              <span className='spanTurno'>{formatValue(formData.turno)}</span>
            </div>
            <div className="campo">
              <label htmlFor="spanStatus">status</label>
              <span className='spanStatus'>{formatValue(formData.status)}</span>
            </div>
          </div>
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="spanObservacoes">Observacoes</label>
              <span className='spanObservacoes'>{formatValue(formData.observacoes)}</span>
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

export default ModalVisualizarSalas;
