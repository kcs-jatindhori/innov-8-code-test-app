
export const globalActionTypes = {
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
    SHOW_SNACKBAR: "SHOW_SNACKBAR",
};

// Close snackbar
export const closeSnackbar = () => async dispatch => {
  dispatch({
    type: globalActionTypes.CLOSE_SNACKBAR
  });
};