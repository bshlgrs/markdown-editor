import katex from 'katex';
import showdown from 'showdown';
import jsyaml from 'js-yaml';

const converter = new showdown.Converter();

function translate(input) {
  const markdownSkippedSections = {};
  let frontMatter = null;

  let replacements = [
    [/\$\^\$([\s\S]*?)\$\^\$/g, (x) => {
      try {
        return katex.renderToString(x, { displayMode: true, throwOnError: false });
      } catch (e) {
        return `<span style="color: red;">${x}</span>`;
      }
    }],
    [/\$\$([\s\S]*?)\$\$/g, (x) => {
      try {
        return katex.renderToString(x, { displayMode: false, throwOnError: false });
      } catch (e) {
        return `<span style="color: red;">${x}</span>`;
      }
    }],
    [/^---$([\s\S]*?)^---$/gm, (x) => {
      if (frontMatter === null) {
        frontMatter = jsyaml.safeLoad(x);
      }
      return '';
    }]
  ];

  let result = input;

  replacements.forEach((x) => {
    let [regex, f] = x;
    result = result.replace(regex, (_, stuff) => {
      let newCode = Math.random();
      markdownSkippedSections[newCode] = f(stuff);
      return newCode;
    });
  });

  result = converter.makeHtml(result);

  Object.keys(markdownSkippedSections).forEach((key) => {
    result = result.replace(key, markdownSkippedSections[key]);
  });

  return (frontMatter ? `<h1>${frontMatter.title}</h1>` : '') + result;
}

export default translate;