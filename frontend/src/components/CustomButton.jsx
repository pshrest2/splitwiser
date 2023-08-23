import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const dict = {
  primary: {
    color: '#000',
    backgroundColor: '#e2ba6b',
    hoverColor: '#000',
    hoverBackgroundColor: '#ffb775',
  },
  secondary: {
    color: '#000',
    backgroundColor: '#bbbbbb',
    hoverColor: '#000',
    hoverBackgroundColor: '#b1b1b1',
  },
  success: {
    color: '#000',
    backgroundColor: '#90BE6D',
    hoverColor: '#000',
    hoverBackgroundColor: '#a1d679',
  },
};

const StyledButton = styled.button`
  background-color: ${(props) => dict[props.variant].backgroundColor};
  border: none;
  color: ${(props) => dict[props.variant].color};
  padding: 11px;
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.shadow ? '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' : 'none'};
  &:hover {
    color: ${(props) => dict[props.variant].hoverColor};
    background-color: ${(props) => dict[props.variant].hoverBackgroundColor};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${(props) => dict[props.variant].color};
    background-color: ${(props) => dict[props.variant].backgroundColor};
  }
`;

const CustomButton = ({
  children,
  onClick,
  shadow,
  disabled,
  variant,
  type,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      shadow={shadow}
      disabled={disabled}
      variant={variant}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  shadow: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  type: PropTypes.string,
};

CustomButton.defaultProps = {
  shadow: false,
  disabled: false,
  variant: 'primary',
  type: 'button',
  onClick: () => {},
};
