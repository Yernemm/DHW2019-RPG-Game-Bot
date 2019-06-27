module.exports = {
  // METADATA
  desc: "Shows help information",
  usage: "[command]",
  cmdtype: "help",
  run: (data) => {  //😋😝😜😛
    const { desc, usage, cmdtype } = this;
    // data contains: command, argsArr, argsTxt, client, message
    //e.g. to get arguments array, use data.argsArr.

    // COMMAND LOGIC

    //PREPARE FILESYSTEM

    const dir = './commands/';
    const fs = require('fs');

    //--FETCH ALL COMMAND INFO--

    //DEFINE CMD CLASS
    function cmdClass(id) {
        this.id = id;
        this.name = "";
        this.desc = "";
        this.usage = "";
        this.type = "";
    }

    var cmdObj = [];
    let count = 0;

    //INSTANTIATE CMD OBJECTS
    fs.readdirSync(dir)
        .filter(file => !file.toLowerCase().includes("template"))
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            const cmdfile = require(`./${file}`);

            cmdObj[count] = new cmdClass(count);

            cmdObj[count].id = count;
            cmdObj[count].name = file.slice(0, -3);
            cmdObj[count].desc = cmdfile.desc;
            cmdObj[count].usage = cmdfile.usage;
            cmdObj[count].type = cmdfile.cmdtype;

            count++;
        });

    //CMD CLASS FUNCTIONS AND METHODS:

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function getAllTypes(){
        var types = [];

        cmdObj.forEach( (thisCmd) => {
            types.push(thisCmd.type);
        });
        return types.filter(onlyUnique).sort();
    }

    function getAllCmdByType(type){
        var cmds = [];
        cmdObj.forEach( (thisCmd) => {
            if (thisCmd.type == type)
                cmds.push(thisCmd);
        });
        return cmds;
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var msg = "error";
    switch (data.argsTxt) {
        case null:
        case "":
        case " ":

            msg = `Discord Hack Week 2019  RPG Game Bot\r\nTo get help for a specific command, do ${data.config.prefix}help [command]\r\n\r\n`;


            msg += "Commands:\r\n";


            var cmdInfoMsg = "";
            console.log(getAllTypes());
            getAllTypes().forEach( (type)=>{
                cmdInfoMsg+= "**" + capitalizeFirstLetter(type) + "**\r\n```";
                getAllCmdByType(type).forEach( (tcmd) =>{
                    cmdInfoMsg += `${tcmd.name} `;
                });
                cmdInfoMsg+= "```\r\n";

            });

            msg += "\r\n" + cmdInfoMsg;

            break;
        default:

            let cmd = data.argsTxt;
            try {
                const file = require(`./${cmd}.js`);

                let de = file.desc;
                let us = file.usage;
                msg = `**Help for ${data.config.prefix}${cmd}**\r\n${de}\r\nUsage: ${data.config.prefix}${cmd} ${us}`;
            } catch (err) {
                msg = `Command \"${data.argsTxt}\" not found.\r\nUse **>help** to see available commands.`;
            }

            break;
    }

    data.message.channel.send(msg);
    return msg;
}};
