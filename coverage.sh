#!/bin/bash

jest --coverage
cat ./coverage/lcov.info | coveralls