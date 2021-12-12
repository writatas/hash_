import {Game} from "../modules/game_objects.js"
import {HTML_Generate_Objects} from "../modules/html_generator.js"
const delay = async function(ms){
    return await new Promise(resolve => setTimeout(resolve,ms));
  }
const BEGIN_LOGIC = async function (string){
    let rate = 2000
    let {session,player,ques,clock,enemy_que} = Game(string,1)
    while (clock > 0 && player.weight.equiped_weight > 0){
        try{
            await delay(rate)
        } catch(err){throw err}
        clock--
        let next_q = ques.next().value
        next_q.type === "ENEMIES" ? enemy_que.push(next_q)
        : next_q.type === "KOMPONENT" && player.inventory.length < player.level + 1 ? (player.inventory.push(next_q), next_q = ques.next().value)
        : next_q.type === "KOMPONENT" && player.inventory.length === player.level + 1 ? (player.parts += Math.floor((next_q.cost)/100),  next_q = ques.next().value)
        : next_q.type === "TEXT_ENCOUNTER" ? (player.encounters.set(`${player.level}-T` + clock,next_q),  next_q = ques.next().value) //essentially creates a time-code for text encounter
        : console.log("Game over")

        if(player.weight.equiped_weight <= 0){
            clock = 0
        } else if (clock <= 1){
            player.level +=1,
            clock = 300,
            ques = Game(string,player.level).ques,
            rate -= 10
        }


        //Generate HTML and render it.
        //await HTML_Generate_Objects(player,enemy_que,clock)

        //Check for enemies and handle combat with combat.js

        
        //DEBUGGING AND TESTING these values will also be used for endgame statistics
        console.log(
                    //"\nSession              :",session,
                    //"\nInventory            : ",player.inventory.length,
                    //"\nText Encounters      : ",player.encounters.size,
                    //"\nClock                : ",clock,
                    //"\nEnemies              :",enemy_que.length,
                    //"\nHealth recent Enemy  :",enemy_que[enemy_que.length - 1],
                    //"\nPlayer weight        :",player.weight,
                    //"\nPlayer level         :",player.level,
                    //"\nParts                :",player.parts,
                    //"\nTime Rate            :",rate
                    //player.parts
                    player.encounters
                    )
    }
}
BEGIN_LOGIC("test_hero")