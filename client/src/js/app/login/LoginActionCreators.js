import * as Actions from './LoginActions';

export const submit = () => (
  {
    type: Actions.SUBMIT
  }
);

export const success = () => (
  {
    type: Actions.SUCCESS
  }
);

export const fail = () => (
  {
    type: Actions.FAIL
  }
);

export const updateEmail = email => (
  {
    type: Actions.EMAIL,
    email
  }
);

export const updatePassword = password => (
  {
    type: Actions.PASSWORD,
    password
  }
);