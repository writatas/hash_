const CSS_Generate = (...arr)=> (function(...cssArr){
    arr = cssArr
    const [player,enemy_que,clock] = [...arr]
    //highlight all possible commands which are accepted by combat.js
    //if an invalid object occurs after key words, all text values are then grey
    const BACKGROUND = document.body
    const USER_NODE = document.getElementById(player.type)
        const [usr_info] = [USER_NODE.children] //access all available dom components through es6 destructuring
        const [weight, name, level, parts] = usr_info[0].childNodes
        const [equiped_items, inventory, encounters] = usr_info[1].childNodes
    const USERCOMMANDS_NODE = document.getElementById(player.type + '_commands')
        const [header,text_area] = USERCOMMANDS_NODE.children
        console.log(header)
        //const [header,text_area] = commands[0].childNodes

    //const USER_COMMANDS = document.getElementById()

    const CSS = { //write the css so that it has a grid template layout proportional to the size of the window screen
        BACKGROUND : `
        background-color:blue;
        `,
        USER_NODE : {
            default: `
                border : 2px solid black;
                width : 400px;
                height : 500px;
                position : absolute;
                z-index : -9;
                text-align : center;`,
            weight:`font-size : 12 px`,
            name:`font-size : 12 px`,
            level:`font-size : 12 px`,
            parts:`font-size : 12 px`,
            equiped_items:`
                border : 2px solid black;
                overflow : scroll;
                height : 100px;
                `,
            inventory:`
                border : 2px solid black;
                overflow : scroll;
                height: 100px;
            `,
            encounters:`
                border : 2px solid black;
                overflow : scroll;
                height : 100px;
            `
        },
        ENEMY_NODE : {
            default : ``
        },
        //highlight all possible commands which are accepted by combat.js
        //if an invalid object occurs after key words, all text values are then grey
        USR_COMMANDS : {
            default: `
                width : 400px;
                height : 200px;

            `,
            header : `widht:100%;height:100px;`,
            text_area : `width:100%;height:100%;`,
            lint_values : {
                attack : "red",
                attach : "yellow",
                repair : "green",
                flee   : "orange",
                invalid: "grey"
            }
        }
    }
    //Apply CSS constantly based on running states
    BACKGROUND.style = CSS.BACKGROUND
    USER_NODE.style = CSS.USER_NODE.default
        weight.style = CSS.USER_NODE.weight
        name.style = CSS.USER_NODE.name
        level.style = CSS.USER_NODE.level
        parts.style = CSS.USER_NODE.parts
        equiped_items.style = CSS.USER_NODE.equiped_items
        inventory.style = CSS.USER_NODE.inventory
        encounters.style = CSS.USER_NODE.encounters
    



})(...arr)
export {CSS_Generate}