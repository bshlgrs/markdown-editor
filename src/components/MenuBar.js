import React, { Component } from 'react';
import { Button, Dialog, EditableText, Intent, MenuItem, Menu, MenuDivider, Popover, Position } from '@blueprintjs/core';
import SignUpModal from './SignUpModal';

class MenuBar extends Component {
  constructor (props) {
    super(props);
    this.state = { showingSignUpModal: false };
  }

  render () {
    const fileMenu = <Menu>
      <MenuItem text="New" />
      <MenuItem text="Open" />
      <MenuItem text="Save" />
      <MenuDivider />
      <MenuItem text="Download">
        <MenuItem text="PDF" />
        <MenuItem text="HTML" />
        <MenuItem text="Markdown" />
        <MenuItem text="LaTeX" />
        <MenuDivider />
        <MenuItem text="View HTML as modal" />
      </MenuItem>
      <MenuDivider />
      <MenuItem text="Settings..." iconName="cog" />
    </Menu>;

    const helpMenu = <Menu>
      <MenuItem
        text="Help with Markdown" />
      <MenuItem
        text="Help with LaTeX" />
      <MenuItem
        text="Help with this editor" />
      <MenuDivider />
      <MenuItem text="About this editor" />
    </Menu>;

    return <div className="menubar">
      <Popover content={fileMenu} position={Position.BOTTOM_LEFT}>
        <Button  text="File" />
      </Popover>
      <Popover content={fileMenu} position={Position.BOTTOM_LEFT}>
        <Button  text="Edit" />
      </Popover>
      <Popover content={fileMenu} position={Position.BOTTOM_LEFT}>
        <Button  text="Insert" />
      </Popover>
      <Popover content={helpMenu} position={Position.BOTTOM_LEFT}>
        <Button  text="Help" />
      </Popover>
      <Button onClick={() => this.setState({ showingSignUpModal: true })} text="Sign in" />

      <SignUpModal isOpen={this.state.showingSignUpModal} closeDialog={() => this.setState({ showingSignUpModal: false })}/>
    </div>;
  }
}

export default MenuBar;