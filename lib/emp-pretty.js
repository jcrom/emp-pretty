'use babel';

import EmpPrettyView from './emp-pretty-view';
import { CompositeDisposable } from 'atom';

export default {

  empPrettyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.empPrettyView = new EmpPrettyView(state.empPrettyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.empPrettyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'emp-pretty:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.empPrettyView.destroy();
  },

  serialize() {
    return {
      empPrettyViewState: this.empPrettyView.serialize()
    };
  },

  toggle() {
    console.log('EmpPretty was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
