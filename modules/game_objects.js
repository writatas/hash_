const Game = (hero,level) => (function(hero_name,starting_level)
{
    let level = starting_level
    let hero = hero_name //private variable
    const USER = () => {
        return {
            level       : 1,
            name        : hero_name,
            type        : "USER",
            encounters  : {},
            parts       : 0,
            inventory   : [],
            equiped     : [
                KOMPONENT("Head",1,50),
                KOMPONENT("Torso",1,50),
                KOMPONENT("Left Arm",1,50),
                KOMPONENT("Right Arm",1,50),
                KOMPONENT("Left Leg",1,50),
                KOMPONENT("Right Leg",1,50),
            ],
            get weight(){ 
                let e_w = 0
                let i_w = 0

                this.equiped.forEach(i=>{
                  e_w += i.weight
                })
                this.inventory.forEach(i=>{
                  i_w += i.weight
                })
                let damage_modifier = Math.floor((e_w - i_w)/3)
                return {
                  damage_modifier:damage_modifier,
                  equiped_weight:e_w,
                  inventory_weight:i_w
                }
              },
              get hash_name()
              {
                let hash = 0, i, chr;
                if (hero.length === 0) return hash;
                    for (i = 0; i < hero.length; i++) {
                        chr   = hero.charCodeAt(i);
                        hash  = ((hash << 5) - hash) + chr;
                        hash |= 0; // Convert to 32bit integer
                    }
                const hexconvert = hash.toString(16)
                return "Model#: " + hexconvert;
              },
            set _ouch(d)
            {
              let rando_choice = Math.floor(Math.random() * this.equiped.length)
              let d_check = this.equiped[rando_choice].weight -= d
        
              d_check <= 0 ? (
                //!!this console.log needs to be rendered in html somehow
                this.equiped.splice(rando_choice,1)
                )
              : this.equiped[rando_choice].weight -= d
            },
            attack : function (enemy)
            {
                const damage = enemy.health - Math.abs(this.weight.damage_modifier)
                enemy.health = damage
                this.parts += 100 * this.level
            },
            build : function () //build a new named component with parts
            {
                const can_component = this.equiped.length < 6 + this.level ? true : false
                const creation_cost = Math.floor(this.equiped.length) * this.level

                if (can_component && this.parts - creation_cost > 0) // if 0
                {
                    const hp = Math.floor(creation_cost / 10) + 1
                    const built_komponent = KOMPONENT("build", this.level, hp + 1)
                    this.equiped.push(built_komponent)
                    this.parts -= creation_cost
                    return `${built_komponent.komponent_name[1]} was built successfully`
                }
                else
                {
                    return "build was unsuccessful"
                }
            }
        }
    }
    const KOMPONENT = (name,level,h) => {
        let k_name
        k_name = {
            typed_name:name,
            make_id:(length)=>{
                let [result,characters] = [
                    "",
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                ]
                let charactersLength = characters.length
                for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
        }
        return {
            type            : "KOMPONENT",
            komponent_name  : [k_name.typed_name, k_name.make_id(5)],
            level           : level,
            weight          : (level + h) * level,
            attachments     : [],
            get cost ()
            {
                return this.weight * 1.5
            },
            set _attach(K)
            {
                let message 
                delete K.attachments
                delete K.level
                this.attachments.length < level + 1 ? (
                    this.attachments.push(K),
                    this.weight += K.weight,
                    message = K.komponent_name[1] + " attached to " + this.komponent_name[1] + " successfully...")
                : message = "Level is too low..."
                K.komponent_name[1] = "USED"
                console.log(message) //debugging
            }

        }
    }
    const ENEMIES = (min_health, max_health, min_p, max_p) => {
        const rando = (min,max) => {
            return Math.floor(Math.random() * ((max - min + 1) + min))
        }
        const make_id = (length) => {
            let [result,characters] = [
                "",
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            ]
            let charactersLength = characters.length
            for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        return {
            type        : "ENEMIES",
            name        : "E" + make_id(4),
            health      : rando(min_health,max_health) + 5,
            perception  : rando(min_p,max_p),
            attack      : function(player)
            {
                let dead = () => {
                    //Change this later to return a value that triggers a restart by returning zero
                    return 0
                }
             
                if (player.weight.equiped_weight <= 0 || player.equiped.length === 0)
                {
                    dead()
                }
                else
                {
                    //updates via while loop in the logic script
                    player._ouch = Math.floor((this.perception *  player.level) / 2)
                }
                
            }
        }
    }
    const TEXT_ENCOUNTER = () =>
    { //returns a string
        const texts = [
            "You knocked over a rock and it fell down a drain...",
            "A crazed but harmless Automaton picks a flower from a patch of grass, then stares at you passing by...",
            "A large structure of destroyed rubble blocked your way. You found a way to get around it...",
            "You hear a metallic scream, a loud clunk, and birds flying outward from a treeline...",
            "You recieved the incoming transmission: 01101000 01100101 01101100 01110000...",
            "A skeleton of a human is burried, half way, into a mound of dirt...",
            "Sensors indicate high levels of radiation, You turn another way...",
            "A window breaks from a cluster of apartments in the distance...",
            "The hum of a large, but abandoned factory rings out its last processes...",
            "In the midst of an alcove a deer with three horns is feasting on a brush of long grass...",
          ]
        let text = () =>
        {
          let n_length = texts.length
          return {type:"TEXT_ENCOUNTER", text:texts[Math.floor(Math.random() * n_length)]}
        }
        return text()
    }
    const ENVIRONMENT = () =>
    { //changes states of objects through time through its own instance
        const Session = {date:Date(),hero_name:hero}
        function Action_que() // simple priority que function
        {
            this.actions = []
            this.print = () =>
            {
                console.log(this.actions)
            }
            this.enqueue = (item) =>
            {
                const idx = this.actions.findIndex(e => e[2] > item[2])
                if (idx !== -1)
                {
                    this.actions.splice(idx, 0, item)
                }
                else
                {
                    this.actions.push(item)
                }
            }
            this.dequeue = () =>
            {
                return this.actions.shift()
            }
            this.size = () =>
            {
                return this.actions.length
            }
        }

        const _ques = function*(level)
        {
            for (let i = 1; i < 1000; i ++)
            {
                let encounter_chance = Math.floor(Math.random() * 10)
                if (encounter_chance < 3)
                {
                    let text = TEXT_ENCOUNTER()
                    yield text
                }
                else if (encounter_chance > 8)
                {
                    let enemy = ENEMIES(3 + level, 10 * level, 3 + level, 10 * level)
                    yield enemy
                }
                else
                {
                    //console.log(computed_hp)
                    let comp = KOMPONENT("generate", level, 10 * level + 1)
                    yield comp
                }
            }
        }

        return {
            session:Session,
            player:USER(),
            ques:_ques(level),
            clock:300,
            enemy_que: [],
            moves: new Action_que()
        } 
    }
    return ENVIRONMENT()
})(hero,level)

export {Game}