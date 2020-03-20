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

const AppPage = () => {
  const [deployment, setDeployment] = useState(null);
  const [version, setVersion] = useState(null);
  const [loadVersion, setLoadVersion] = useState(null);
  const [destinationLanguage, setDestinationLanguage] = useState(null);
  const [hotelLanguage, setHotelLanguage] = useState(null);
  const [currencyExchangeLanguage, setCurrencyExchangeLanguage] = useState(
    null
  );
  const [carRentalLanguage, setCarRentalLanguage] = useState(null);
  const [flightLanguage, setFlightLanguage] = useState(null);
  const [cartLanguage, setCartLanguage] = useState(null);
  const [paymentLanguage, setPaymentLanguage] = useState(null);
  const [emailLanguage, setEmailLanguage] = useState(null);
  const [checkoutLanguage, setCheckoutLanguage] = useState(null);
  const [weatherLanguage, setWeatherLanguage] = useState(null);
  const [messageLanguage, setMessageLanguage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const loadVersions = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/bee-travels/config/master/version.json"
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
      return { value: v, disabled: !version[v]["enabled"] };
    });
  };

  const getLanguageList = (version, selectedVersion) => {
    return Object.keys(version[selectedVersion])
      .filter(v => v !== "enabled")
      .map((v, i) => {
        return { value: v, disabled: !version[selectedVersion][v]["enabled"] };
      });
  };

  const onDeployementSelected = value => {
    setDeployment(value);
  };

  const onVersionSelected = value => {
    setVersion(value);
  };

  const onDestinationLanguageSelected = value => {
    setDestinationLanguage(value);
  };

  const onHotelLanguageSelected = value => {
    setHotelLanguage(value);
  };

  const onCurrencyExchangeLanguageSelected = value => {
    setCurrencyExchangeLanguage(value);
  };

  const onFlightLanguageSelected = value => {
    setFlightLanguage(value);
  };

  const onPaymentLanguageSelected = value => {
    setPaymentLanguage(value);
  };

  const onCartLanguageSelected = value => {
    setCartLanguage(value);
  };

  const onCheckoutLanguageSelected = value => {
    setCheckoutLanguage(value);
  };

  const onEmailLanguageSelected = value => {
    setEmailLanguage(value);
  };

  const onCarRentalLanguageSelected = value => {
    setCarRentalLanguage(value);
  };

  const onWeatherLanguageSelected = value => {
    setWeatherLanguage(value);
  };

  const onMessageLanguageSelected = value => {
    setMessageLanguage(value);
  };

  const versionMap = {
    v1: [
      { service: "Destination", onChange: onDestinationLanguageSelected },
      { service: "Hotel", onChange: onHotelLanguageSelected },
      {
        service: "CurrencyExchange",
        onChange: onCurrencyExchangeLanguageSelected
      }
    ],
    "v1.1": [
      { service: "Cart", onChange: onCartLanguageSelected },
      { service: "Payment", onChange: onPaymentLanguageSelected },
      { service: "Checkout", onChange: onCheckoutLanguageSelected },
      { service: "Email", onChange: onEmailLanguageSelected }
    ],
    v2: [
      { service: "CarRental", onChange: onCarRentalLanguageSelected },
      { service: "Flight", onChange: onFlightLanguageSelected }
    ],
    v3: [
      { service: "Weather", onChange: onWeatherLanguageSelected },
      { service: "Message", onChange: onMessageLanguageSelected }
    ]
  };

  const renderV1 = () => {
    return (
      <>
        <h2>Services</h2>
        <h4>NOTE: UI will automatically be deployed</h4>
        {versionMap.v1.map((v, i) => (
          <Choice
            key={i}
            label={v.service}
            data={getLanguageList(loadVersion, "v1")}
            onChange={v.onChange}
          />
        ))}
      </>
    );
  };

  const renderV1_1 = () => {
    return (
      <>
        {versionMap["v1.1"].map((v, i) => (
          <Choice
            key={i}
            label={v.service}
            data={getLanguageList(loadVersion, "v1.1")}
            onChange={v.onChange}
          />
        ))}
      </>
    );
  };

  const renderV2 = () => {
    return (
      <>
        {versionMap.v2.map((v, i) => (
          <Choice
            key={i}
            label={v.service}
            data={getLanguageList(loadVersion, "v2")}
            onChange={v.onChange}
          />
        ))}
      </>
    );
  };

  const renderV3 = () => {
    return (
      <>
        {versionMap.v3.map((v, i) => (
          <Choice
            key={i}
            label={v.service}
            data={getLanguageList(loadVersion, "v3")}
            onChange={v.onChange}
          />
        ))}
      </>
    );
  };

  const getLanguageForService = service => {
    switch (service) {
      case "Destination":
        return destinationLanguage;
      case "Hotel":
        return hotelLanguage;
      case "CurrencyExchange":
        return currencyExchangeLanguage;
      case "CarRental":
        return carRentalLanguage;
      case "Payment":
        return paymentLanguage;
      case "Cart":
        return carRentalLanguage;
      case "Checkout":
        return checkoutLanguage;
      case "Email":
        return emailLanguage;
      case "Flight":
        return flightLanguage;
      case "Weather":
        return weatherLanguage;
      case "Message":
        return messageLanguage;
    }
  }

  const handleClick = () => {
    let services = [{service: "ui", tag: loadVersion[version]["NodeJS"].tag}];
    if (version > "") {
      services.push(...versionMap["v1"].map((v, i)=> (
        {service: v.service.toLowerCase(), tag: loadVersion[version][getLanguageForService(v.service)].tag}
      )))
    }
    if (version > "v1") {
      services.push(...versionMap["v1.1"].map((v, i)=> (
        {service: v.service.toLowerCase(), tag: loadVersion[version][getLanguageForService(v.service)].tag}
      )))
    }
    if (version > "v1.1") {
      services.push(...versionMap["v2"].map((v, i)=> (
        {service: v.service.toLowerCase(), tag: loadVersion[version][getLanguageForService(v.service)].tag}
      )))
    }
    if (version > "v2") {
      services.push(...versionMap["v3"].map((v, i)=> (
        {service: v.service.toLowerCase(), tag: loadVersion[version][getLanguageForService(v.service)].tag}
      )))
    }

    let data = {
      deployment: deployment,
      version: version,
    }

    for(var i = 0; i<services.length; i++) {
      data[services[i].service] = services[i]
    }

    history.push({
      pathname: "/config",
      data: data
    });
  };

  const notNull = data => {
    return data !== null && data !== undefined;
  };

  const buttonCheck = () => {
    let v1ServicesSelected =
      notNull(destinationLanguage) &&
      notNull(hotelLanguage) &&
      notNull(currencyExchangeLanguage);
    let v1_1ServicesSelected =
      v1ServicesSelected &&
      notNull(cartLanguage) &&
      notNull(paymentLanguage) &&
      notNull(checkoutLanguage) &&
      notNull(emailLanguage);
    let v2ServicesSelected =
      v1_1ServicesSelected &&
      notNull(carRentalLanguage) &&
      notNull(flightLanguage);
    let v3ServicesSelected =
      v2ServicesSelected &&
      notNull(weatherLanguage) &&
      notNull(messageLanguage);
    if (version === "v1") {
      return !v1ServicesSelected;
    } else if (version === "v1.1") {
      return !v1_1ServicesSelected;
    } else if (version === "v2") {
      return !v2ServicesSelected;
    } else {
      return !v3ServicesSelected;
    }
  };

  const renderSubmitButton = () => {
    return (
      <button
        className="ui inverted primary button"
        onClick={handleClick}
        disabled={buttonCheck()}
      >
        Deploy
      </button>
    );
  };

  const renderServices = version => {
    return (
      <>
        {version > "" ? renderV1() : null}
        {version > "v1" ? renderV1_1() : null}
        {version > "v1.1" ? renderV2() : null}
        {version > "v2" ? renderV3() : null}
        {version > "" ? renderSubmitButton() : null}
      </>
    );
  };

  const renderVersions = deployment => {
    return deployment ? (
      <Choice
        label="Version"
        data={getVersionsList(loadVersion)}
        onChange={onVersionSelected}
      />
    ) : null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="ui header">Bee Travels Deployment Wizard</h1>
      <Choice
        label="Deployment"
        data={deployments}
        onChange={onDeployementSelected}
      />
      {renderVersions(deployment)}
      {renderServices(version)}
    </div>
  );
};

export default AppPage;
