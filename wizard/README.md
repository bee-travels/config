# Bee Travels - Deployment Wizard

## About

The Bee Travels Deployment Wizard is an application that simplifies the deployment of Bee Travels with a GUI.

## Prerequisites

* [Python 3](https://www.python.org/downloads/)

### Kubernetes

* Set the `KUBECONFIG` environment variable to your cluster's kubeconfig file

### OpenShift

* From your OpenShift dashboard, locate and run your login command from your terminal window. The login command should look like this: `oc login --token=<YOUR_TOKEN> --server=<YOUR_SERVER>`

## Running the Wizard

```sh
git clone https://github.com/bee-travels/config.git
cd config/wizard
./start.sh
```

In a browser, go to `localhost:8999` to use the wizard.