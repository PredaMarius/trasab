import React from 'react';
import Modal from 'react-responsive-modal';


export const ModalYesNo=(props)=> {

    return(
        <Modal open={props.open} onClose={props.onClose} >
            <div className="modal-header">
                <h5 className="modal-title f-w-600" id="confirmareStergere">{props.title}</h5>
            </div>
            <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="recipient-name" className="col-form-label" >{props.message}</label>  
                    </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={props.onClickNo}>NU</button>
                <button type="button" className="btn btn-primary" onClick={props.onClickYes}>DA</button>
            </div>
        </Modal>
    )
}

export default ModalYesNo