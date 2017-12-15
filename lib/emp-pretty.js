'use babel';

import { CompositeDisposable } from 'atom';
import {beautify} from './beautify'

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'emp-pretty:toggle': () => this.toggle(1),
      'emp-pretty:toggle1': () => this.toggle(0)
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
    };
  },

  toggle(iFlag) {
    let editor = atom.workspace.getActiveTextEditor();
    beautify(editor).then((sOutput)=>{
        // console.log(sOutput, iFlag);
        if (iFlag) {
            editor.setText(sOutput);
        }
        atom.notifications.addSuccess("Pretty Successed!", {dismissable:false});
    }).catch((err) =>{
        console.error("emp pretty error:",err);
        atom.notifications.addError("Pretty Fail!", {dismissable: false});
    });


  }

};
