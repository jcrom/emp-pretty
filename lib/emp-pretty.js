'use babel';

import { CompositeDisposable } from 'atom';
import {beautify} from './beautify';
import testw from './test';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'emp-pretty:toggle': () => this.toggle(1),
      'emp-pretty:toggle1': () => this.toggle(0),
      'emp-pretty:test': () => this.test()
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
        // console.error("emp pretty error:",err);
        console.error(err);
        atom.notifications.addError("Pretty Fail!", {dismissable: false});
    });


    },

    test() {
        // test.test2();
        // test.test4();
        // test.test();
        new testw();
        // console.log(test.test3);
    }

};
