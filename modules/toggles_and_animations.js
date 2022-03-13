//function to make element nodes draggable
const Draggable_Element = (el) =>(function(element)
{
    el = element
    
    window.addEventListener("resize",()=>
    {
      let windowW = window.innerWidth
      //let windowH = window.innerHeight
      const element = document.getElementById(el)
      if (windowW < 1000)
      {
        let encounters = document.getElementById("encounters") 
        encounters.style = `
        text-align : left;
        border-top : 2px solid white;
        height : 30px;
        `
        element.style.width = `100%`
        element.style.left = `${1}px`
        element.style.top = `${6}px`

        element.style.position = "relative"
        element.style.overflow = "auto"
        element.style.height = `${33.3}%`
      }
      else
      {
        let encounters = document.getElementById("encounters") 
        encounters.style = `
        overflow : scroll;
        text-align : left;
        border-top : 2px solid white;
        `

        element.style.overflow = "none"
        element.style.position = "absolute"

        document.getElementById("USER").style = `
        font-family: 'Press Start 2P', cursive;
        border : 2px solid black;
        background-color : black;
        color : white;
        width : 508px;
        height : 598px;
        padding : 10px;
        position : absolute;
        overflow : auto;
        left : 1px;
        top : 6px;
        resize : both;
        border : 2px solid white;
        grid-template:
                        "a a a" auto
                        "b b b" auto
                        "c c c"; auto
        `
        document.getElementById("USER_commands").style =  `
        font-family: 'Press Start 2P', cursive;
        background-color : black;
        color : white;
        width : 500px;
        height : 300px;
        position : absolute;
        text-align : left;
        overflow : auto;
        resize : both;
        border : 2px solid white;
        left : 534px;
        top : 320px;
        `
        document.getElementById("enemy_que").style = `
        font-family: 'Press Start 2P', cursive;
        background-color : black;
        color : white;
        width : 500px;
        height : 300px;
        position : absolute;
        text-align : left;
        overflow : auto;
        resize : both;
        border : 2px solid white;
        left : 533px;
        top : 8px;
    `
      }
    })

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const dragMouseDown = (e) =>
        {
          e = e || window.addEventListener("click",dragMouseDown(e))
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
      
        const elementDrag = (e) => {
          e = e || window.addEventListener("click",elementDrag(e))
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          let windowW = window.innerWidth
          let windowH = window.innerHeight
          let clientW = elmnt.clientWidth
          let clientH = elmnt.clientHeight

          if (elmnt.offsetLeft >= -1 && elmnt.offsetLeft < windowW - clientW - 5)
          {
            elmnt.style.left = `${elmnt.offsetLeft - pos1}px`
          }
          else if (elmnt.offsetLeft <= -1)
          {
            elmnt.style.left = `${1}px`
          }
          else if (elmnt.offsetLeft >= windowH - clientH - 5)
          {
            elmnt.style.left = `${windowH - clientH - 5}px`
          }

          if (elmnt.offsetTop > -1 && elmnt.offsetTop < (windowH - clientH) - 5)
          {
            elmnt.style.top = `${elmnt.offsetTop - pos2}px`
          }
          else if (elmnt.offsetTop < 5)
          {
            elmnt.style.top = `${6}px`
          }
          else if (elmnt.offsetTop >= windowH - clientH - 6)
          {
            elmnt.style.top = `${windowH - clientH - 10}px`
          }
          else
          {
            elmnt.style.left = Math.floor((windowW - clientW) / 2)
            elmnt.style.top = Math.floor((windowH - clientH) / 2)
          }

        }
        
        const closeDragElement = () => {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
          } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
          }
      }
      
      dragElement(document.getElementById(element))
      
})(el)

//Animate background color depending on what happens to the player
const Animate = {
  clock : function(c_time)
  {
    let new_rgb = c_time - 50
    if(new_rgb > 0)
    {
      document.body.style.backgroundColor = `rgb(${new_rgb},${new_rgb},${new_rgb})`
    }
    else
    {
      document.body.style.backgroundColor = `black;`
    }
  }
}

export {Draggable_Element, Animate}