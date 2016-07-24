import React from 'react';
import { Link } from 'react-router';

export default ({ onSubmit, submitting }) => (
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
    </form>
  </div>
);