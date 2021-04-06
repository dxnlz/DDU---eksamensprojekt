import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, Divider } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import styles from '../styles/Header.module.scss'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

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
class MenuItem extends React.Component<ItemProps> {
  render() {
    const buttonDisabled = this.props.path == this.props.url;
    return (
      <Link href={this.props.url} passHref>
        <Button className={styles.menuitem} color={buttonDisabled? "inherit": "primary"} disableElevation variant="outlined" >{this.props.text}</Button>
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
}

class Header extends Component<HeaderProps> {
  render() {
    const inputstyles = this.props.inputstyles;
    return (
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TitleItem text="Web Shop" url="/index" />
            <Divider orientation="vertical" flexItem style={{backgroundColor: "#ffffff00", marginLeft: "0.5rem",marginRight: "0.5rem"}}></Divider>
            <MenuItem text="Products" url="/products" path={this.props.path} />
            <MenuItem text="Search" url="/search" path={this.props.path}/>
            <MenuItem text="Admin" url="/admin" path={this.props.path} />
          </div>
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
        </Toolbar>
      </AppBar>
    )
  }
}

export default (props: HeaderProps) => <Header inputstyles={createInputStyles()} {...props} />;
