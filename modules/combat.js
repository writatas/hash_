//manage and help implement the actual logic of enemies attacking player, player attacking enemies, player repairing themselves
const Combat = (p, e, a) => (function(player, enemies, action_que)
{
    p = player
    e = enemies
    a = action_que
    
    //read the player's commands and then compare the overall perception of enemies to player weight to see who goes first
    //If the player's weight is smaller than the combined perception of the enemies, then the enemys will get to attack first
    const regex = /(attack\u00A0[\w]{5}|attach\u00A0[\w]{5}\u00A0to\u00A0[\w]{5}|build)/gm
    const commands = document.getElementById('usr_input').innerText
    const matches = commands.match(regex)
    const matches_len = matches !== null ? matches.length : 0

    const enemy_length = enemies.length
    document.getElementById('enemy_queheader').innerText = `Enemies: ${enemy_length}`

    const player_hp = player.weight.equiped_weight !== undefined ? player.weight.equiped_weight : 0
    
    const text_encounter = (op, o_text) =>
    {
        const key = `${Math.floor(performance.now() / 100)}${op}`
        const encounter = {type:"TEXT_ENCOUNTER", text: o_text}
        player.encounters[key] = encounter
    }
    if (action_que.size() === 0)
    {
        //que enemy and player actions in a priority que to be executed in order by comparing the enemies perception with the players equiped weight (health)
        for (let e = 0; e < enemy_length; e++)
        {
            action_que.enqueue(["enemy_move", enemies[e], enemies[e].perception])
        }
        for (let m = 0; m < matches_len; m++)
        {
            action_que.enqueue(["player_move", matches[m].split(/\u00A0/), player_hp - Math.abs(player_hp / 2)])
        }
    }
    else
    {
      for (let q = 0; q < action_que.size(); q++)
      {
          let act = action_que.dequeue()
          if (act[0] === "enemy_move" && !!act[1])
          {
                act[1].attack(player)
                text_encounter("enemy",`The enemy ${act[1].name} attacked you!`)
          }
          else if (act[0] === "player_move")
          {
            if(act[1][0] === "attack")
            {
                for (let e = 0; e < enemies.length;e++)
                {
                    if (enemies[e].name === act[1][1])
                    {
                        player.attack(enemies[e])
                        text_encounter("player", `You attacked the enemy ${enemies[e].name}`)
                    }
                }
            }
            else if (act[1][0] === "attach")
            {
                const inv = player.inventory.filter(i => i.komponent_name[1] === act[1][1])[0]
                const equip = player.equiped.filter(i => i.komponent_name[1] === act[1][3])[0]
                
                equip !== undefined && inv !== undefined ? equip._attach = inv: "";

                for (let i = 0; i < player.inventory.length; i++)
                {
                    console.log(player.inventory[i].komponent_name[1], i)
                    if (player.inventory[i].komponent_name[1] === "USED")
                    {
                        player.inventory.splice(i, 1)
                    }
                }
                //little Bug here
                text_encounter("player",`You attached component ${act[1][1]} to component ${act[1][3]}!`)
            }
            else if (act[1][0] === "build") //using parts to build another Komponent which cna take attachments
            {
                player.build()
                text_encounter("player",`You built a new component!`)
            }
            
          }
      }
    }

})(p, e, a)

export {Combat}