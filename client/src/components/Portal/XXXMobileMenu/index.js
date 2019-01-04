import React, { Component } from 'react';
import { MenuLink } from '../Menu/Link';
import SubHeader from '../SubHeader';

class MobileMenu extends Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen:false,
    }
  }

  handleMenuClick() {
    this.setState({menuOpen:!this.state.menuOpen});
  }

  handleLinkClick() {
    this.setState({menuOpen: false});
  }

  render(){
    const styles=
      {
        container:{
          position: 'absolute',
          top: '180px',
          left: 0,
          zIndex: '99',
          opacity: 0.9,
          display:'flex',
          alignItems:'center',
          width: '100%',
          color: 'white'
        },
        logo: {
          margin: '0 auto',
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          filter: this.state.menuOpen ? 'blur(2px)':null,
          transition: 'filter 0.5s ease',
        },
      }

    const { status, content } = this.props;

    return(
      <div className='mobile-menu'>
        <div style={styles.container}>
            <MenuIcon
                open={this.state.menuOpen}
                onClick={()=>this.handleMenuClick()}
            />
            <SubHeader {...this.props} />
        </div>
        <Menu open={this.state.menuOpen}>
            { content.map(({ name, route, defaultChildRoute }) => {
                // do not create class/materials links if exchange status is not confirmed
                if ((route === 'materials') && status !== 'confirmed') return
                return (
                    <MenuLink
                        name={name}
                        route={route}
                        defaultChildRoute={defaultChildRoute}
                        key={name} {...this.props}
                    />
                )
            })}
        </Menu>
        <div style={styles.body}>
        </div>
      </div>
    )
  }
}

/* Menu.jsx */
class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }

  render(){
    const styles={
      container: {
        top: '180px',
        left: 0,
        height: this.state.open? '34%': 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: '#f7f7f7',
        opacity: 0.95,
        color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 2,
      },
      menuList: {
        paddingTop: '3rem',
      }
    }
    return(
      <div style={styles.container}>
        {
          this.state.open?
            <div style={styles.menuList}>
              {this.props.children}
            </div>:null
        }
      </div>
    )
  }
}

class MenuIcon extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
      color: 'black',
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }

  handleClick(){
  this.setState({open:!this.state.open});
  }

  render(){
    const styles = {
      container: {
        height: '32px',
        width: '32px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
      },
      line: {
        height: '2px',
        width: '20px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
      },
      lineMiddle: {
        opacity: this.state.open ? 0: 1,
        transform: this.state.open ? 'translateX(-16px)':'none',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '5px',
      },
    }
    return(
      <div style={styles.container}
        onClick={this.props.onClick ? this.props.onClick:
          ()=> {this.handleClick();}}>
        <div style={{...styles.line,...styles.lineTop}}/>
        <div style={{...styles.line,...styles.lineMiddle}}/>
        <div style={{...styles.line,...styles.lineBottom}}/>
      </div>
    )
  }
}

export default MobileMenu;
