import React from 'react';

const Alert = (props) => {
  const capitalize = (word) => {
    word = word==='danger'?"error":word
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase(0) + lower.slice(1);
  };
  return (
    <div style={{ minHeight: '50px'}}>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade ${props.alert.msg==='' && props.alert.type===''?"hide":"show"}`} role="alert" style={{ height: '50px' }}>
        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
      </div>
    </div>
  );
};

export default Alert;
