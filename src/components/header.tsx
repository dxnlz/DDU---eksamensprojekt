import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, Divider, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, Search } from '@material-ui/icons';
import styles from '../styles/Header.module.scss'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import Link from 'next/link'
import Router from 'next/router';
import { IProfileStatus } from '../lib/auth_helper';

const createInputStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

interface ItemProps {
  text: string;
  url: string;
  path?: string;
}
class BarItem extends React.Component<ItemProps> {
  render() {
    const buttonDisabled = this.props.path == this.props.url;
    return (
      <Link href={this.props.url} passHref>
        <Button className={styles.menuitem} color={buttonDisabled ? "inherit" : "primary"} disableElevation variant="outlined" >{this.props.text}</Button>
      </Link>
    );
  }
}

class TitleItem extends React.Component<ItemProps> {
  render() {
    return (
      <Link href={this.props.url} passHref>
        <Button className={styles.title} color="inherit" >
          <Typography variant="h5">{this.props.text}</Typography>
        </Button>
      </Link>
    );
  }
}


interface HeaderProps {
  path: string;
  inputstyles?: any;
  profile: IProfileStatus;
}

class Header extends Component<HeaderProps> {
  onLogout = (popupState: any) => {
    popupState.close();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Router.push("/")
  }

  onLogin = (popupState: any) => {
    popupState.close();
    Router.push("/login")
  }

  onSignup = (popupState: any) => {
    popupState.close();
    Router.push("/signup")
  }

  loggedInMenu = (popupState: any) => 
    [
      <div key="name" style={{ flex: 1, alignItems: "center", display: "flex", gap: 4, marginBottom: 8, marginLeft: 8, marginRight: 8 }}>
        <AccountCircle /> {this.props.profile.username}
          </div>,
      <Divider key="divider"></Divider>,
      <Link href="/account" passHref>
        <MenuItem key="account" onClick={popupState.close}>Account</MenuItem>
      </Link>,
      <MenuItem key="logout" onClick={() => this.onLogout(popupState)}>Log out</MenuItem>
    ]
  

  loggedOutMenu = (popupState: any) => [
      <MenuItem key="login" onClick={() => this.onLogin(popupState)}>Log in</MenuItem>,
      <MenuItem key="signup" onClick={() => this.onLogout(popupState)}>Sign up</MenuItem>
    ]
  

  render() {
    const inputstyles = this.props.inputstyles;
    return (
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TitleItem text="Web Shop" url="/index" />
            <Divider orientation="vertical" flexItem style={{ backgroundColor: "#ffffff00", marginLeft: "0.5rem", marginRight: "0.5rem" }}></Divider>
            <BarItem text="Products" url="/products" path={this.props.path} />
            {this.props.profile.isAdmin? <BarItem text="Admin" url="/admin" path={this.props.path} /> : <></>}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={inputstyles.search}>
              <div className={inputstyles.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: inputstyles.inputRoot,
                  input: inputstyles.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={(ev) => {
                  console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    window.location.href = '/search'
                  }
                }}
              />
            </div>
            <PopupState variant="popover" popupId="popup-menu">
              {(popupState) => <>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    style={{ marginLeft: "1rem" }}
                    {...bindTrigger(popupState)}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu {...bindMenu(popupState)}>
                    {this.props.profile.isLoggedIn ? this.loggedInMenu(popupState) : this.loggedOutMenu(popupState)}
                  </Menu>
                  </>
              }
            </PopupState>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

const HeaderHydrated = (props: HeaderProps) => <Header inputstyles={createInputStyles()} {...props} />;
export default HeaderHydrated;
