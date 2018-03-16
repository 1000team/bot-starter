import { register } from '../config'

register('hello', 'My first command!', (bot, msg, cfg, args) => {
  bot.postMessage({
    channel: msg.channel,
    text: `Hello ${cfg.hello}!`,
    ...cfg.defaultParams
  })
})