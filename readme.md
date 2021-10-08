# Test Remote Config

## Description
This project is a minimal reproducible example. When using a secondary firebase app, it's impossible to fetch the config on android. On iOS it's working fine.

## General Debugging info

To switch the firebase apps fetching the remote config, you have to alter the boolean value in `RemoteConfigService.js`. There is a value `isDev = false`.

### Test values used:

* default -> DEFAULT VALUE USED
* Primary app -> PRIMARY VALUE USED
* Secondary app -> DEV VALUE USED
