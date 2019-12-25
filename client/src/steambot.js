const SteamBotClass = require('./steambot.class');
let SteamBot;

module.exports = function(...args) {
    SteamBot = SteamBot || new SteamBotClass(...args);
    return SteamBot;
};