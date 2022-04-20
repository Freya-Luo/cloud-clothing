import './button.scss';

const Button = ({ children, isThirdPartyLogin, ...restProps }) => (
 <button className={`${isThirdPartyLogin ? 'third-party-login' : ''} button`} {...restProps}>
  {children}
 </button>
);

export default Button;
