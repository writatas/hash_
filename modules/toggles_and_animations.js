//function to make element nodes draggable
const Draggable_Element = (el) =>(function(element)
{
    el = element
    //inner functions - cannot acces dragmousedown before initialization
    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const dragMouseDown = (e) => {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          console.log(window.innerWidth)
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
      
        const elementDrag = (e) => {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
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

export {Draggable_Element,Animate}