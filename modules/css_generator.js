const CSS_Generate = (...arr)=> (function(...cssArr)
{
    arr = cssArr
    const [player,enemy_que,clock] = [...arr]
    //highlight all possible commands which are accepted by combat.js
    //if an invalid object occurs after key words, all text values are then grey
    const USER_NODE = document.getElementById(player.type)
        const [usr_info] = [USER_NODE.children] //access all available dom components through es6 destructuring
        const [weight, name, level, parts] = usr_info[0].childNodes
        const [equiped_items, inventory, encounters] = usr_info[1].childNodes
    const USERCOMMANDS_NODE = document.getElementById(player.type + '_commands')
        const [header,text_area] = USERCOMMANDS_NODE.children
        const ENEMY_NODE = document.getElementById('enemy_que')
        const [enemy_header,enemy_info] = ENEMY_NODE.children
    const CSS = { //write the css so that it has a grid template layout proportional to the size of the window screen
        USER_NODE : {
            default: `
                border : 2px solid black;
                background-color : black;
                color : white;
                width : 508px;
                height : 598px;
                padding : 10px;
                position : absolute;
                overflow : auto;
                left : 1px;
                top : 6px;
                resize : both;
                border : 2px solid white;
                grid-template:
                                "a a a" auto
                                "b b b" auto
                                "c c c"; auto
                `,
            weight:`cursor : pointer; text-align : center;`,
            name:`cursor : pointer; text-align : center;`,
            level:`cursor : pointer; text-align : center;`,
            parts:`
                cursor : pointer;
                text-align : center;
                border-bottom : 4px dotted white;
                `,
            equiped_items:`
                overflow : scroll;
                display : inline;
                `,
            inventory:`
                border : 2px solid black;
                overflow : scroll;
            `,
            encounters:`
                overflow : scroll;
                text-align : left;
                border-top : 2px solid white;
            `
        },
        ENEMY_NODE : {
            default : `
                background-color : black;
                color : white;
                width : 500px;
                height : 300px;
                position : absolute;
                text-align : left;
                overflow : auto;
                resize : both;
                border : 2px solid white;
                left : 533px;
                top : 8px;
            `,
            enemy_header : `
                cursor : pointer;   
                padding-left : 10px;
            `,
            enemy_info : `
                max-width : 100%;
                padding : 10px;
            `
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
                left : 534px;
                top : 320px;
            `,
            header : `
                max-width:100%;
                height:5px;
                padding-left: 10px;
                cursor : pointer;
                `,
            text_area : `
                max-width:100%;
                height:89%;
                text-align:left;
                padding : 10px;
                overflow : scroll;
                background-color:black;
                border-top : 2px solid white;
                `,
            lint_values : [
                'attack',
                'attach',
                'to', //preposition keyword used to attach two different comoponents
                'build',
                'invalid'
            ]
        }
    }
    //Apply default CSS
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
            if(el.keyCode === 13){
                let newHTML = []
                let text_value = text_area.innerText.trim().split('\n')
                text_value.forEach(val => {
                    const targets = val.split(' ')
                    let spanEl = document.createElement('span')
                    if(/attack [\w]{5}/.test(val))
                    {
                        spanEl.className = `attack`
                        spanEl.id = `att_${val.split(' ')[1]}`
                        spanEl.innerText = `\n${val}`
                        newHTML.push(spanEl)
                        
                        if(document.getElementById(targets[1]) !== null)
                        {
                            document.getElementById(targets[1]).style.color = "red"
                        }
                        else
                        {
                            spanEl.remove()
                        }
                    }
                    else if(/attach [\w]{5} to [\w]{5}/.test(val))
                    {
                        spanEl.className = `attach`
                        spanEl.id = `a_${val.split(' ')[3]}`
                        spanEl.innerText = `\n${val}`
                        newHTML.push(spanEl)
                    }
                    else if(/build/.test(val))
                    {
                        spanEl.className = `build`
                        spanEl.innerText = `\n${val}`
                        newHTML.push(spanEl)
                    }
                })
                text_area.innerText = '' 
                newHTML.forEach(el => {
                    text_area.appendChild(el)
                })
            }
        })

    ENEMY_NODE.style = CSS.ENEMY_NODE.default
        enemy_header.style = CSS.ENEMY_NODE.enemy_header
        enemy_info.style = CSS.ENEMY_NODE.enemy_info

})(...arr)
export {CSS_Generate}