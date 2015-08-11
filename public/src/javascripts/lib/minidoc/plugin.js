

export default class Plugin {


  /**
   * Set the parent MiniDoc.
   *
   * @param {MiniMap} minimap
   */
  setDoc(minidoc) {
    this.minidoc = minidoc;
  }


  /**
   * Called when the source element re-flows.
   */
  onResize() {
    // TODO
  }


}
