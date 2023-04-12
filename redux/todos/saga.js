import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { adminRoot, onboarded, onboarded4 } from '../../src/contants/defaultValues';

import { setCurrentUser, getCurrentUser, setCurrentVault } from '../../src/helpers/Utils';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ONBOARD_USER,
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  onboardUserSuccess,
  onboardUserError,
} from './actions';
import { RouteContext } from '../../src/helpers/routeContext';

const authEndpoint="https://note-taking-app-backend-i3rt.onrender.com/"

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeLatest(LOGIN_USER, loginWithEmailPassword);
}
// const authEndpoint = process.env.REACT_APP_AUTHENDPOINT;


const loginWithEmailPasswordAsync = async (fd) =>{

  axios({
    url: `${authEndpoint}auth/login`,
    method: 'post',
    data : fd,
    headers: {
      Accept: 'application/json',

      'content-type': 'application/json',
    },
  })
    .then((response) => {
      console.log("response ==>",response);
      console.log("response.data ==> ", response.data);
      return response.data;
    })
    .catch((error) =>{
  console.log("error>>", error);

    }
     );

  }


function* loginWithEmailPassword({ payload }) {
  const {setCurrentState} = React.useContext(RouteContext)

  console.log(" payload>>", payload)
  const { email, password } = payload.user;
  const { history } = payload;
  const fd = {email, password};
  console.log('fd>>', fd);
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, fd);
    console.log("line 80 saga ", loginUser);

    if (loginUser) {
      // const loginUser = yield call(decodeToken, tokenUser.token);

      console.log("line 85 saga ",loginUser);

      if (loginUser) {
        const item = {
          ...loginUser,
          id: loginUser.user.id,
          email: loginUser.user.email,
          username: loginUser.user.username,
          profileImage: loginUser.user.profileImage,
          access_token: loginUser.access_token,
          refresh_token: loginUser.refresh_token,
          backgroundImage: loginUser.user.backgroundImage,
          firstName: loginUser.user.firstName,
          lastName: loginUser.user.lastName,
          phoneNumber: loginUser.user.phoneNumber,
          isVerified: loginUser.user.isVerified,
           createdAt : loginUser.user.createdAt,
        
        };

        console.log("item==>",item);
        setCurrentUser(item);
        setCurrentState('main')
        yield put(loginUserSuccess(item));
       
        
        if (item.onboarded === true) {
          if (!item.phone_number_verified) {
            history.push('/user/verify-phone');
          } else {
            history.push(adminRoot);
          }
        } else {
          history.push('/user/profile');
        }

        // if (item.onboarded === true) {
        //   history.push(adminRoot);
        // } else if (!item.onboarded && !item.phone_number_verified) {
        //   history.push('/user/verify-phone');
        // } else {
        //   history.push('/user/register');
        // }
      }
    } else {
      toast(Object.values(tokenUser.data)[0][0]);

      yield put(loginUserError(tokenUser.data));
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(
        'Object.values(error.response.data)[0][0]',
        Object.values(error.response.data)[0][0]
      );
      toast(Object.values(error.response.data)[0][0]);
    } else {
      toast('Unable to login');
    }
    yield put(loginUserError(error.response.data));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeLatest(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (
  first_name,
  last_name,
  email,
  password1,
  password2
) =>


  axios
    .post(`${authEndpoint}auth/register`, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });

function* registerWithEmailPassword({ payload }) {
  const { first_name, last_name, email, password1, password2 } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      first_name,
      last_name,
      email,
      password1,
      password2
    );
    console.log(registerUser);
    if (registerUser.user && registerUser.token) {
      const item = {
        id: registerUser.user.id,
        email: registerUser.user.email,
        username: registerUser.user.username,
        photo: registerUser.user.photo,
        date: '',
        role: 1,
        token: registerUser.token,
        onboarded: registerUser.user.onboarded,
        phone_number: registerUser.user.phone_number,
        first_name: registerUser.user.first_name,
        last_name: registerUser.user.last_name,
      };
      setCurrentUser(item);

      yield put(registerUserSuccess(item));

      history.push(onboarded);
    } else {
      yield put(registerUserError(registerUser.data));
    }
  } catch (error) {
    yield put(registerUserError(error.response.data));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {

  history.push('/user');
};

function* logout({ payload }) {
  const { history } = payload;

  setCurrentUser(null);
  setCurrentVault(null);
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) =>
  // eslint-disable-next-line no-return-await

  axios
    .post(`${authEndpoint}accounts/password_reset_request/`, { email })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  const { history } = payload;
  console.log(email);
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (forgotPasswordStatus.detail) {
      yield put(forgotPasswordSuccess('success'));
      history.push('/user/reset-password');
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

const decodeToken = async (token) =>
  // eslint-disable-next-line no-return-await
  // await auth
  //   .signInWithEmailAndPassword(email, password)
  axios({
    url: `${authEndpoint}users/me/?timestamp=${new Date().getTime()}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => error.response);

// export function* watchOnboardUser() {
//   // eslint-disable-next-line no-use-before-define
//   yield takeEvery(ONBOARD_USER, onboardWithDetails);
// }

// const onboardWithDetailsAsync = async (token, id, fd) =>

//   axios({
//     url: `${authEndpoint}users/${id}/`,
//     method: 'put',
//     data: fd,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `JWT ${token}`,
//     },
//   })
//     .then((response) => {
//       console.log(response);
//       return response.data;
//     })
//     .catch((error) => error.response);

// function* onboardWithDetails({ payload }) {
//   const {
//     token,
//     id,
//     nationality,
//     location,
//     date_of_birth,
//     job_title,
//     profession,
//     industry,
//     phone_number,
//   } = payload.user;
//   const fd = {
//     nationality,
//     location: location || 'location',
//     date_of_birth,
//     job_title: job_title || 'job title',
//     profession: profession || 'profession',
//     industry: industry || 'industry',
//     onboarded: false,
//     phone_number,
//   };
//   const { history } = payload;
  

//   try {
//     const onboardUser = yield call(onboardWithDetailsAsync, token, id, fd);
//     if (onboardUser.onboarded === false) {
//       const item = {
//         onboarded: onboardUser.onboarded,
//         is_bvn_verified: onboardUser.is_bvn_verified,
//         is_email_verified: onboardUser.is_email_verified,
//         is_kyc_submitted: onboardUser.is_kyc_submitted,
//         is_kyc_verified: onboardUser.is_kyc_verified,
//         phone_number: onboardUser.phone_number,
//         phone_number_verified: onboardUser.phone_number_verified,
//         has_performed_transaction: onboardUser.has_performed_transaction,
//       };

//       const currentUser = getCurrentUser();
//       const newUser = {
//         ...currentUser,
//         ...item,
//       };

//       setCurrentUser({ ...newUser });

//       yield put(onboardUserSuccess(newUser));

     
//       history.push({
//         pathname: onboarded4,
//         state: onboardUser.phone_number,
//       });
//     } else {

//       yield put(onboardUserError(onboardUser.data.message));
//     }
//   } catch (error) {

//     yield put(onboardUserError(error));
//   }
// }

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    // fork(watchOnboardUser),
  ]);
}
