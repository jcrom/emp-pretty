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
    console.log('JcTest was toggled!');
    // let re = check_lua();
    // console.log(re);
    beautify(iFlag);
    atom.notifications.addSuccess("Excute Successed!", {dismissable:false})
  }

};
