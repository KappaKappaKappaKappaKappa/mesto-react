import "./styles/Login.css";

function Login() {
  return (
      <section className="login-register">
        <h2 className="login-register__title">Вход</h2>
        <form className="login-register__form">
          <input className="login-register__input" placeholder="E-mail" />
          <input className="login-register__input" placeholder="Пароль" />
          <button className="login-register__submit-btn">Войти</button>
        </form>
      </section>
  );
}

export default Login;
