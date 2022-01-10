const HTML_Generate_Objects = (...arr) => (function(...generate_array){
    arr = generate_array
    //render
    const  [player,enemy_que,clock] = [...generate_array]
    
    //PLAYER
    //These variables are used to check the condition of the HTML
    let cmds,pn, w, n, l, p, eq, inv, enc, u_cmds
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
    const checks = [pn,w,n,l,p,eq,inv,enc,u_cmds]
    const checkif_null = v=>v===null
    if(checks.every(checkif_null) === true){ //if the nodes in the playing field empty create a new playing field, otherwise update information
    //USER COMMANDS (executed externally through the combat.js module)
        let command_node = document.createElement("div")
        let command_header = document.createElement("p")
        let user_cmds = document.createElement("div")
        command_node.id = "USER_commands"
        command_header.id = player.type + "_commandsheader"
        command_header.innerText = "test_header to move element"
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
            weight.innerText        = `HP:${player.weight.equiped_weight} ¤ ATT:${player.weight.damage_modifier} ¤ INV:${player.weight.inventory_weight}`
        //name
            name                    = document.createElement("p") , name.id = "name"
            name.innerHTML          = player.hash_name
        //level
            level                   = document.createElement("p") , level.id = "level"
            level.innerText         = player.level
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
            //equiped items per element in array structure
            //type: [string]
            //komponent_name: [array with two elements ('Name','hash')] - will use the second element for element type.
            //weight: [number]
            //attachments: [array]
            //cost: [getter]
            //_attach [setter]
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
        
        document.getElementById("playing_field").appendChild(player_node)
        document.getElementById("playing_field").appendChild(command_node)

    } else { //Check by ids if elements exist in the dom and update them if they do not match the running object

        //IDS to check against
            //player weight
            //name
            //level
            //parts

            //equiped_items
                //komponent names (loop if comparisons)
                //The weight and attachment number needs to be updated if different
            //inventory
                //inventory komponent names (loop if comparisons)
                //inventory items change, therefore they need to be accurate to the running inventory object
            //encounters
                //do not really need to be updated, rather information should be appended.


        //update variables if they are different (variables such as wieght change constantly so they are updated every iteration)
        document.getElementById("weight").innerText               = `HP:${player.weight.equiped_weight} ¤ ATT:${player.weight.damage_modifier} ¤ INV:${player.weight.inventory_weight}`
        player.level == document.getElementById("level").innerText ? "" :document.getElementById("level").innerText = `Level: ${player.level}`
        player.parts == document.getElementById("parts").innerText ? "" :document.getElementById("parts").innerText = `Parts: ${player.parts}`
        
        //TEXT ENCOUNTERS
        let last_encounter_id = Object.keys(player.encounters)[Object.keys(player.encounters).length - 1]
        let encounter_length = Object.keys(player.encounters).length
        const inHTML = (s)=>{ //check if element in document exists and return a boolean
             return document.getElementById(s) === undefined || document.getElementById(s) === null ? false : true
        }
        if(encounter_length > 0 && inHTML(last_encounter_id) === false){
            let li              = document.createElement("li")
            li.id               = last_encounter_id
            li.innerText        = `${last_encounter_id} : ${player.encounters[last_encounter_id].text}`
            document.getElementById("encounters").prepend(li)
        }

        //INVENTORY - remove element if it does not match running process
        const inv_children = Object.values(document.getElementById("inventory").children)
        const inv_length = inv_children.length
        const pinv_length = player.inventory.length
        //player.inventory.map(i=>console.log(i.komponent_name[1]))
        if (inv_length < pinv_length){
            player.inventory.forEach(i=>{
                const {type,komponent_name,weight} = i
                //console.log(komponent_name[1])
                inv_children.forEach(c=>c.remove())
                if (inHTML(komponent_name[1] + "I") === false){
                    let txt_el          = document.createElement("p")
                    txt_el.id           = komponent_name[1] + "I"
                    txt_el.innerText    = `${type}-->${komponent_name[1]} : weight-${weight}`
                    document.getElementById("inventory").appendChild(txt_el)
                }
            })
        }
        
            //equiped items
            const equiped_children = Object.values(document.getElementById("equiped_items").children)
            const eq_c_length = equiped_children.length
            const eq_p_length = player.equiped.length
            
            if (eq_c_length < eq_p_length){
                player.equiped.forEach(i=>{
                    const {komponent_name,weight,attachments} = i
                    console.log(komponent_name[1])
                    equiped_children.forEach(c=>c.remove())
                    if (inHTML(komponent_name[1] + "E") === false){
                        let txt_el          = document.createElement("p")
                        txt_el.id           = komponent_name[1] + "E"
                        txt_el.innerText    = `CORE-->${komponent_name[1]} : weight-${weight} : attachments: ${attachments.length}`
        
                        document.getElementById("equiped_items").appendChild(txt_el)
                    }
                })
            }
    }
    //ENEMY QUE
    //ClOCK

})(...arr)



export {HTML_Generate_Objects}