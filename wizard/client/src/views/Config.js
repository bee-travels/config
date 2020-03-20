import React, { useEffect, useState } from "react";

const Config = props => {
  const [data, setData] = useState("");
  const loadData = async () => {
    const response = await fetch("/api/v1/config");
    const text = await response.text();
    setData(text);
  };

  console.log(props.location.data);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="ui container" style={{padding: "20px"}}>
      <pre className="ui segment">{data.trim()}</pre>
      <button
        className="ui inverted primary button"
        onClick={() => {
          navigator.clipboard.writeText(data);
        }}
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default Config;
