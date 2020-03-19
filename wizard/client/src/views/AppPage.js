import React, { useState, useEffect } from "react";
import Choice from "../component/Choice";
import { Link } from "react-router-dom";
import history from "../globalHistory";

const deployments = [
  { value: "K8s", disabled: false },
  { value: "Openshift", disabled: false },
  { value: "Knative", disabled: false },
  { value: "Istio", disabled: false },
  { value: "Helm", disabled: true }
];

const versions = [
  { value: "v1", disabled: false },
  { value: "v2", disabled: false },
  { value: "v3", disabled: true }
];

const languages = [
  { value: "NodeJS", disabled: false },
  { value: "Python 3", disabled: true },
  { value: "Go", disabled: true },
  { value: "Java EE", disabled: true }
];

const AppPage = () => {
  const [deployment, setDeployment] = useState(null);
  const [version, setVersion] = useState(null);
  const [loadVersion, setLoadVersion] = useState(null);
  const [language, setLanguage] = useState(null);

  const loadVersions = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/bee-travels/config/wizard-update/version.json"
    );
    const json = await response.json();
    setLoadVersion(json);
  };

  useEffect(() => {
    loadVersions();
  }, []);

  const getVersionsList = version => {
    if (!version) {
      return [];
    }

    return Object.keys(version).map((v, i) => {
      return {value: v, disabled: !version[v]["enabled"]}
    })
  }

  const onDeployementSelected = value => {
    console.log(value);
    setDeployment(value);
  };

  const onVersionSelected = value => {
    console.log(value);
    setVersion(value);
  };

  const onLanguageSelected = value => {
    console.log(value);
    setLanguage(value);
  };

  const renderV1 = () => {
    return (
      <>
        <h2>Services</h2>
        <h4>NOTE: UI will automatically be deployed</h4>
        <Choice
          label="Destination"
          data={languages}
          onChange={onLanguageSelected}
        />
        <Choice label="Hotel" data={languages} onChange={onLanguageSelected} />
        <Choice
          label="CurrencyExchange"
          data={languages}
          onChange={onLanguageSelected}
        />
      </>
    );
  };

  const renderV2 = () => {
    return (
      <>
        <Choice
          label="CarRental"
          data={languages}
          onChange={onLanguageSelected}
        />
        <Choice label="Flight" data={languages} onChange={onLanguageSelected} />
        <Choice
          label="Payment"
          data={languages}
          onChange={onLanguageSelected}
        />
        <Choice label="Cart" data={languages} onChange={onLanguageSelected} />
        <Choice
          label="Checkout"
          data={languages}
          onChange={onLanguageSelected}
        />
        <Choice label="Email" data={languages} onChange={onLanguageSelected} />
      </>
    );
  };

  const renderV3 = () => {
    return (
      <>
        <Choice
          label="Weather"
          data={languages}
          onChange={onLanguageSelected}
        />
        <Choice
          label="Message"
          data={languages}
          onChange={onLanguageSelected}
        />
      </>
    );
  };

  const handleClick = () => {
    history.push({
      pathname: "/config",
      data: "mofi"
    });
  };

  const renderSubmitButton = () => {
    return (
      <button className="ui inverted primary button" onClick={handleClick}>
        Deploy
      </button>
    );
  };

  const renderServices = version => {
    return (
      <>
        {version > "" ? renderV1() : null}
        {version > "v1" ? renderV2() : null}
        {version > "v2" ? renderV3() : null}
        {version > "" ? renderSubmitButton() : null}
      </>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="ui header">Bee Travels Deployment Wizard</h1>
      <Choice
        label="Deployment"
        data={deployments}
        onChange={onDeployementSelected}
      />
      <Choice label="Version" data={getVersionsList(loadVersion)} onChange={onVersionSelected} />
      {renderServices(version)}
    </div>
  );
};

export default AppPage;
