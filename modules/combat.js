//manage and help implement the actual logic of enemies attacking player, player attacking enemies, player repairing themselves
const Combat = (opt) => (function(option)
{
    opt = option //player or enemy
    
    const regex = /(attack [\w]{5}|attach [\w]{5} to [\w]{5}|repair [\w]{5}|flee [\w]{5}|invalid [\w]{5})/g

    const commands = document.getElementById('usr_input').innerText

    commands.matchAll(regex)

    if (option === "player_attack")
    {
        console.log("player attacked")


    }
    else if (option === "enemy_attack")
    {
        console.log("enemy attacked")
        for (i = 0; i < enemy_que.length; i++) //Enemy_que variable is available in the scope of logic_script.js
        {
            enemy_que[i]
        }
    }
    else
    {
        return null;
    }

})(opt)

export {Combat}