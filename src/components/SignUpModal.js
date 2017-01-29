import React, { Component } from 'react';
import { Button, Dialog, EditableText, Intent, MenuItem, Menu, MenuDivider, Popover, Position } from '@blueprintjs/core';

class SignUpModal extends Component {
  render () {
    return <Dialog
      iconName="inbox"
      isOpen={this.props.isOpen}
      onClose={this.props.closeDialog}
      title="Dialog header"
    >
      <div className="pt-dialog-body">
        Some content
      </div>
      <div className="pt-dialog-footer">
        <div className="pt-dialog-footer-actions">
          <Button text="Secondary" />
          <Button
            intent={Intent.PRIMARY}
            onClick={this.props.closeDialog}
            text="Primary"
          />
        </div>
      </div>
    </Dialog>

  }
}

export default SignUpModal;