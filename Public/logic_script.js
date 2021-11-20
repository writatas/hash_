import {Game} from "../modules/game_objects"
//import {HTML_Generate_Objects} from "../modules/html_generator"
const delay = async function(ms){
    return await new Promise(resolve => setTimeout(resolve,ms));
  }
const BEGIN_LOGIC = async function (string){
    let rate = 200
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
        : next_q.type === "TEXT_ENCOUNTER" ? (player.encounters.set("Time: " + clock,next_q),  next_q = ques.next().value)
        : console.log("Game over")

        if(player.weight.equiped_weight <= 0){
            clock = 0
        } else if (clock <= 1){
            player.level +=1,
            clock = 300,
            ques = Game(string,player.level).ques,
            rate -= 10
        }


        //Generate HTML, probably need to use workers in the html

        //DEBUGGING AND TESTING these values will also be used for endgame statistics
        console.clear()
        console.log(
                    "\ntestHTMLGenerator    :",genterate_html(session,player),
                    "\nSession              :",session,
                    "\nInventory            : ",player.inventory.length,
                    "\nText Encounters      : ",player.encounters.size,
                    "\nClock                : ",clock,
                    "\nEnemies              :",enemy_que.length,
                    "\nHealth recent Enemy  :",enemy_que[enemy_que.length - 1],
                    "\nPlayer weight        :",player.weight,
                    "\nPlayer level         :",player.level,
                    "\nParts                :",player.parts,
                    "\nTime Rate            :",rate
                    )
    }
}
BEGIN_LOGIC("test_hero")