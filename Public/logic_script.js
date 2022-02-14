import {Game} from "../modules/game_objects.js"
import {HTML_Generate_Objects} from "../modules/html_generator.js"
import {CSS_Generate} from "../modules/css_generator.js"
import {Draggable_Element,Animate} from "../modules/toggles_and_animations.js"
import {Combat} from "../modules/combat.js"

const delay = async function(ms)
{
    return await new Promise(resolve => setTimeout(resolve,ms));
}
const BEGIN_LOGIC = async function (string)
{
    let rate = 2000
    let {session,player,ques,clock,enemy_que} = Game(string,1)
    //Generate html objects before loop and then execute the Drabbable elements module to make the elements draggable
    //console.time('html, toggles/animations, and css')
    await HTML_Generate_Objects(player,enemy_que,clock)
    await CSS_Generate(player,enemy_que,clock)
    await Draggable_Element(player.type)
    await Draggable_Element(player.type + '_commands')
    await Draggable_Element('enemy_que')

    //console.timeEnd('html, toggles/animations, and css')
    while (clock > 0 && player.weight.equiped_weight > 0)
    { //this while loop handles the updating of running game object
        try
        {
            await delay(rate)
            await Combat(player,enemy_que)
        }
        catch(err)
        {
            throw err
        }
        clock--
        let next_q = ques.next().value
        next_q.type === "ENEMIES" ? enemy_que.push(next_q)
        : next_q.type === "KOMPONENT" && player.inventory.length < player.level + 1 ? (player.inventory.push(next_q), next_q = ques.next().value)
        : next_q.type === "KOMPONENT" && player.inventory.length === player.level + 1 ? (player.parts += Math.floor((next_q.cost)/100),  next_q = ques.next().value)
        : next_q.type === "TEXT_ENCOUNTER" ? (player.encounters[`${player.level}-T${clock}`] = next_q , next_q = ques.next().value) //essentially creates a time-code for text encounter
        : console.log("Game over")

        if(player.weight.equiped_weight <= 0)
        {
            clock = 0
        }
        else if (clock <= 1)
        {
            player.level +=1,
            clock = 300,
            ques = Game(string,player.level).ques,
            rate -= 10
        }
        Animate.clock(clock)
        await HTML_Generate_Objects(player,enemy_que)

        //Check for enemies and handle combat with combat.js
        Combat("enemy_attack", player)
        //DEBUGGING AND TESTING these values will also be used for endgame statistics
    }
}

//Run an introduction html page
console.time('Running Time')
BEGIN_LOGIC("test_hero") //test hero will be taken from input as an introductory html page
console.timeEnd('Running Time')
//after player death from an outro html page