import React, { useState, useEffect } from 'react';
import { api } from '../../../../services/service';
import './style.css';

function ModalEditarDisciplina({ handleCloseModal, editarSelecionado }) {
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cargaHoraria: '',
    tipoEnsino: '',
    professor_id: '',
    sala_id: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [resProf, resSalas] = await Promise.all([
          api.get('/professores'),
          api.get('/salas')
        ]);
        setProfessores(resProf.data.dados || resProf.data);
        setSalas(resSalas.data.dados || resSalas.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (editarSelecionado) {
      setFormData({
        nome: editarSelecionado.nome || '',
        cargaHoraria: editarSelecionado.cargaHoraria || '',
        tipoEnsino: editarSelecionado.tipoEnsino || '',
        professor_id: editarSelecionado.professoresResponsaveis?.[0]?.id || '',
        sala_id: editarSelecionado.salaInfo?.id || ''
      });
    }
  }, [editarSelecionado]);


  const handleSubmit = async () => {
    try {
      const disciplinaAtualizada = {
        nome: formData.nome,
        cargaHoraria: Number(formData.cargaHoraria),
        tipoEnsino: formData.tipoEnsino,
        sala: Number(formData.sala_id) || null,
        professoresResponsaveis: formData.professor_id ? [Number(formData.professor_id)] : []
      };

      await api.put(`/disciplinas/${editarSelecionado.id}`, disciplinaAtualizada);
      alert('Disciplina atualizada com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
      alert(error.response?.data?.mensagem || 'Erro ao atualizar disciplina.');
    }
  };


  return (
    <div className="body-modalDisciplina">
      <div className="modal-content">
        <h1 className="title-cadastroDisciplina">Editar disciplina</h1>
        <hr />
        <div className="formulario">

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeDisciplina">Nome da disciplina</label>
              <input
                type="text"
                className="inputNomeDisciplina"
                id="inputNomeDisciplina"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div className="campo">
              <label htmlFor="inputCargaHoraria">Carga horária</label>
              <input
                type="number"
                className="inputCargaHoraria"
                id="inputCargaHoraria"
                value={formData.cargaHoraria}
                onChange={(e) => setFormData({ ...formData, cargaHoraria: e.target.value })}
              />
            </div>

            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <select
                className="selectTipoEnsino"
                id="selectTipoEnsino"
                value={formData.tipoEnsino}
                onChange={(e) => setFormData({ ...formData, tipoEnsino: e.target.value })}
              >
                <option value="">Selecione</option>
                <option value="ensino fundamental">Ensino Fundamental</option>
                <option value="ensino medio">Ensino Médio</option>
              </select>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectProfessor">Professor responsável</label>
              <select
                className="selectProfessor"
                id="selectProfessor"
                value={formData.professor_id}
                onChange={(e) => setFormData({ ...formData, professor_id: e.target.value })}
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
              <label htmlFor="selectTurma">Sala</label>
              <select
                className="selectTurma"
                id="selectTurma"
                value={formData.sala_id}
                onChange={(e) => setFormData({ ...formData, sala_id: e.target.value })}
              >
                <option value="">Selecione</option>
                {salas.map((sala) => (
                  <option key={sala.id} value={sala.id}>
                    {sala.nomeSala}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttons-submit">
            <button className="btn-cancelar" onClick={handleCloseModal}>Cancelar</button>
            <button className="btn-salvar" onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarDisciplina;
