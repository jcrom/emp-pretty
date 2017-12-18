'use babel';

const DEFAULT_INDENT = '    ';

export default {
    luapretty(sText, sIndent, oOptions = {}) {
        let sEOL = oOptions.eol || '\n';
        sIndent = sIndent || DEFAULT_INDENT;
        let $currIndent = 0,
            $nextIndent = 0,
            $prevLength = 0,
            $extIndent = 0,
            $lastIndent = 0,
            $template = 0;
        let aRe = sText.split(/\r?\n/g).map((sLine, iLineNum) => {
            let $template_flag = false;
            if ($template) {
                let aRes = sLine.match(/\](=*)\]/)
                if (aRes && ($template === aRes[1].length + 1)) {
                    $template_flag = true;
                    if ($template && (!/]=*]$/.test(sLine))) {
                        let aTmpArr = sLine.split(/\]=*\]/, 2)
                        let sComment = aTmpArr[0];
                        let sCode = aTmpArr[1];
                        sLine = sComment + ']' + '='.repeat($template - 1) + ']' + adjust_space(sCode);
                        $template = 0;
                    }
                    $template = 0;
                } else {
                    return sLine
                }
            }
            let aResStart = sLine.match(/\[(=*)\[/);
            if (aResStart) {
                $template = aResStart[1].length + 1;
            }

            if ($template_flag) {
                sLine = sLine.trim();
                sLine = adjust_space(sLine);
            }

            if (!sLine.length) {
                return '';
            }

            let sRawLine = sLine;
            sLine = sLine.replace(/(['"])[^\1]*?\1/, '');
            // remove all quoted fragments for proper bracket processing
            sLine = sLine.replace(/\s*--.+/, '');
            // remove all comments; this ignores long bracket style comments

            if ((/^((local )?function|repeat|while)\b/).test(sLine) &&
                (!/\bend\s*[\),;]*$/).test(sLine) ||
                (/\b(then|do)$/).test(sLine) &&
                (!/^elseif\b/).test(sLine) ||
                (/^if\b/).test(sLine) &&
                (/\bthen\b/).test(sLine) &&
                (!/\bend$/).test(sLine) ||
                (/\bfunction ?(?:\w+ )?\([^\)]*\)$/).test(sLine) &&
                (!/\bend$/).test(sLine)
            ) {
                $nextIndent = $currIndent + 1;
            } else if ((/^until\b/).test(sLine) ||
                (/^end\s*[\),;]*$/).test(sLine) ||
                (/^end\s*\)\s*\.\./).test(sLine) ||
                (/^else(if)?\b/).test(sLine) &&
                (/\bend$/).test(sLine)
            ) {
                $nextIndent = --$currIndent;
            } else if ((/^else\b/).test(sLine) ||
                (/^elseif\b/).test(sLine)) {
                $nextIndent = $currIndent;
                $currIndent = $currIndent - 1;
            }
            let $brackets = (sLine.match(/\(/g) || []).length -
                ((sLine.match(/\)/g) || []).length);
            // capture unbalanced brackets
            let $curly = (sLine.match(/\{/g) || []).length -
                ((sLine.match(/\}/g) || []).length);
            // capture unbalanced curly brackets
            // close (curly) brackets if needed
            if ($curly < 0) {
                $currIndent += $curly;
            }
            if ($brackets < 0) {
                $currIndent += $brackets;
            }
            $nextIndent += $brackets + $curly;
            // console.log({last: $lastIndent, curr: $currIndent,
            // next: $nextIndent, ext: $extIndent})

            if ($currIndent - $lastIndent > 1) {
                $extIndent += $nextIndent - $lastIndent - 1;
                $nextIndent = $currIndent = 1 + $lastIndent;
            }

            if ($currIndent - $lastIndent < -1 && $extIndent > 0) {
                $extIndent += $currIndent - $lastIndent + 1;
                $currIndent = -1 + $lastIndent;
            }

            if ($nextIndent < $currIndent) {
                $nextIndent = $currIndent;
            }

            let sNewLine = "";
            if (sRawLine.length && $currIndent > 0 && !$template_flag) {
                sNewLine = sIndent.repeat($currIndent)
            } else {
                sNewLine = '';
            }
            sNewLine += sRawLine;

            $useful = $prevLength > 0 || sRawLine.length > 0;
            $lastIndent = $currIndent;
            $currIndent = $nextIndent;
            $prevLength = sRawLine.length;
            return sNewLine || undefined;

        });
        return aRe.join(sEOL);
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
    if (sMuliString && sMuliString[0]) {
        sLine = sLine.replace(/\[(=*)\[([^\]\1\]]*)/, sMuliString[0]);
    }
    if (sComment && sComment[0]) {
        sLine = sLine.replace(/\-{2}[^\[].*$/, sComment[0]);
    }
    return sLine;

}
