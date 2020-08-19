function agregarScoreHTML(numero)
{
    let elem = document.createElement("li")
    elem.innerHTML = (numero.toString())
    let parentElem = document.querySelector("#scoreId")
    parentElem.appendChild(elem);
    ordenarScore()
}

function ordenarScore()
{
    let parentElem = document.querySelector("#scoreId")
    let children = [...parentElem.children]

    children.sort((a,b) => {
        return parseInt(a.innerHTML) == parseInt(b.innerHTML)
          ? 0
          : (parseInt(a.innerHTML) > parseInt(b.innerHTML) ? -1 : 1);
    
    }).forEach((node, index)=>{
                parentElem.appendChild(node)
        })

}

function getVer()
{
    console.log("2.00");
}