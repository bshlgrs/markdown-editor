import React, { Component } from 'react';
import { EditableText, Position, Toaster } from '@blueprintjs/core';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'katex/dist/katex.min.css';

import MenuBar from './MenuBar'
import translate from '../logic/translate'


const OurToaster = Toaster.create({
  className: "my-toaster",
  position: Position.TOP_RIGHT,
});

class EditDocument extends Component {
  constructor (props) {
    super(props);
    this.state = {
      display: "rendered-html"
    }
  }
  onChange(newValue) {
    this.props.changeContents(newValue);
  }

  htmlValue() {
    return {
      __html: translate(this.props.contents)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            <EditableText
              value={this.props.title}
              onChange={(v) => this.props.changeTitle(v)}
              placeholder="Untitled document"
              onConfirm={(v) => OurToaster.show({ message: `Document renamed to ${v}!` })}
            />
          </h2>
        </div>
        <MenuBar display={this.state.display} setDisplay={(v) => this.setState({ display: v })}/>

        <div className="row">
          <AceEditor
            mode="markdown"
            theme="github"
            onChange={(val) => this.onChange(val)}
            name="ace-div"
            width="50%"
            height="auto"
            wrapEnabled={true}
            editorProps={{$blockScrolling: true}}
            value={this.props.contents}
          />
          <div className="preview">
            {this.state.display == "rendered-html" && <div className="preview-contents" dangerouslySetInnerHTML={this.htmlValue()} />}
            {this.state.display == "raw-html" && <div className="preview-contents">
              {this.htmlValue().__html.split("\n").map((x, idx) => <p key={idx}>{x}</p>)}
            </div>}
          </div>
        </div>

      </div>
    );
  }
}

export default EditDocument;