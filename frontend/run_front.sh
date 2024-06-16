#!/bin/sh

export PORT=$REACT_APP_FRONTEND_PORT

if [ "$REACT_APP_DEBUG" = "1" ]; then \
    yarn dev; \
    else \
    yarn build; \
    yarn preview; \
fi
