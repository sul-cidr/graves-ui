

export default class Plugin {


  /**
   * Set the parent MiniDoc.
   *
   * @param {MiniMap} minimap
   */
  setDoc(minidoc) {
    this.minidoc = minidoc;
    this.mount();
  }


  /**
   * Apply the plugin.
   */
  mount() {
    throw new Error('Method not implemented');
  }


}
