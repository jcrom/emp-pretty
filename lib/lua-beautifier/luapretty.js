'use babel';

const DEFAULT_INDENT = '    ';

export default {
    luapretty(sText, sIndent, oOptions = {}) {
        let sEOL = oOptions.eol || '\n';
        sIndent = sIndent || DEFAULT_INDENT;
        let $currIndent = 0,
            $nextIndent = 0,
            $prevLength = 0,
            $extIndent  = 0,
            $lastIndent = 0,
            $template   = 0;
        sText.split(/\r?\n/g).map((sLine, iLineNum) =>{
            let $template_flag = false;
            if ($template){
                let aRes = sLine.match(/\](=*)\]/)
                if (aRes && ($template === aRes[1].length + 1)){
                    $template_flag = true;
                    if ($template && (!/]=*]$/.test(sLine))){
                        let aTmpArr = sLine.split(/\]=*\]/, 2)
                        let sComment = aTmpArr[0];
                        let sCode = aTmpArr[1];
                        sLine = sComment + ']' + '='.repeat($template - 1) +']' + adjust_space(sCode)
                    }
                }
            }
        });

    }
}

let adjust_space = (sLine) => {
    let sStrList = sLine.match(/(['"])[^\1]*?\1/g),
        sMuliString = sLine.match(/\[(=*)\[([^\]\1\]]*)/),
        sComment = sLine.match(/\-{2}[^\[].*$/);
    sLine = sLine.replace(/\s+/g, ' ');
    // replace all whitespaces inside the string with one space, WARNING: the whitespaces in string will be replace too!
    sLine = sLine.replace(/\s?(==|>=|<=|~=|[=><\+\*\/])\s?/g, ' $1 ');
    // add whitespace around the operator
    sLine = sLine.replace(/([^=e\-\(\s])\s?\-\s?([^\-\[])/g, '$1 - $2');
    sLine = sLine.replace(/([^\d])e\s?\-\s?([^\-\[])/g, '$1e - $2');
    // just format minus, not for -- or negative number or commentary.
    sLine = sLine.replace(/,([^\s])/g, ', $1');
    // adjust ','
    sLine = sLine.replace(/\s+,/g, ',');
    // recover the whitespaces in string.
    sLine = sLine.replace(/(['"])[^\1]*?\1/g, () => sStrList.shift());

}
