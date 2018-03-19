# SlackLib Bot Starter Kit
> A template for getting starting with creating Slack Bots using TypeScript and Slacklib

## Getting Started
```sh
> git clone https://github.com/1000team/bot-starter mybot
> cd mybot
> yarn
> SLACK_TOKEN=your_slackbot_token_here yarn start
```

## Prerequisities
- You will need to head to `Custom Integrations --> Bots` in your Slack.  
  - The URL will look like: https://YOUR_SLACK.slack.com/apps/manage/custom-integrations  
- Choose "Add Configuration"
- Choose a `Username`
  - This is how you will invoke your bot on Slack
- Copy your API Token
  - This will be your SLACK_TOKEN mentioned below

## How to use Slacklib

### Setting up
First we can to use the `setup` function to declare our default configuration.  
This returns and object with 3 functions:
- `getConfig`: Synchronously returns the current configuration
- `setConfig`: Asynchonously updates the configuration and persists it. Returns a promise.
- `register`: Synchronously used to register new bot commands

```ts
// config.ts
import { setup } from 'slacklib'
export { getConfig, setConfig, register }

interface Config {
  hello: string
}

const defaults: Config = {
  hello: 'world'
}

const { getConfig, setConfig, register } = setup(defaults)
```

### Registering a command
After we've called and exported the functions from `setup`, we can now use `register` to create commands.  
`register` takes three parameters:
- `command: string` Name of the command
- `description: string` Description of the command (appears in the `help` response)
- `callback: Callback` The function that is called when the command is used

The callback is called with 4 parameters:
- `bot: SlackClient` The instance of the SlackClient for communicating with Slack
- `msg: Chat.Message` The full message object from Slack
- `cfg: Config & BaseConfiguration (object)`: Your configuration and the base configuration (name, channel, emoji, and timezone)
- `args: string[]` The arguments _after_ the command. E.g. `@bot hello world` will pass in args: `['world']`
```ts
// hello.ts
import { register } from './config'

register('hello', 'Will respond with the hello value from config', (bot, msg, cfg, _args) => {
  bot.postMessage({
    channel: msg.channel, // Required. We'll respond to the channel
    text: `Hello ${cfg.hello}!` // We declare hello in our config.ts
  })
})
```

### Starting the Bot
The `slacklib` library exports a `start` function with automatic retries (3 seconds between attempts).  
It will throw an exception if you have not yet called `setup`.

```ts
// index.ts
import './config' // Just call our config/setup module for its side effects
import { start } from 'slacklib'
import './hello' // Load our hello command

start()
```

After compiling with `yarn build` you will be able to start your bot.
```sh
> yarn build
> SLACK_TOKEN=xoxb-aaaaaaaaaaaaa-bbbbb yarn start
```

Your `SLACK_TOKEN` will be persisted, so the next time you start your bot you can simply use `yarn start`.  
Your configuration will exist in `./database` relative to your project folder.  

### Using the Bot
You will need to invite your bot to a channel in Slack:
```
> /invite @mybot
```

Then invoke it:
```
> @mybot help
> @mybot hello
```