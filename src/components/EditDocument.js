import React, { Component } from 'react';
import { Button, Dialog, EditableText, Intent, MenuItem, Menu, MenuDivider, Popover, Position } from '@blueprintjs/core';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'katex/dist/katex.min.css';

import MenuBar from './MenuBar'
import translate from '../logic/translate'

class EditDocument extends Component {

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
            <EditableText value={this.props.title} onChange={(v) => this.props.changeTitle(v)} placeholder="Untitled document" />
          </h2>
        </div>
        <MenuBar />

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
            <div className="preview-contents" dangerouslySetInnerHTML={this.htmlValue()} />
          </div>
        </div>

      </div>
    );
  }
}

export default EditDocument;