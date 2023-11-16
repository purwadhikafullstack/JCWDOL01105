import { UserCircle } from '@phosphor-icons/react';

const Login = () => {
  return (
    <div className="absolute end-3 top-3">
      <button className="btn-login">
        <UserCircle size={32} />
      </button>
    </div>
  );
};

export default Login;
