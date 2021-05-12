class globalHelper {
  store = null;

  /**
   * Take store instance
   */
  setStore = store => {
    this.store = store;
  };
}

export default new globalHelper();
