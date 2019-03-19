import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import "../SimpleMenu/SimpleMenu.css";
// import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{color: 'white'}}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Button color="inherit" id="buttonText" onClick={this.handleClose} href="/">VA Pension Estimator</Button>
          <Button color="inherit" id="buttonText" onClick={this.handleClose} href="/questions">Begin Questionnaire</Button>
          <Button color="inherit" id="buttonText" onClick={this.handleClose} href="/about">About the Team</Button>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;