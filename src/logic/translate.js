import katex from 'katex';
import showdown from 'showdown';

const converter = new showdown.Converter();

function translate(input) {
  const equations = {};

  input = input.replace(/\$\^\$([\s\S]*?)\$\^\$/g, (_, stuff) => {
    let newCode = Math.random();
    let res;
    try {
      res = katex.renderToString(stuff, { displayMode: true, throwOnError: false });
    } catch (e) {
      res = `<span style="color: red;">${stuff}</span>`;
    }

    equations[newCode] = res;

    return newCode;
  }).replace(/\$\$([\s\S]*?)\$\$/g, (_, stuff) => {
    let newCode = Math.random();
    let res;
    try {
      res = katex.renderToString(stuff, { displayMode: false, throwOnError: false });
    } catch (e) {
      res = `<span style="color: red;">${stuff}</span>`;
    }

    equations[newCode] = res;

    return newCode;
  });

  let result = converter.makeHtml(input);

  Object.keys(equations).forEach((key) => {
    result = result.replace(key, equations[key]);
  });

  return result;
}

export default translate;