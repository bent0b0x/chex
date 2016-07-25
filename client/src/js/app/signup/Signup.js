import React from 'react';
import { Link } from 'react-router';

export default ({ onSubmit, submitting, success, fail }) => (
  <div className="row">
    <form
      className="col s12"
      onSubmit={onSubmit}>
      <div className="row">
        <div className="input-field col s12">
          <input id="gamertag" type="text" className="validate"></input>
          <label htmlFor="gamertag">Gamertag</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate"></input>
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate"></input>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action">
          Submit
      </button>
        <div className="row">
        {
          submitting ?
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
          : null
        }
        {
          success ?
          <i className="material-icons">done</i>
          : null
        }
        {
          fail ?
          <i className="material-icons">error_outline</i>
          : null
        }
      </div>
    </form>
  </div>
);