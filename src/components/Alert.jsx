import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  // Add slide-down animation and proper styling
  return (
    <div style={{ height: '50px', position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
      {alert && (
        <div 
          className={`alert alert-${alert.type} alert-dismissible fade show`} 
          role="alert"
          style={{
            animation: 'slideIn 0.5s forwards',
            minWidth: '300px'
          }}
        >
          <strong>{alert.msg}</strong>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="alert" 
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string,
    msg: PropTypes.string
  })
};

export default Alert;