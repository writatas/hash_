//manage and help implement the actual logic of enemies attacking player, player attacking enemies, player repairing themselves
const Combat = (p,e) => (function(player,enemies)
{
    p = player
    e = enemies
    
    //read the player's commands and then compare the overall perception of enemies to player weight to see who goes first
    //If the player's weight is smaller than the combined perception of the enemies, then the enemys will get to attack first
    const regex = /(attack\u00A0[\w]{5}|attach\u00A0[\w]{5}\u00A0to\u00A0[\w]{5}|repair\u00A0[\w]{5}|invalid\u00A0[\w]{5})/gm
    const commands = document.getElementById('usr_input').innerText
    const matches = commands.match(regex)
    const matches_len = matches !== null ? matches.length : 0

    const enemy_length = enemies.length
    document.getElementById('enemy_queheader').innerText = `Enemies: ${enemy_length}`

    const enemy_p_count = enemy_length > 0 ? enemies.map(p => p.perception).reduce((a, b) => a + b) : 0

    const player_hp = player.weight.equiped_weight !== undefined ? player.weight.equiped_weight : 0

    console.log(enemy_length,enemy_p_count,player_hp)
    if (enemy_p_count > player_hp)
    {
        for (let e = 0; e < enemy_length; e++)
        {
            enemies[e].attack(player)
        }
    }
    else
    {
        for (let m = 0; m < matches_len; m++)
        {
            let cmd = matches[m].split(/\u00A0/)
            console.log(cmd)
        }
    }

})(p,e)

export {Combat}