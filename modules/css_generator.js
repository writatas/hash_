const CSS_Generate = (...arr)=> (function(...cssArr){
    arr = cssArr
    const [player,enemy_que,clock] = [...arr]
    //highlight all possible commands which are accepted by combat.js
    //if an invalid object occurs after key words, all text values are then grey
    const Command_Colours = {
        attack : "red",
        attach : "yellow",
        repair : "green",
        flee   : "orange",
        invalid: "grey"
    }
    //REFACTOR SO YOU CHANGE CSS THIS WAY INSTEAD
    //starting height and widths for elements
    const USER_NODE = document.getElementById(player.type)
    const [usr_info] = [USER_NODE.children] //access all available dom components through es6 destructuring


    console.log(usr_info[0].childNodes)
    
    console.log(usr_info[1].childNodes)

    //REFACTOR LIKE THIS GET RID OF document.getelement...
    //Access dom elements and change by comparing the current dom value with the actual running values.
    const Cmd_container = document.getElementById('USER_commands')
    const Usr_commands = document.getElementById('usr_input')
    const CSS = {
        USER_NODE      : `
            width:400px;
            height:500px;
            border:2px solid black;
        `,
        cmd_container   : `
            border:2px solid black;
            width:400px;
            height:300;`,
        usr_commands    : `
            outline:none;
            resize:none;
            width:90%;
            height:100%;
        `,
    }
    //set the CSS constantly
    USER_NODE.style = CSS.USER_NODE
    Cmd_container.style = CSS.cmd_container

    Usr_commands.style = CSS.usr_commands
})(...arr)
export {CSS_Generate}