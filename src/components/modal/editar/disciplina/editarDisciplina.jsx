import React, {useState, useEffect} from 'react';
import './style.css';

function ModalEditarDisciplina({ handleCloseModal, editarSelecionado }) {
    const [ formData, setFormData ] = useState({
        disciplina: '',
        cargaHoraria: '',
        tipoEnsino: '',
        professorResponsável: '',
        turma: ''
    })

    useEffect(() => {
        if (editarSelecionado) {
          setFormData(editarSelecionado);
        }
      }, [editarSelecionado]);

  return (
    <div className="body-modalEditarDisciplina">
      <div className="modal-content">
        <h1 className='title-modalEditarDisciplina'>Editar disciplina</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeDisciplina">Nome da disciplina</label>
              <input type="text" className='inputNomeDisciplina' id="inputNomeDisciplina" value={formData.disciplina} 
                onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputCargaHoraria">Carga horária</label>
              <input type="number" className='inputCargaHoraria' id="inputCargaHoraria" value={formData.cargaHoraria} 
                onChange={(e) => setFormData({ ...formData, cargaHoraria: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <select className='selectTipoEnsino' id="selectTipoEnsino" value={formData.tipoEnsino} 
                onChange={(e) => setFormData({ ...formData, tipoEnsino: e.target.value })}></select>
            </div>
            <div className="campo">
              <label htmlFor="selectProfessorResponsavel">Professor responsável</label>
              <select className='selectProfessorResponsavel' id="selectProfessorResponsavel" value={formData.professorResponsável} 
                onChange={(e) => setFormData({ ...formData, professorResponsável: e.target.value })}></select>
            </div>
            <div className="campo">
              <label htmlFor="selectTurma">Turma</label>
              <select className='selectTurma' id="selectTurma" value={formData.turma} 
                onChange={(e) => setFormData({ ...formData, turma: e.target.value })}></select>
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

export default ModalEditarDisciplina;
