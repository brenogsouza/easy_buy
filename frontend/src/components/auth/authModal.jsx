import React, { useState, useContext } from 'react';
import { authApi } from '../../api/auth';
import $ from 'jquery';
import { GlobalContext } from '../../context/globalContext';

const validateEmail = (email = '') => email.length >= 5;
const validatePassword = (passwd = '') => passwd.length >= 5;
const validateName = (name = '') => name.length >= 5;


export const showAuthModal = (visible) => {
  if (visible) {
    $('#auth-modal').modal({
      show: visible
    });
  } else {
    $(`#auth-modal`).modal('hide');
  }
}

const AuthModal = () => {

  const [, setAuthenticated] = useContext(GlobalContext).authenticated;


  const [register, setRegister] = useState(false);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    const isValid = register ?
      validateEmail(username) && validatePassword(password) && validateName(name) && password === confirmPassword 
      : validateEmail(username) && validatePassword(password);

    if (isValid) {
      try {
        let res;
        if (register) {
          res = await authApi.register(name, username, password);
        } else {
          res = await authApi.post(username, password);
          setRegister(false);
        }
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('role', res.data.role);
        window.localStorage.setItem('userId', res.data.id);
        showAuthModal(false);
        setAuthenticated(true);
      } catch (err) {
        console.error(err);
      }
    }
  }


  // namoral, são 23:14. Não vou fazer este código ficar bonitinho não. Vai desse jeito porco mesmo.

  const emailValid = validateEmail(username);
  const passwordValid = validatePassword(password);
  const confirmPpasswordValid = password === confirmPassword;


  return (
    <div className="modal fade" id="auth-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {
              register ? (
                <form noValidate>
                  <div className="form-group">
                    <label htmlFor="email">Nome completo</label>
                    <input type="email" value={name} onChange={({ target: { value } }) => { setName(value) }} className={`form-control ${!emailValid ? 'is-invalid' : ''}`} id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={username} onChange={({ target: { value } }) => { setUsername(value) }} className={`form-control ${!emailValid ? 'is-invalid' : ''}`} id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" onChange={({ target: { value } }) => { setPassword(value) }} className={`form-control ${!passwordValid ? 'is-invalid' : ''}`} id="password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar senha</label>
                    <input type="password" onChange={({ target: { value } }) => { setConfirmPassword(value) }} className={`form-control ${!confirmPpasswordValid ? 'is-invalid' : ''}`} id="confirm-password" />
                  </div>
                  <p>Já possui uma conta? <span className="btn-link" onClick={() => setRegister(false)}> entrar </span></p>
                </form>
              ) : (
                  <form noValidate>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" value={username} onChange={({ target: { value } }) => { setUsername(value) }} className={`form-control ${!emailValid ? 'is-invalid' : ''}`} id="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Senha</label>
                      <input type="password" onChange={({ target: { value } }) => { setPassword(value) }} className={`form-control ${!passwordValid ? 'is-invalid' : ''}`} id="password" />
                    </div>
                    <p>Não tem uma conta? <span className="btn-link" onClick={() => setRegister(true)}> cadastrar </span></p>
                  </form>
                )
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>{register ? 'Cadastrar' : 'Entrar'}</button>
          </div>
        </div>
      </div>
    </div>
  )


}

export default AuthModal;