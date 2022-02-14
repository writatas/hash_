//manage and help implement the actual logic of enemies attacking player, player attacking enemies, player repairing themselves
const Combat = (p,e) => (function(player,enemies)
{
    p = player
    e = enemies
    
    //read the player's commands and then compare the overall perception of enemies to player weight to see who goes first
    //If the player's weight is smaller than the combined perception of the enemies, then the enemys will get to attack first
    const regex = /(attack\u00A0[\w]{5}|attach\u00A0[\w]{5}\u00A0to\u00A0[\w]{5}|repair\u00A0[\w]{5}|flee\u00A0[\w]{5}|invalid\u00A0[\w]{5})/gm
    const commands = document.getElementById('usr_input').innerText
    const matches = commands.match(regex)
    //console.log(matches)

    for (let i = 0; i < enemies.length; i++) //Enemy_que variable is available in the scope of logic_script.js
    {
        console.log(enemies[i])
    }

})(p,e)

export {Combat}