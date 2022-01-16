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
        //const [header,text_area] = commands[0].childNodes

    //const USER_COMMANDS = document.getElementById()

    const CSS = { //write the css so that it has a grid template layout proportional to the size of the window screen
        BACKGROUND : `
        background-color:white;
        `,
        USER_NODE : {
            default: `
                border : 2px solid black;
                background-color : black;
                color : white;
                width : 400px;
                height : 500px;
                position : absolute;
                z-index : -9;
                overflow : auto;
                resize : both;
                grid-template:
                                "a a a" auto
                                "b b b" auto
                                "c c c"; auto
                `,
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
            `,
            encounters:`
                overflow : scroll;
                text-align : left;
            `
        },
        ENEMY_NODE : {
            default : ``
        },
        //highlight all possible commands which are accepted by combat.js
        //if an invalid object occurs after key words, all text values are then grey
        USER_COMMANDS : {
            default: `
                background-color : black;
                color : white;
                width : 500px;
                height : 300px;
                position : absolute;
                text-align : left;
                overflow : auto;
                resize : both;
                border : 2px solid white;
            `,
            header : `
                width:100%;
                height:5px;
                padding-left: 10px;
                `,
            text_area : `
                width:100%;
                height:89%;
                text-align:center;
                padding : 10px;
                overflow:scroll;
                background-color:black;
                border : 2px solid white;
                `,
            lint_values : [
                'attack',
                'attach',
                'to', //preposition keyword used to attach two different comoponents
                'repair',
                'flee',
                'invalid'
            ]
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
    USERCOMMANDS_NODE.style = CSS.USER_COMMANDS.default
        header.style = CSS.USER_COMMANDS.header
        text_area.style = CSS.USER_COMMANDS.text_area
        text_area.setAttribute('contenteditable','true') //make the html within the div editable
        text_area.addEventListener("keyup", (el)=>{ //Change color of text by its matches
            if(el.keyCode === 32){
                let newHTML = ''
                let text_value = text_area.innerText.replace(/[\s]/g,' ').trim().split(' ')
                text_value.forEach(val=>{
                    if(CSS.USER_COMMANDS.lint_values.indexOf(val.trim()) > -1){
                        newHTML += `<span class="${val}">` + val + '&nbsp;</span>'
                    } else {
                        newHTML += '<span class="invalid">' + val + '&nbsp;</span>'
                    }
                })
                text_area.innerHTML = newHTML
                //set cursor position to the end of the text
                let child = text_area.children
                let range = document.createRange()
                let sel = window.getSelection()
                range.setStart(child[child.length-1],1)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
                text_area.focus()
            }
        })



})(...arr)
export {CSS_Generate}