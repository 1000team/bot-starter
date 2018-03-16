import { setup } from 'slacklib'

interface Config {
  hello: string
}

const defaultConfig: Config = {
  hello: 'world'
}

const { getConfig, setConfig, register } = setup(defaultConfig)

export {
  getConfig,
  setConfig,
  register
}