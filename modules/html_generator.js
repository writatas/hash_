const HTML_Generate_Objects = (...arr) => (function(...generate_array){
    arr = generate_array
    //render
    const  [player,enemy_que,clock] = [...arr]
    //create all of the necessary html elements if they don't already exist, check type

    let nodes = document.getElementById("playing-field").childNodes
    if(nodes.length === 0){ //if the nodes in the playing field empty create a new playing field, otherwise update information
        //PLAYER:
        let player_node,
        name,level,
        weight,
        equiped_items,
        inventory,
        encounters

        player_node = document.createElement("div")
        player_node.id = player.type
        //weight
            weight = document.createElement("p") , weight.id = "player_weight"
            weight.innerText = `HP:${player.weight.equiped_weight} ¤ ATT:${player.weight.damage_modifier} ¤ INV:${player.weight.inventory_weight}`
        //name
            name = document.createElement("p") , name.id = "player_name"
            name.innerHTML = player.hash_name
        //level
            level = document.createElement("p") , level.id = "player_level"
            level.innerText = player.level
        ////DIV NEEDS TO SEPERATE THIS SECTION OF PLAYER NODE WITHIN THE PLAYER_NODE////
        //equiped items - f
            equiped_items = document.createElement("ol") , equiped_items.id = "player_equiped_items"
        //inventory - f
            inventory = document.createElement("ol") , inventory.id = "player_inventory"
        //encounters -f
            encounters = document.createElement("ol") , encounters.id = "player_encounters"
    } else {
        /*
        The value of objects passed to this function are compared to the value of
        renderd html elements who will have corresponding id's to object 'type'
        */
        nodes.forEach(n=>{

        })
    }

    console.log(player)
    

    


})(...arr)



export {HTML_Generate_Objects}