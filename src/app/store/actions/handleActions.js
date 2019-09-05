export const pending = type => {
  return {
    type: type,
    pending: true,
  };
};

export const success = (payload, type) => {
  return {
    type: type,
    pending: false,
    data: payload,
  };
};

export const failure = (payload, type) => {
  return {
    type: type,
    pending: false,
    error: payload,
  };
};
