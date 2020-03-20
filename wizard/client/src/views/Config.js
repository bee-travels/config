import React, { useEffect, useState } from "react";

const Config = props => {
  const [data, setData] = useState("");
  const loadData = async () => {
    const response = await fetch("/api/v1/config", {
      method: "POST",
      body: JSON.stringify(props.location.data)
    });
    const text = await response.text();
    setData(text.trim());
  };

  console.log(JSON.stringify(props.location.data));

  useEffect(() => {
    loadData();
  }, []);

  const createObjectURL = data => {
    var blob = new Blob([data]);
    if (window.webkitURL && window.webkitURL.createObjectURL) {
      console.log("here");
      return window.webkitURL.createObjectURL(blob);
    } else if (window.URL && window.URL.createObjectURL) {
      console.log("or here");
      return window.URL.createObjectURL(blob);
    } else {
      return null;
    }
  };
  const downloadClick = () => {
    let url = createObjectURL(data);
    let a = document.createElement("a");
    a.href = url;
    // a.download = "k8s.yaml";
    a.click();
  };

  return (
    <div className="ui container" style={{ padding: "20px" }}>
      <pre className="ui segment">{data}</pre>
      <button
        className="ui inverted primary button"
        onClick={() => {
          navigator.clipboard.writeText(data);
        }}
      >
        Copy to Clipboard
      </button>
      <button className="ui inverted primary button" onClick={downloadClick}>
        Download
      </button>
    </div>
  );
};

export default Config;
