const HTML_Generate_Objects = (...arr) => (function(...generate_array){
    arr = generate_array
    //render
    const  [player,enemy_que,clock] = [...arr]
    //create all of the necessary html elements if they don't already exist, check type
    let pn, w, n, l, p, eq, inv, enc
    pn = document.getElementById("USER")
    w = document.getElementById("weight")
    n = document.getElementById("name")
    l = document.getElementById("level")
    p = document.getElementById("parts")
    eq = document.getElementById("equiped_items")
    inv = document.getElementById("inventory")
    enc = document.getElementById("encounters")
    const checks = [pn,w,n,l,p,eq,inv,enc]
    const checkif_null = v=>v===null
    if(checks.every(checkif_null) === true){ //if the nodes in the playing field empty create a new playing field, otherwise update information
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

        player_node                 = document.createElement("div") , player_node.id = player.type
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

        //let weightID,
        //nameID,
        //levelID,
        //partsID,

        //equiped_itemsID,
        //inventoryID,
        //encountersID

        //weightID                         = document.getElementById("weight")
        //nameID                           = document.getElementById("name")
        //levelID                          = document.getElementById("level")
        //partsID                          = document.getElementById("parts")

        //equiped_itemsID                  = document.getElementById("equiped_items")
        //inventoryID                      = document.getElementById("inventory")
        //encountersID                     = document.getElementById("encounters")


        //update variables if they are different (variables such as wieght change constantly so they are updated every iteration)
        document.getElementById("weight").innerText               = `HP:${player.weight.equiped_weight} ¤ ATT:${player.weight.damage_modifier} ¤ INV:${player.weight.inventory_weight}`
        player.level == document.getElementById("level").innerText ? "" :document.getElementById("level").innerText = player.level
        player.parts == document.getElementById("parts").innerText ? "" :document.getElementById("parts").innerText = player.parts
        //Encounters

        let last_encounter_id = Object.keys(player.encounters)[Object.keys(player.encounters).length - 1]
        console.log(last_encounter_id) // where the duplication is happening!!
        //console.log(player.encounters[last_encounter_id])
        //console.log(Object.keys(player.encounters).length)
        let encounter_length = Object.keys(player.encounters).length
        if(encounter_length > 0){
            let li              = document.createElement("li")
            li.id               = last_encounter_id
            li.innerText        = `${last_encounter_id} : ${player.encounters[last_encounter_id].text}`
            document.getElementById("encounters").appendChild(li)
        } else {
            console.log("if statement is not working!")
        }

        //Inventory - remove element if it does not match running process
        const inv_children = Object.values(document.getElementById("inventory").children)
        let inv_length = inv_children.length
        let pinv_length = player.encounters.length
        if (inv_length > 0 && pinv_length > 0){
            inv_children.forEach(c=>{
                player.inventory.forEach(i=>{
                    const {type,komponent_name,weight} = i
                    if(c.id === komponent_name[1]){
                        document.getElementById(c.id).innerText = `${type}-->${komponent_name[1]} : weight-${weight}`
                    } else {
                        document.getElementById(c.id).remove()
                        let txt_el          = document.createElement("p")
                        txt_el.id           = komponent_name[1] + "I"
                        txt_el.innerText    = `${type}-->${komponent_name[1]} : weight-${weight}`
                        document.getElementById("level").appendChild(txt_el)
                    }
                })
            })
        }
            //equiped items
            const equiped_children = Object.values(document.getElementById("equiped_items").children)
            equiped_children.forEach(c=>{
            player.equiped.forEach(k=>{
                const {type,komponent_name,weight,attachments} = k
                if(c.id === komponent_name[1] + "E"){
                    document.getElementById(c.id).innerText = `${type}-->${komponent_name[1]} : weight-${weight} : attachments: ${attachments.length}`
                } else {
                    document.getElementById(c.id).remove()
                    let txt_el          = document.createElement("p")
                    txt_el.id           = komponent_name[1] + "E"
                    txt_el.innerText    = `${type}-->${komponent_name[1]} : weight-${weight} : attachments: ${attachments.length}`
    
                    document.getElementById("equiped_items").appendChild(txt_el)
                }
            })
        })

    }

    //console.log(player)
})(...arr)



export {HTML_Generate_Objects}