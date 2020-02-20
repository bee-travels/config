#!/bin/bash
oc new-project bee-travels
oc project bee-travels
oc new-app --docker-image beetravels/destination:v0.0.3
oc new-app --docker-image beetravels/hotel:v0.0.3
oc new-app --docker-image beetravels/currencyexchange:v0.0.3
oc new-app --docker-image beetravels/ui:v0.0.2 -e PORT=9000 -e DESTINATION_URL=http://destination:4000 -e HOTEL_URL=http://hotel:9002 -e CURRENCY_EXCHANGE_URL=http://currencyexchange:4001
oc expose svc ui
oc status