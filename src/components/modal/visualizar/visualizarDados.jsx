
import './style.css';

function ModalVisualizar({ handlleCloseModal  }) {
  return (
    <div className="body-modalVisualizar">
      <div className="modal-content">
        <h1 className='title-modalVisualizar'>Visualizar estudante</h1>

        <hr />

        <div className="button">
          <button onClick={handlleCloseModal}>Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalVisualizar;
