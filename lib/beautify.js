"use babel";
// import prettydiff from '/work/code/ide/atom/package/prettydiff/prettydiff.js'
// import prettydiff from 'prettydiff2'
// import prettydiff from 'prettydiff';
import {
    luapretty
} from './lua-beautifier';


export default {
    beautify(editor) {
        console.log("start -----");
        return new Promise(function(resolve, reject) {
            try {
                // Get current editor

                // Check if there is an active editor
                if (!editor) {
                    reject(new Error("Active Editor not found. ",
                        "Please select a Text Editor first to beautify."));
                }

                let editorText = editor.getText(),
                    sOutput = editorText;
                // let prettydiff = require("prettydiff"),

                let sGrammarName = editor.getGrammar().name;

                switch (sGrammarName) {
                    case "Emp View":
                        sOutput = emppretty(editorText);
                        break;
                    case "Lua":
                        console.log("Lua lan ----------");
                        sOutput = luapretty(editorText);
                        break;
                    default:
                        console.log("Else Lan ------------");
                }
                // console.log("do prettydiff");

                // console.log(output);
                resolve(sOutput);

            } catch (e) {
                console.error(e);
                reject();
            }
            // console.log(prettydiff);
            // isSelection = !!editor.getSelectedText()
        });
    }

}

let emppretty = (editorText) => {
    let args = {
        'source': editorText,
        'mode': "beautify",
        'lang': "xml",
        'empview': true
    };
    // console.log("do prettydiff");
    // return prettydiff(args);
    return editorText;
}


let showError = (error) => {
    console.log(error);
    let oStack = error.stack;
    let sDetail = error.description || error.message;
    atom.notifications.addError(error.message, {
        stack,
        detail,
        dismissable: false
    })
}
