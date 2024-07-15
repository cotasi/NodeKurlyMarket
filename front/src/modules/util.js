export const idvalid = (uid) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(uid);
};

export const pwvalid = (pwdata) => {
  const pwregex = /^[a-z0-9]+$/;
  return pwregex.test(pwdata);
};

export const namevalid = (namedata) => {
  const nmregex = /^[a-zA-Z ]{2,30}$/;
  return nmregex.test(namedata);
};

export const pwCheck = (pw, pwchk) => {
  return pw === pwchk ? true : false;
};

export const emailCheck = (emaildata) => {
  const reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  return reg.test(emaildata);
};
