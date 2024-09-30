import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import { logout } from '../firebase';

export default function ColorModeToggleWrapper(props) {
  const logoutStyle = {
    color: '#4248d6',
    backgroundColor: 'transparent',
    padding: '8px 18px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    textDecoration: 'none',
    border: '2px solid #4248d6',
  };

  const logoutHoverStyle = {
    backgroundColor: 'rgba(66, 72, 214, 0.1)',
  };

  const [hover, setHover] = React.useState(false);

  return (
    <>
      <a
        style={hover ? { ...logoutStyle, ...logoutHoverStyle } : logoutStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => logout(() => window.location.reload())}
      >
        Logout
      </a>
      <ColorModeToggle {...props} />
    </>
  );
}