export function showInfoMessage(message) {
  return {
    type: 'GROWLER__SHOW',
    growler: {
      text: message,
      type: 'growler--success',
    },
  };
}

export function showErrorMessage(message) {
  return {
    type: 'GROWLER__SHOW',
    growler: {
      text: message,
      type: 'growler--error',
    },
  };
}
