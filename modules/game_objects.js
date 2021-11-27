const Game = (hero,level) => (function(hero_name,starting_level){
    let level = starting_level
    let hero = hero_name //private variable
    const USER = () =>{
        this.interface = {
            level       : 1,
            name        : hero_name,
            type        : "USER",
            encounters  : new Map(),
            parts       : 0,
            inventory   : [],
            equiped     : [
                KOMPONENT("Head",1,10),
                KOMPONENT("Torso",1,10),
                KOMPONENT("Left Arm",1,10),
                KOMPONENT("Right Arm",1,10),
                KOMPONENT("Left Leg",1,10),
                KOMPONENT("Right Leg",1,10),
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
                let damage_modifier = Math.floor((e_w - i_w)/2)
                return {
                  damage_modifier:damage_modifier,
                  equiped_weight:e_w,
                  inventory_weight:i_w
                }
              },
              get hash_name(){
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
            set _ouch(d){
              let rando_choice = Math.floor(Math.random() * this.equiped.length)
              let d_check = this.equiped[rando_choice].weight -= d
        
              d_check <= 0 ? (
                console.log("\x1b[33m",`\n(line 50)  ${this.equiped[rando_choice].komponent_name[0]} destroyed!\n`),
                this.equiped.splice(rando_choice,1),
                console.log("\x1b[35m",`Komponents left ${this.equiped.length}\n`)
                )
              : this.equiped[rando_choice].weight -= d
            }
        }
        return this.interface
    }
    const KOMPONENT = (name,level,h) => {
        const k_name = {
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
        },
        this.interface = {
            type            : "KOMPONENT",
            komponent_name  : [k_name.typed_name,k_name.make_id(5)],
            level           : level,
            weight          : (level + h) * level,
            attachments     : [],
            get cost(){
                return this.weight * 100
            },
            set _attach(K){
                let message 
                delete K.attachments
                delete K.level
                this.attachments.length < level + 1 ? (
                    this.attachments.push(K), // user inventory should be cleansed after attaching something
                    this.weight += K.weight,
                    message = K.komponent + " attached to " + this.komponent_name + "successfully...")
                : message = "Level of Komponent too low..."
                console.log(message) //debugging
            }
        }
        return this.interface
    }
    const ENEMIES = (min_health, max_health, min_p, max_p, attack_rate) => {
        const rando = (min,max) => {
            return Math.floor(Math.random() * ((max - min + 1)+ min))
        }
        this.enemy = {
            type        : "ENEMIES",
            health      : rando(min_health,max_health) + 5,
            perception  : rando(min_p,max_p),
            attack_rate : attack_rate,
            /*
            IMPORTANT core of the game!
            
            Produce damage asychronously,
            compare enemy health to players health and make sure to clearintervals after termination,
            compare the perception with the players weight, based off of a perception table of somekind
            */
            attack      : async function(player){
                let attack = ()=>{
                    player._ouch = Math.floor(this.perception * .25 + 1)
                    if(player.weight.equiped_weight <= 0 || player.equiped.length === 0){
                        console.log("\x1b[32m","Enemy attack was cleared nicely! Add to the leader board and restart game.")
                        console.log(player.name, "Is dead...")
                        dead_or_alive()
                    } else {
                        console.log(player.weight)
                    }
                }
                let rate = await setInterval(attack,this.attack_rate)
                let dead_or_alive = ()=>{ //
                    clearInterval(rate)
                }
            }
        }
        return this.enemy
    }
    const TEXT_ENCOUNTER = () =>{ //returns a string
        this.texts = [
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
        let text = () =>{
          let n_length = this.texts.length
          return {
              type:"TEXT_ENCOUNTER",
              text:this.texts[Math.floor(Math.random() * n_length)]}
        }
        return text()
    }
    const ENVIRONMENT = () =>{ //changes states of objects through time through its own instance
        const Session = {date:Date(),hero_name:hero}
            //YOU should include the users weight as a factor for whether or not the clock continues
            //revert to the start page for restart, or maybe a leader board?
        const _ques = function*(level){
            for (let i = 1; i < 1000; i ++){
                let encounter_chance = Math.floor(Math.random() * 10)
                if (encounter_chance <= 3){
                    let text = TEXT_ENCOUNTER()
                    yield text
                } else if (encounter_chance <= 5){
                    let base = (Math.floor(i / Math.sqrt(i)) * level)
                    let min_health = base
                    let max_health = base*2
                    let min_perception = base + 10
                    let max_perception = min_perception*2
                    let attack_rate =  max_perception * 10 - (min_perception + max_health + min_health)
                    let enemy = ENEMIES(min_health,max_health,min_perception,max_perception,attack_rate)
                    yield enemy
                } else {
                    let computed_hp = Math.floor(Math.sqrt(i))
                    //console.log(computed_hp)
                    let comp = KOMPONENT(KOMPONENT().komponent_name[1],computed_hp,computed_hp)
                    yield comp
                }
            }
        }

        //let q = _ques(1)
        return {
            session:Session,
            player:USER(),
            ques:_ques(level),
            clock:300,
            enemy_que: [],
        } 
    }
    return ENVIRONMENT()
})(hero,level)

export {Game}