#!/bin/bash

# --- COLORS ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# --- LOGGING ---
log_msg() {
  local LEVEL=$1
  local MSG=$2
  local TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
  
  case $LEVEL in
    "INFO")    echo -e "${BLUE}[$TIMESTAMP] [INFO]    ${MSG}${NC}" ;;
    "SUCCESS") echo -e "${GREEN}[$TIMESTAMP] [SUCCESS] ${MSG}${NC}" ;;
    "WARN")    echo -e "${YELLOW}[$TIMESTAMP] [WARN]    ${MSG}${NC}" ;;
    "ERROR")   echo -e "${RED}[$TIMESTAMP] [ERROR]   ${MSG}${NC}" ;;
  esac
}
