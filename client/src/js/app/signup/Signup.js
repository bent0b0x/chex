import React from 'react';
import { Link } from 'react-router';

export default ({
  onSubmit,
  submitting,
  success,
  fail,
  onEmailChange,
  onGamertagChange,
  onPasswordChange
}) => (
  <div className="signup">
    <div className="row">
      <form
        className="col s12"
        onSubmit={onSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="gamertag"
              type="text"
              className="validate"
              onChange={onGamertagChange}>
            </input>
            <label htmlFor="gamertag">Gamertag</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className="validate"
              onChange={onEmailChange}>
            </input>
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              onChange={onPasswordChange}>
            </input>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action">
            Submit
        </button>
        <div className="row ">
          {
            submitting ?
              <div className="submitting">
                <div className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div><div className="gap-patch">
                      <div className="circle"></div>
                    </div><div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            : null
          }
          {
            success ?
            <div className="success">
              <i className="material-icons">done</i>
            </div>
            : null
          }
          {
            fail ?
            <div className="fail">
              <i className="material-icons">error_outline</i>
            </div>
            : null
          }
        </div>
      </form>
    </div>
  </div>
);