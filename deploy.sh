#!/bin/bash

# rsync site to server
rsync -ravz --delete build/* idling@nbf01.opsserver.ch:www/
