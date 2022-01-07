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


    //const USER_COMMANDS = document.getElementById()

    const CSS = {
        USER_NODE : {
            default: `
                border : 2px solid black;
                width : 400px;
                height : 500px`,
            weight:`font-size : 12 px`,
            name:`font-size : 12 px`,
            level:`font-size : 12 px`,
            parts:`font-size : 12 px`,
            equiped_items:`
                border : 2px solid black;
                overflow : scroll;
                `,
            inventory:`
                border : 2px solid black;
                overflow : scroll;
                height: 25%;
            `,
            encounters:`
                border : 2px solid black;
                overflow : scroll;
                encounters : 25%;
            `
        },
        ENEMY_NODE : {
            default : ``
        },
        //highlight all possible commands which are accepted by combat.js
        //if an invalid object occurs after key words, all text values are then grey
        USR_COMMANDS : {
            default: ``,
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