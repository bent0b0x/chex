import * as Actions from './SignupActions';

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