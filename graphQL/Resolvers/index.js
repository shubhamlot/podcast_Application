const channelsResolver = require('./channels')
const authResolver = require('./auth')

const rootResolver = {
  ...authResolver,
  ...channelsResolver
}

module.exports = rootResolver