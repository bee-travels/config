import React from "react";

const Choice = ({ label, data, onChange }) => {
  return (
    <div className="ui raised segment">
      <div className="ui form">
        <h2 className="ui header">{label}</h2>
        <div className="inline fields">
          {data.map((v, i) => (
            <div className="field" key={i}>
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  id={i}
                  name={label}
                  value={v.value}
                  onChange={(e) => onChange(e.target.value, label.toLowerCase())}
                  disabled={v.disabled}
                />
                <label>{v.value}{v.disabled?" (In Development)":""}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choice;
