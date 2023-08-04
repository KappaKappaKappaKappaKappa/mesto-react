import "./styles/InfoTooltip.css";
import successRegister from "../images/success-register.svg";
import errorRegister from "../images/error-register.svg";

function InfoTooltip() {
  return (
    <section className="pop-up">
      <div className="pop-up__container">
        <form className="pop-up__form">
          <div className="pop-up__tooltip-container">
            <img className="pop-up__tootltip-img" src={successRegister} />
            <h2 className="pop-up__tootltip-title">
              Вы успешно зарегистрировались
            </h2>
          </div>
        </form>
        <button className="pop-up__button-close"></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
