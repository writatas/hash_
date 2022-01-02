const CSS_Generate = (...arr)=> (function(...cssArr){
    arr = cssArr
    const [player,enemy_que,clock] = [...arr]
    //Access dom elements and change by comparing the current dom value with the actual running values.
    const usr_cmds = document.getElementById('USER_commands')
    const CSS = {
        user_commands : `
            border:2px solid black;
            width:100%`,
        
    }
    usr_cmds.style = CSS.user_commands
})(...arr)
export {CSS_Generate}