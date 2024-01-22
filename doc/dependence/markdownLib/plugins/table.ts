/**
 * @description table rules
 * @author 阿怪
 * @date 2022/4/21 16:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { RuleBlock } from 'markdown-it/lib/parser_block';
import StateBlock from 'markdown-it/lib/rules_block/state_block';

function isSpace(code: number) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
}

function getLine(state: StateBlock, line: number) {
  const pos = state.bMarks[line] + state.tShift[line],
    max = state.eMarks[line];

  return state.src.substr(pos, max - pos);
}

function escapedSplit(str: string) {
  const result = [], max = str.length;

  let ch, pos = 0, current = '', lastPos = 0, isEscaped = false;

  ch = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x7c/* | */) {
      if (!isEscaped) {
        // pipe separating cells, '|'
        result.push(current + str.substring(lastPos, pos));
        current = '';
        lastPos = pos + 1;
      } else {
        // escaped pipe, '\|'
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }

    isEscaped = (ch === 0x5c/* \ */);
    pos++;

    ch = str.charCodeAt(pos);
  }

  result.push(current + str.substring(lastPos));

  return result;
}


export const table: RuleBlock = (state, startLine, endLine, silent) => {
  let nextLine, pos, ch, lineText, columns, i, t, tableLines, l, terminate, tbodyLines;
  let token: any;


  // should have at least two lines
  if (startLine + 2 > endLine) { return false; }

  nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) { return false; }

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false; }

  const firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 0x7C/* | */ && firstCh !== 0x2D/* - */ && firstCh !== 0x3A/* : */) { return false; }

  if (pos >= state.eMarks[nextLine]) { return false; }

  const secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 0x7C/* | */ && secondCh !== 0x2D/* - */ && secondCh !== 0x3A/* : */ && !isSpace(secondCh)) {
    return false;
  }

  // if first character is '-', then second character must not be a space
  // (due to parsing ambiguity with list)
  if (firstCh === 0x2D/* - */ && isSpace(secondCh)) { return false; }

  while (pos < state.eMarks[nextLine]) {
    ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) { return false; }

    pos++;
  }

  lineText = getLine(state, startLine + 1);

  columns = lineText.split('|');
  const aligns = [];
  for (i = 0; i < columns.length; i++) {
    t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false; }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false; }
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
  columns = escapedSplit(lineText.trim());
  if (columns.length && columns[0] === '') columns.shift();
  if (columns.length && columns[columns.length - 1] === '') columns.pop();

  // header row will define an amount of columns in the entire table,
  // and align row should be exactly the same (the rest of the rows can differ)
  const columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) { return false; }

  if (silent) { return true; }
  const oldParentType = state.parentType;
  state.parentType = 'wTable' as any;

  const terminatorRules = state.md.block.ruler.getRules('blockquote');


  token = state.push('m_table_open', 'div', 1);
  token.attrs = [['class', 'm-table']];
  token.map = [startLine, 0];

  token = state.push('m_table_header_top_open', 'div', 1);
  token.attrs = [['class', 'm-table-header-img-top']];
  token.map = [startLine, startLine + 1];
  token = state.push('m_table_header_top_close', 'div', -1);

  token = state.push('m_table_header_bottom_open', 'div', 1);
  token.attrs = [['class', 'm-table-header-img-bottom']];
  token.map = [startLine, startLine + 1];
  token = state.push('m_table_header_bottom_close', 'div', -1);

  token = state.push('m_table_warp_open', 'div', 1);
  token.attrs = [['class', 'm-table-wrap']];
  token.map = [startLine, startLine + 1];


  token = state.push('table_open', 'table', 1);
  token.attrs = [['class', 'm-table-inner']];
  token.map = tableLines = [startLine, startLine + 1];

  token = state.push('thead_open', 'thead', 1);
  token.attrs = [['class', 'm-thead']];
  token.map = [startLine, startLine + 1];

  token = state.push('tr_open', 'tr', 1);
  token.attrs = [['class', 'm-tr']];
  token.map = [startLine, startLine + 1];

  for (i = 0; i < columns.length; i++) {
    token = state.push('th_open', 'th', 1);
    token.attrs = [['class', 'm-th']];
    if (aligns[i]) {
      token.attrs = [['style', 'text-align:' + aligns[i]]];
    }

    token = state.push('inline', '', 0);
    token.content = columns[i].trim();
    token.children = [];

    token = state.push('th_close', 'th', -1);
  }

  token = state.push('tr_close', 'tr', -1);
  token = state.push('thead_close', 'thead', -1);

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) { break; }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) { break; }
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === '') columns.shift();
    if (columns.length && columns[columns.length - 1] === '') columns.pop();

    if (nextLine === startLine + 2) {
      token = state.push('tbody_open', 'tbody', 1);
      token.attrs = [['class', 'm-tbody']];
      token.map = tbodyLines = [startLine + 2, 0];
    }

    token = state.push('tr_open', 'tr', 1);
    token.attrs = [['class', 'm-tr']];
    token.map = [nextLine, nextLine + 1];

    for (i = 0; i < columnCount; i++) {
      token = state.push('td_open', 'td', 1);
      token.attrs = [['class', 'm-td']];
      if (aligns[i]) {
        token.attrs = [['style', 'text-align:' + aligns[i]]];
      }

      token = state.push('inline', '', 0);
      token.content = columns[i] ? columns[i].trim() : '';
      token.children = [];

      token = state.push('td_close', 'td', -1);
    }

    token = state.push('m_table_tbody_img_open', 'td', 1);
    token.attrs = [['class', 'm-table-tbody-img']];
    token.map = [nextLine, nextLine + 1];
    token = state.push('m_table_tbody_img_close', 'td', -1);

    token = state.push('tr_close', 'tr', -1);
  }

  if (tbodyLines) {
    token = state.push('tbody_close', 'tbody', -1);
    tbodyLines[1] = nextLine;
  }

  token = state.push('table_close', 'table', -1);
  token = state.push('m_table_warp_close', 'div', -1);

  token = state.push('m_table_border_bottom_open', 'div', 1);
  token.attrs = [['class', 'm-table-border-img-bottom']];
  token.map = [nextLine, nextLine + 1];
  token = state.push('m_table_border_bottom_close', 'div', -1);

  token = state.push('m_table_close', 'div', -1);
  tableLines[1] = nextLine;

  state.parentType = oldParentType;
  state.line = nextLine;
  return true;
};
