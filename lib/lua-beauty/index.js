'use babel';

import {parse} from 'luaparse';
import comments from './comments';
import options from './options';
import {buildDocFromAst} from './printer';
import options2 from './options';

let defaultOptions = options.defaultOptions;


export default function luapretty(oOptions) {
    console.log(oOptions);
    let sText = oOptions.source,
        indent = oOptions.inlevel,
        tab = getTab(oOptions);

    const ast = parse(sText, {
        comments: true,
        locations: true,
        ranges: true,
        luaVersion: '5.1'
    })
    console.log(ast);
    ast.range[0] = 0;
    ast.range[1] = sText.length;
    const oMergedOptions = Object.assign({}, options.defaultOptions, oOptions);
    const oReOption = Object.assign({}, oMergedOptions, { sourceText: sText });
    comments.injectShebang(ast, oReOption);
    comments.attachComments(ast, oReOption);
    const doc = buildDocFromAst(ast, oReOption);
    console.log(doc);

    return sText;
}

let getTab = (oOptions)=>{
    let aa = oOptions.inchar,
        bb = oOptions.insize,
        cc = [];
    for (bb = bb; bb > 0; bb = bb - 1) {
        cc.push(aa);
    }
    return cc.join("");
}
