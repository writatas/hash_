//function to make element nodes draggable
const Draggable_Elements = (...els) =>(function(...elements){
    els = elements
    //inner functions - cannot acces dragmousedown before initialization
    const drag_mouse_down = (el) => {
        el = el || window.event
        el.preventDefault()
        //get mouse position on startup
        pos3 = el.clientX
        pos4 = el.clientY
        document.onmouseup = close_drag_element
        //call function whenever cursor moves
        document.onmousemove = element_drag

    }
    const element_drag = (el) => {
        el = el || window.event
        el.preventDefault()
        //calculate new cursor position
        pos1 = pos3 - el.clientX;
        pos2 = pos4 - el.clientY;
        pos3 = el.clientX;
        pos4 = el.clientY;
        // set the elements new position
        elem.style.top = (elem.offsetTop - pos2) + "px"
        elem.style.top = (elem.offsetLeft - pos1) + "px"
    }
    const close_drag_element = () => {
        //stop moving when mouse button is released
        document.onmouseup = null
        document.onmousemove = null
    }
    if(elements.length > 2){
        return Error("Draggable element's given exceeded the allowed amount")
    } else {
        elements.forEach(elem=>{
            let [pos1,pos2,pos3,pos4] = [0,0,0,0]
            if(document.getElementById(elem.id + "header")){ //choses the header of draggable element
                //if present, the header is where one drags the html from
                document.getElementById(elem.id + "header").onmousedown = drag_mouse_down
            } else {
                console.log(document.getElementById(elem.id+"header"))
                elem.onmousedown = drag_mouse_down
            }
        })
    }
})(...els)

export {Draggable_Elements}