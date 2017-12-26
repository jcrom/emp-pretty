'use babel';

import luabeautifier from './beautifier';
import {luapretty} from './luapretty';
import {formatText} from 'lua-fmt';
import {lua_beauty} from '../lua-beauty';
import path from 'path';

let iTabLen = atom.config.get('editor.tabLength'),
    bSoftTabs = atom.config.get('editor.softTabs'),
    iUnsoftTabLen = 1;

let getDafaultIndentSize = () => {
    if (bSoftTabs) {
        return iTabLen;
    } else {
        return iUnsoftTabLen;
    }

}

let getDefaultIndentChar = () => {
    if (bSoftTabs) {
        return " ";
    } else {
        return "\t";
    }
}

let sDefIndentChar = getDefaultIndentChar(),
    iDefIndentSize = getDafaultIndentSize(),
    sDefIndent = sDefIndentChar.repeat(iDefIndentSize);

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

// scope = lang.scope
// tabLength = atom?.config.get('editor.tabLength', scope: scope) ? 4
// softTabs = atom?.config.get('editor.softTabs', scope: scope) ? true
// defaultIndentSize = (if softTabs then tabLength else 1)
// defaultIndentChar = (if softTabs then " " else "\t")
// defaultIndentWithTabs = not softTabs
// if _.has(lang, "properties.indent_size")
//   _.set(lang, "properties.indent_size.default", defaultIndentSize)
// if _.has(lang, "properties.indent_char")
//   _.set(lang, "properties.indent_char.default", defaultIndentChar)
// if _.has(lang, "properties.indent_with_tabs")
//   _.set(lang, "properties.indent_with_tabs.default", defaultIndentWithTabs)
// if _.has(lang, "properties.wrap_attributes_indent_size")
//   _.set(lang, "properties.wrap_attributes_indent_size.default", defaultIndentSize)
let getExtention = (sFileName) => {
    if (sFileName) {
        return path.extname(sFileName).substr(1);
    }

}

export default {
    luabeautify(sText) {
        let sEOL = getDefLineEnd('\r\n', '\n');
        console.log(sEOL);
        if (!iTabLen) {
            iTabLen = 4;
        }

        // (str, indent, warn_fn, opts = {})


        // let sRes = luabeautifier(sText, sDefIndent, {
        //     eol: sEOL
        // });
        // let sRes = luapretty(sText, sDefIndent, {
        //     eol: sEOL
        // });

        let sRes = formatText(sText);

        // console.log(sRes);
        return sRes;
    }

}
