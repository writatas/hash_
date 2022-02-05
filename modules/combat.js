//manage and help implement the actual logic of enemies attacking player, player attacking enemies, player repairing themselves
const Combat = (opt,...att) => (function(option,...attack_params)
{
    opt = option //player or enemy
    att = attack_params

    if (option === "player_attack")
    {
        console.log("player attacked")
    }
    else if (option === "enemy_attack")
    {
        console.log("enemy attacked")
    }
    else
    {
        return null;
    }

})(opt, ...att)

export {Combat}