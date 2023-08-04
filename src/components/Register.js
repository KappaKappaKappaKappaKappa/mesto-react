import "./styles/Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="login-register">
      <h2 className="login-register__title">Регистрация</h2>
      <form className="login-register__form">
        <input className="login-register__input" placeholder="E-mail" />
        <input className="login-register__input" placeholder="Пароль" />
        <button className="login-register__submit-btn">
          Зарегистрироваться
        </button>
        <p className="login-register__already-title">
          Уже зарегестрированы?{" "}
          <Link to="/sign-in" className="login-register__already-login">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
