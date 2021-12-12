const HTML_Generate_Objects = (...arr) => (function(...generate_array){
    arr = generate_array
    //render
    const  [player,enemy_que,clock] = [...arr]
    //create all of the necessary html elements if they don't already exist, check type

    let nodes = document.getElementById("playing-field").childNodes
    if(nodes.length === 0){ //if the nodes in the playing field empty create a new playing field, otherwise update information
    //PLAYER:
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

        player_node                 = document.createElement("div")
            player_node.id          = player.type
        //PLAYER_INFO
        player_info                 = document.createElement("div") //player info will be the draggable header as it will be at the top
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
            if(player.equiped.length === 0) {
                equiped_items.innerText = `Pretty much dead`
            } else {
                player.equiped.forEach(k=>{
                    const {type,komponent_name,weight,attachments} = k
                    let txt_el          = document.createElement("p")
                    txt_el.id           = komponent_name[1]
                    txt_el.innerText    = `${type}-->${komponent_name[1]} : weight-${weight} : attachments: ${attachments.length}`
    
                    equiped_items.appendChild(txt_el)
                })
            }
        
        //inventory - f
            inventory               = document.createElement("div") , inventory.id = "inventory"

            if(player.inventory.length === 0){
                inventory.innerText = `Nothing in inventory...`
            } else {
                player.inventory.forEach(i=>{
                    const {type,komponent_name,weight} = i
                    let txt_el          = document.createElement("p")
                    txt_el.id           = komponent_name[1]
                    txt_el.innerText    = `${type}-->${komponent_name[1]} : weight-${weight}`
                    
                    inventory.appendChild(txt_el)
                })
            }
        //encounters -f
            encounters                  = document.createElement("ul") , encounters.id = "encounters"
            if(player.encounters.size() === 0){
                encounters.innerText = `No visual encounters...`
            } else {
                for (const [key,value] of player.encounters){
                    let li              = document.createElement("li")
                    li.id               = key
                    li.innerText        = `${key} : ${value}`
                    encounters.appendChild(li)
                }
            }
            

        inventory_management.append(equiped_items,inventory,encounters)
        inventory_management.appendChild(equiped_items)
        inventory_management.appendChild(inventory)
        inventory_management.appendChild(encounters)
        inventory_management.style.width = "100%"

        player_node.appendChild(player_info,inventory_management)
        player_node.appendChild(inventory_management)
        
        document.body.appendChild(player_node)

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


    }

    //console.log(player)
    

    


})(...arr)



export {HTML_Generate_Objects}