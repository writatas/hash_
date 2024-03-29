const HTML_Generate_Objects = (...arr) => (function(...generate_array)
{
    arr = generate_array
    //render
    const  [player,enemy_que] = [...generate_array]
    
    //PLAYER
    //These variables are used to check the condition of the HTML
    let cmds, pn, w, n, l, p, eq, inv, enc, u_cmds, eque
    cmds = document.getElementById("USER_commands")
    pn = document.getElementById("USER_info")
    w = document.getElementById("weight")
    n = document.getElementById("name")
    l = document.getElementById("level")
    p = document.getElementById("parts")
    eq = document.getElementById("equiped_items")
    inv = document.getElementById("inventory")
    enc = document.getElementById("encounters")
    u_cmds = document.getElementById("USER_commands")
    eque = document.getElementById("enemy_que") //start here

    const checks = [cmds,pn,w,n,l,p,eq,inv,enc,u_cmds,eque]
    const checkif_null = v => v === null
    if(checks.every(checkif_null) === true)
    { //if the nodes in the playing field empty create a new playing field, otherwise update information
    //USER COMMANDS (executed externally through the combat.js module)
        let command_node = document.createElement("div")
        let command_header = document.createElement("p")
        let user_cmds = document.createElement("div")
        command_node.id = "USER_commands"
        command_header.id = player.type + "_commandsheader"
        command_header.innerText = "commands"
        user_cmds.id = "usr_input"
        command_node.appendChild(command_header)
        command_node.appendChild(user_cmds)

    //PLAYER INFO:
        let player_node,
        player_info,
        inventory_management,
        name,
        level,
        weight,
        parts,
        equiped_items,
        inventory,
        encounters

        player_node                 = document.createElement("div") , player_node.id = player.type
        player_info                 = document.createElement("div") , player_info.id = player.type + "header" //player info should be the draggable header as it will be at the top
        //weight
            weight                  = document.createElement("p") , weight.id = "weight"
            weight.innerText        = `HP:${player.weight.equiped_weight} / ATT:${player.weight.damage_modifier} / INV:${player.weight.inventory_weight}`
        //name
            name                    = document.createElement("p") , name.id = "name"
            name.innerHTML          = player.hash_name
        //level
            level                   = document.createElement("p") , level.id = "level"
            level.innerText         = `Level ${player.level}`
        //parts
            parts                   = document.createElement("p") , parts.id = "parts"
            parts.innerText         = player.parts

        player_info.appendChild(weight)
        player_info.appendChild(name)
        player_info.appendChild(level)
        player_info.appendChild(parts)
            player_info.style.width = "100%"
        
        //PLAYER_INVENTORY
        inventory_management        = document.createElement("div")
        //equiped items - f
            equiped_items           = document.createElement("div") , equiped_items.id = "equiped_items"
        //inventory - f
            inventory               = document.createElement("div") , inventory.id = "inventory"
        //encounters -f
            encounters              = document.createElement("ul") , encounters.id = "encounters"

        inventory_management.append(equiped_items,inventory,encounters)
        inventory_management.appendChild(equiped_items)
        inventory_management.appendChild(inventory)
        inventory_management.appendChild(encounters)
        inventory_management.style.width = "100%"

        player_node.appendChild(player_info)
        player_node.appendChild(inventory_management)
        
        //ENEMY_QUE
        let enemy_node,
            enemy_header,
            enemy_info
        enemy_node = document.createElement('div'), enemy_node.id = 'enemy_que'
        enemy_header = document.createElement('div'), enemy_header.id = 'enemy_queheader'
        enemy_header.innerText = 'Enemies!'
        enemy_info = document.createElement('div'), enemy_info.id = 'enemy_info'
            if(enemy_que.length <= 0)
            {
                for(let e = 0; e < enemy_que.length; e++)
                {
                    let e_container, e_name, the_rest //e_name should change color based on the conditions gleaned from user commands
                    e_container = document.createElement('div') , e_container.id = `${enemy_que[e].name}`
                    the_rest = document.createElement('p') , the_rest.innerText = `${enemy_que[e].name} > Health: ${enemy_que[e].health} Perception: ${enemy_que[e].perception}`
                    e_container.appendChild(the_rest)
                    enemy_info.append(e_container)
                }
            }
        enemy_node.append(enemy_header,enemy_info)
        document.getElementById("playing_field").append(player_node,command_node,enemy_node)

    }
    else
    { //Check by ids if elements exist in the dom and update them if they do not match the running object
        //update variables if they are different (variables such as wieght change constantly so they are updated every iteration)
        document.getElementById("weight").innerText = `HP:${player.weight.equiped_weight} ¤ ATT:${player.weight.damage_modifier} ¤ INV:${player.weight.inventory_weight}`
        player.level == document.getElementById("level").innerText ? "" :document.getElementById("level").innerText = `Level: ${player.level}`
        player.parts == document.getElementById("parts").innerText ? "" :document.getElementById("parts").innerText = `Parts: ${player.parts}`
        
        //TEXT ENCOUNTERS
        let last_encounter_id = Object.keys(player.encounters)[Object.keys(player.encounters).length - 1]
        let encounter_length = Object.keys(player.encounters).length
        const inHTML = (s) => { //check if element in document exists and return a boolean
             return document.getElementById(s) === undefined || document.getElementById(s) === null ? false : true
        }
        if(encounter_length > 0 && inHTML(last_encounter_id) === false)
        {
            //change color of text elements depending on if the text node was produced from a player or an enemy
            const [playerRegx, enemyRegx] = [/player/gm, /enemy/gm]
            let li              = document.createElement("li")
            li.id               = last_encounter_id
            li.innerText        = `${last_encounter_id} : ${player.encounters[last_encounter_id].text}`
            document.getElementById("encounters").prepend(li)

            if (playerRegx.test(li.id))
            {
                li.style.color = "blue"
            }
            else if (enemyRegx.test(li.id))
            {
                li.style.color = "red"
            }
        }

        //INVENTORY - remove element if it does not match running process
        const inv_children = Object.values(document.getElementById("inventory").children)
        player.inventory.forEach(i =>
        {
            const {type, komponent_name, weight} = i
            //console.log(komponent_name[1])
            inv_children.forEach(c => c.remove())
            if (inHTML(komponent_name[1] + "I") === false)
            {
                let txt_el          = document.createElement("p")
                txt_el.id           = komponent_name[1] + "I"
                txt_el.innerText    = `${komponent_name[1]} K> weight-${weight}`
                document.getElementById("inventory").appendChild(txt_el)
            }
        })
            //equiped items
            const equiped_children = Object.values(document.getElementById("equiped_items").children)
            equiped_children.forEach(c => c.remove())
            player.equiped.forEach(i => {
                const {komponent_name,weight,attachments} = i
                //console.log(komponent_name[1])
                equiped_children.forEach(c => c.remove())
                let txt_el          = document.createElement("p")
                txt_el.id           = komponent_name[1] + "E"
                txt_el.innerText    = `${komponent_name[1]} E> weight-${weight} : attachments: ${attachments.length}`
                document.getElementById("equiped_items").appendChild(txt_el)
            })
    }
    //ENEMY QUE

    const current_enemies = !!enemy_que ? enemy_que.map(n => n.name) : 0
        //Need a better data struct here, rather than looping systems (Optimize)
        const enemy_children = Object.values(document.getElementById("enemy_info").children)
        for (let c = 0; c < enemy_children.length; c++)
        {
            enemy_children[c].remove()
        }
        //console.log(current_enemies)
        for(let e = 0; e < current_enemies.length; e++)
        {
            if(!!current_enemies)
            {
                const new_enemy = document.createElement('div')
                const the_rest = document.createElement('p')
                const {name,health,perception} = enemy_que[e]
                new_enemy.id = name
                the_rest.innerText = `${name} > Health: ${health} Perception: ${perception}`
                new_enemy.appendChild(the_rest)
                document.getElementById('enemy_info').appendChild(new_enemy)
            }
        }

})(...arr)


export {HTML_Generate_Objects}