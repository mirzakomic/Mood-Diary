import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  onClick, 
  disabled, 
  variant, 
  size, 
  shape, 
  href, 
  type 
}) => {
  const baseClass = 'inline-flex items-center justify-center font-medium transition duration-300';
  const variantMap = {
      secondary: 'bg-secondary text-white hover:bg-gray-600',
      tertiary: 'bg-tertiary-500 text-white hover:bg-blue-700',
  };
  const variantClass = variantMap[variant] || 'bg-primary text-lightBabyBlue  hover:bg-secondary hover:text-primary';
  const sizeClass = size === 'big' 
    ? 'py-3 px-6 text-lg' 
    : 'py-2 px-4 text-sm';
  const shapeClass = shape === 'round' 
    ? 'rounded-full' 
    : 'rounded-md';
  const disabledClass = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';

  const classNames = `${baseClass} ${variantClass} ${sizeClass} ${shapeClass} ${disabledClass}`.trim();

  if (href) {
    return (
      <Link to={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={classNames} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'big']),
  shape: PropTypes.oneOf(['round', 'square']),
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  variant: 'primary',
  size: 'small',
  shape: 'square',
  href: null,
  type: 'button',
};

export default Button;