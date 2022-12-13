import React from "react";

const Modal = ({ buttonText, title, component, confirmText }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return !show ? (
    <div className="d-grid gap-2">
      <button
        className="btn btn-lg btn-primary"
        type="button"
        onClick={handleShow}
      >
        {buttonText}
      </button>
    </div>
  ) : (
    <div class="modal">
      <div class="modal-dialog" role="form">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">{component}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">
              {confirmText}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
