#!/bin/bash
docker build -t dockertest:latest .
docker run --rm -p 6006:80 dockertest:latest
