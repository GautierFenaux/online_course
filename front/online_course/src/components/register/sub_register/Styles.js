import React, { useRef } from "react";
import "./subForm.css";

export default function Styles(props) {
  const preventFunc = (e) => {
    e.preventDefault();

    const styleData = {
        styles: []
    }

    allCheckboxes.current.forEach(checkbox => {
        if(checkbox.checked){
            styleData.styles.push(checkbox.value);
        }
    })

    props.modifyIndex(3, styleData);

  };

  const allCheckboxes = useRef([]);

  const addCheck = (el) => {
    if (el && !allCheckboxes.current.includes(el)) {
      allCheckboxes.current.push(el);
    }
  };


  const handleReturn = () => {
    props.modifyIndex(2);
  };
  return (
    <form className="checkbox-form" onSubmit={preventFunc}>
      <p>Quelles sont tes styles préférés ?</p>
      <span>Choix multiples.</span>

      <label htmlFor="classic">Classique</label>
      <input ref={addCheck} type="checkbox" id="classic" value="classique" />

      <label htmlFor="jazz">Jazz</label>
      <input ref={addCheck} type="checkbox" id="jazz" value="jazz" />

      <label htmlFor="soul">Soul</label>
      <input ref={addCheck} type="checkbox" id="soul" value="soul" />

      <label htmlFor="neo-soul">Néo-Soul</label>
      <input ref={addCheck} type="checkbox" id="neo-soul" value="neo-soul" />

      <label htmlFor="country/folk">Country/Folk</label>
      <input ref={addCheck} type="checkbox" id="Country/Folk" value="Country/Folk" />

      <label htmlFor="rock">Rock</label>
      <input ref={addCheck} type="checkbox" id="rock" value="rock" />

      <div className="container-nav-btns">
        <button onClick={handleReturn} type="button" className="prev">
          Précédent
        </button>
        <button>Valider</button>
      </div>
    </form>
  );
}
