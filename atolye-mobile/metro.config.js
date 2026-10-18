// Shares the web app's data, validation and TR/EN strings (atolye-app/src) instead of copying them.
// Packages those shared files import (only `react`) resolve from this app's node_modules,
// so the phone never loads the web app's second copy of React.
const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)
const shared = path.resolve(__dirname, '../atolye-app/src')

config.watchFolders = [shared]
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const isPackage = !moduleName.startsWith('.') && !path.isAbsolute(moduleName)
  if (isPackage && context.originModulePath.startsWith(shared)) {
    return context.resolveRequest({ ...context, originModulePath: path.join(__dirname, 'index.js') }, moduleName, platform)
  }
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
