const HTML_Generate_Objects = (...arr) => (function(...generate_array){
    // indexes of objects which are passed to this module,
    //      0   :  session
    //      1   :  player
    //      2   :  ques
    //      3   :  clock
    //      4   :  enemy_que
    arr = generate_array


    //return renderHTML
    return generate_array
})(...arr)

/*
Both the BACKGROUND_CSS and BACKGROUND_SVG will be used by logic_script.js to render updated graphics on the DOM - Taking in the returned
values of the service workers and updating the elements initially constructed and rendered by HTML_Generate_Objects.

The HTML_Generate_Objects will be used to both initialize the html which first appears on the page and set the appropriate class and id tags to
html elements so that they can be updated. It establishes mutation observers to call upon the Background CSS and Background SVG
*/ 

const BACKGROUND_CSS = (...els) => (function(...elements){ //provide an array of elements and then manipulate the css to create css graphics
    els = elements
})(...els)

const BACKGROUND_SVG = (...anims) => (function(...animations){ //provide an array of svg elements and then manipulate the css to create css graphics
    anims = animations
})(...anims)

export {HTML_Generate_Objects}