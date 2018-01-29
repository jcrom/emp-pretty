"use babel";
// import prettydiff from '/work/code/ide/atom/package/prettydiff/prettydiff.js'
// import prettydiff from 'prettydiff2'
import prettydiff from './emp-prettydiff';
// import luabeauty from './lua-beauty';
// import {luabeautify} from './lua-beautifier';


export default {
    beautify(editor) {
        console.log("start -----");
        return new Promise(function(resolve, reject) {
            // Get current editor

            // Check if there is an active editor
            if (!editor) {
                throw(new Error("Active Editor not found. ",
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
                case "Erlang":
                    console.log("erlang pretty");
                    sOutput = editorText;
                    break;
                case "CSS":
                    console.log("css lan ----------");
                    sOutput = elsepretty(editorText, "css");
                    break;

                case "LESS":
                    console.log("less lan ----------");
                    sOutput = elsepretty(editorText, "less");
                    break;

                case "HTML":
                    console.log("html lan ----------");
                    sOutput = elsepretty(editorText, "html");
                    break;

                case "JavaScript":
                    console.log("javascript lan ----------");
                    sOutput = elsepretty(editorText, "javascript");
                    break;

                case "XML":
                    console.log("XML lan ----------");
                    sOutput = elsepretty(editorText, "XML");
                    break;

                case "JSON":
                    console.log("json lan ----------");
                    sOutput = elsepretty(editorText, "json");
                    break;

                default:

                    console.log("Else Lan ------------");
                    elsepretty(editorText, "auto")
            }
            // console.log("do prettydiff");
            // console.log(output);
            resolve(sOutput);

            // console.log(prettydiff);
            // isSelection = !!editor.getSelectedText()
        });
    }

}

let getDefLineEnd = (crlf, lf) => {
    let sEOL = atom.config.get('line-ending-selector.defaultLineEnding');
    switch (sEOL) {
        case "LF":
            console.log("LF");
            return lf;
            break;
        case "CRLF":
            return crlf;
            break;
        case "OS Default":
            console.log("os def");
            if (process.platform == "win32") {
                return crlf;
            } else {
                return lf
            }
        default:
            console.log("default ----");
            return lf;

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
    // console.log(prettydiff);
    return prettydiff(args);

}

let luapretty = (editorText) => {
    let args = {
        'source': editorText,
        'mode': "beautify",
        'lang': "lua",
        'empview': true
    };
    // console.log("do prettydiff");
    // console.log(prettydiff);
    return prettydiff(args);
    // return luabeauty(args);
}

let elsepretty = (editorText, lang) => {
    let args = {
        'source': editorText,
        'mode': "beautify",
        'lang': lang,
        'empview': false
    };
    // console.log("do prettydiff");
    // console.log(prettydiff);
    return prettydiff(args);
    // return luabeauty(args);
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
