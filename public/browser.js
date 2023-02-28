document.addEventListener("click",(event)=>{

    //update
        if(event.target.classList.contains("edit-me")){
           let res = prompt("enter the new value",event.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
          
        axios.post('/update-item',{text:res, id:event.target.getAttribute("data-id")}).then(()=>{

             event.target.parentElement.parentElement.querySelector(".item-text").innerHTML = res
        }).catch(()=>{
            console.log("error,try again")
        })
    
        }

        //delete
        if(event.target.classList.contains("delete-me")){
            confirm("Do you really want to delete",event.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
           
         axios.post('/delete-item',{ id:event.target.getAttribute("data-id")}).then(()=>{
 
              event.target.parentElement.parentElement.remove();
         }).catch(()=>{
             console.log("error,try again")
         })
     
         }

})