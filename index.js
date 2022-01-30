//we can create html element using document.createElement("element tag")
//we can add content to element using element.textContent=content
//we can append the tag using append function document.getelementbyid("id of the element").append(element we want to append)
//arguments are what we pass when we call teh function and parameters are values we accept while defining a function

let myLeads=[]
document.getElementById("input-btn").addEventListener("click",function(){
    myLeads.push(document.getElementById("input-el").value)
    document.getElementById("input-el").value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
document.getElementById("delete-btn").addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads);
})
const leadsfromlocalstorage=JSON.parse(localStorage.getItem("myLeads"))
if (leadsfromlocalstorage){
    myLeads=leadsfromlocalstorage;
    render(myLeads)
}
document.getElementById("tab-btn").addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
function render(leads){
    let listitem=""
    for(let i=0;i<leads.length;i+=1){
        //using template strings using the upper comma under the esc key without shift
        listitem +=`
            <li>
                <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
                </a>
            </li>
            `
    }
    document.getElementById("ul-el").innerHTML=listitem
}
