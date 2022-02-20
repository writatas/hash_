//manage and help implement the actual logic of enemies attacking player, player attacking enemies, player repairing themselves
const Combat = (p, e, a) => (function(player, enemies, action_que)
{
    p = player
    e = enemies
    a = action_que
    
    //read the player's commands and then compare the overall perception of enemies to player weight to see who goes first
    //If the player's weight is smaller than the combined perception of the enemies, then the enemys will get to attack first
    const regex = /(attack\u00A0[\w]{5}|attach\u00A0[\w]{5}\u00A0to\u00A0[\w]{5}|repair\u00A0[\w]{5}|invalid\u00A0[\w]{5})/gm
    const commands = document.getElementById('usr_input').innerText
    const matches = commands.match(regex)
    const matches_len = matches !== null ? matches.length : 0

    const enemy_length = enemies.length
    document.getElementById('enemy_queheader').innerText = `Enemies: ${enemy_length}`

    const player_hp = player.weight.equiped_weight !== undefined ? player.weight.equiped_weight : 0

    //console.log(enemy_length, player_hp) //O(n^3)

    if (action_que.size() === 0)
    {
        //que enemy and player actions in a priority que to be executed in order by comparing the enemies perception with the players equiped weight (health)
        for (let e = 0; e < enemy_length; e++)
        {
            action_que.enqueue(["enemy_attack", enemies[e], enemies[e].perception])
        }
        for (let m = 0; m < matches_len; m++)
        {
            action_que.enqueue(["player_attack", matches[m].split(/\u00A0/), player_hp - Math.abs(player_hp / 2)])
        }
    }
    else
    {
      for (let q = 0; q < action_que.size(); q++)
      {
          let act = action_que.dequeue()
          if (act[0] === "enemy_attack")
          {
            act[1].attack(player)
          }
          else if (act[0] === "player_attack")
          {
            for (let e = 0; e < enemies.length;e++)
            {
                if (enemies[e].name === act[1][1])
                {
                    player.attack(enemies[e])
                    console.log(enemies[e].name)
                }
            }
          }
      }
    }

})(p, e, a)

export {Combat}