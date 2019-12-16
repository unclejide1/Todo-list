window.addEventListener("DOMContentLoaded", ()=>{
    let button = document.getElementById("saveButton");
    let input =document.getElementById("taskName");
    let list = document.getElementById("todo");
    let mainItem = localStorage['todo'] ? JSON.parse(localStorage['todo']): []
    button.onclick = addLocal;
    let edit_id;
    // console.log(mainItem)


    function addLocal(e){  
        e.preventDefault();
        let value = input.value;
        let date = new Date().toISOString();
        let line = document.createElement("div");
        let edit = document.createElement("button");
        let del = document.createElement("button");
        let para = document.createElement("p");
        let idCount = id();

        if(localStorage["todo"]){
            let data = JSON.parse(localStorage["todo"])
            if(button.innerText == "Update"){
                console.log("i am here")
                console.log(document.getElementById(edit_id))

                data.forEach(x=>{
                    if(x.id == edit_id){
                        x.task = input.value
                        document.getElementById(edit_id).innerText = input.value;
                    }
                })
                
                    
                button.innerHTML = "Add Task"
                input.value=""
                localStorage["todo"] =JSON.stringify(data)
                return;
            }
            
            data.push({task:value, date: date, id:idCount})
            localStorage["todo"] =JSON.stringify(data)
            // mainItem = JSON.parse(localStorage["todo"])
            input.value = "";
        }else{
            localStorage["todo"] = JSON.stringify([{task:value, date: date, id:idCount}])
            // mainItem = JSON.parse(localStorage["todo"]);
            input.value = "";
        }
        edit.setAttribute("class", "edit btn btn-primary");
        // edit.setAttribute("data-type", idCount);
        edit.innerText = "Edit";
        edit.onclick = editElement;
        del.setAttribute("class", "delete btn btn-danger");
        del.innerText = "Delete";
        del.onclick = delElement;
        para.innerHTML = `<span id=${idCount}>` +value +  "</span>" + "  " + '---' + '<i>' + new Date().toDateString() + '</i>'
        line.append(para)
        line.append(edit)
        line.append(del)
        list.append(line);
        
        // list.append();
    }
    
    function editElement(e){
       let content=e.target.parentElement.firstElementChild.firstElementChild.textContent;
    //    console.log(content)
       document.getElementById("taskName").value = content;
       document.getElementById("saveButton").textContent = "Update";
       edit_id = e.target.parentElement.firstElementChild.firstElementChild.id
       console.log(edit_id)

    }

    delElement =(e)=>{
        e.preventDefault();
        edit_id = e.target.parentElement.firstElementChild.firstElementChild.id
        console.log(edit_id)
        // let item = e.target.parentElement.firstElementChild.firstElementChild.//.getAttribute("id");
        console.log(edit_id +" this is the index of item to be removed")
        e.target.parentElement.style.display = 'none';
        let data = JSON.parse(localStorage['todo'])
        data.forEach((x,i)=>{
            if(x.id == edit_id){
                console.log("tis is the index " +i)
                data.splice(i,1)
            }
        })
        console.log(data)
        localStorage['todo'] = JSON.stringify(data)

    }
   
    mainItem.forEach(element => {
        let value = input.value;
        let date = new Date().toISOString();
        let line = document.createElement("div");
        let edit = document.createElement("button");
        let del = document.createElement("button");
        let para = document.createElement("p");
        edit.setAttribute("class", "edit btn btn-primary");
        edit.setAttribute("data-type", element.id);
        edit.innerText = "Edit";
        edit.onclick = editElement;
        del.setAttribute("class", "delete btn btn-danger");
        del.innerText = "Delete";
        del.onclick = delElement;

        para.innerHTML = `<span id=${element.id}>` +  element.task + "</span>" + "  " + '---'+ '<i>' + new Date().toDateString() + '</i>'
        line.append(para)
        line.append(edit)
        line.append(del)
        list.append(line);
    });



})

const id = function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  console.log(id())