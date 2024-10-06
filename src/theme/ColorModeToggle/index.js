import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../firebase';

export default function ColorModeToggleWrapper(props) {
  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const logoutStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4248d6',
    backgroundColor: 'transparent',
    padding: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    border: '1px solid #4248d6',
    width: '36px',
    height: '36px',
  };

  const logoutHoverStyle = {
    backgroundColor: '#4248d6',
    color: 'white',
  };

  const [hover, setHover] = React.useState(false);

  return (
    <div style={wrapperStyle}>
      <button
        style={hover ? { ...logoutStyle, ...logoutHoverStyle } : logoutStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => logout(() => window.location.reload())}
        aria-label="Logout"
        title="Logout"
      >
        <FiLogOut size={20} />
      </button>
      <ColorModeToggle {...props} />
    </div>
  );
}