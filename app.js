showNotes()

// Code for Saving Note by clicking on Save Button
document.getElementById("save-note-btn").addEventListener('click', () => {
    let notes, notesObj;
    let currentDateObject;
    let newNoteList;

    if (document.getElementById("note-title").value == "" && document.getElementById("note-content").value == "") {
        alert("The Note Must Have Some Title and some Content");
    }

    else if (document.getElementById("note-title").value == "") {
        alert("The Note Must Have Some Title");
    }

    else if (document.getElementById("note-content").value == "") {
        alert("The Note Must Have Some Content");
    }

    else {

        currentDateObject = new Date();

        notes = localStorage.getItem('notes');

        if (notes != null) {
            notesObj = JSON.parse(notes);
        }
        else {
            notesObj = [];
        }

        newNoteList = [];
        newNoteList[0] = notesObj.indexOf(newNoteList);
        newNoteList[1] = document.getElementById("note-title").value;
        newNoteList[2] = document.getElementById("note-content").value;
        newNoteList[3] = `${currentDateObject.toUTCString().split(' ').slice(0, 4).join(' ')} ${currentDateObject.getHours()}:${currentDateObject.getMinutes()}:${currentDateObject.getSeconds()}`;
        newNoteList[4] = 'unstarred';

        notesObj.push(newNoteList);
        localStorage.setItem("notes", JSON.stringify(notesObj));

        location.reload();

    }
})

Array.from(document.getElementsByClassName("star-notes")).forEach((element) => {
    let notesId, notesObj, checkStarredVar;
    element.addEventListener("click", () => {
        notesId = element.id;
        let elementIndex = notesId.split("-")[2];
        notesObj = JSON.parse(localStorage.getItem('notes'));
        checkStarredVar = notesObj[elementIndex][4];
        if (checkStarredVar == 'starred') {
            notesObj[elementIndex][4] = 'unstarred';
        }
        else {
            notesObj[elementIndex][4] = 'starred';
        }
        localStorage.setItem('notes', JSON.stringify(notesObj));
        location.reload();
    })
})

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj;

    if (notes != null) {
        notesObj = JSON.parse(notes);
    }
    else {
        notesObj = [];
    }

    let html = "";
    let pinnedNotesHtml = "";
    notesObj.forEach(function (element, index) {

        if (element[4] == 'unstarred') {
            html += `
                        <div class="card my-3 noteCard" style="width: 81vw;">
                        <div class="card-body">
                            <h6> Note ${index + 1} </h6>
                            <div class="note-title-bar">
                            <h5 class="card-title">${element[1]}</h5>
                            <span class="material-icons star-notes" id="star-notes-${index}">
                                star_outline
                            </span>
                            </div>
                            <p class="card-text">${element[2]}</p>
                            <div class="note-title-bar">
                                <div>
                                    <button class="btn btn-primary delete-note" id="delete-note-${index}">Delete Note</button>
                                    <button class="btn btn-primary edit-note mx-2" id="edit-note-${index}" data-bs-toggle="modal" data-bs-target="#editNoteModal-${index}">Edit Note</button>
                                </div>
                                <b>Created on ${element[3]}</b>
                            </div>
                        </div>
                        </div>

                        <!-- Edit Note Modal -->
                        <div class="modal fade" id="editNoteModal-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editNoteModalLabel-${index}">Edit the Note</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                <div class="mb-3">
                                    <label for="note-title" class="form-label">Note Title</label>
                                    <input type="text" class="form-control" id="edit-note-title-${index}" aria-describedby="emailHelp">
                                </div>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" placeholder="Leave a Note here" style="height: 130px"
                                    id="edit-note-content-${index}"></textarea>
                                    <label for="note-content">Add a Note Here</label>
                                </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary editedNoteSaveBtn" id="edited-save-note-btn-${index}">Save Note</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        `;
        }

        else if (element[4] == 'starred') {
            pinnedNotesHtml += `
                        <div class="card my-3 starred-notes noteCard" style="width: 81vw;">
                        <div class="card-body">
                            <h6> Note ${index + 1} </h6>
                            <div class="note-title-bar">
                            <h5 class="card-title">${element[1]}</h5>
                            <span class="material-icons star-notes" id="star-notes-${index}">
                                star
                            </span>
                            </div>
                            <p class="card-text">${element[2]}</p>
                            <div class="note-title-bar">
                                <div>
                                    <button class="btn btn-primary delete-note" id="delete-note-${index}">Delete Note</button>
                                    <button class="btn btn-primary edit-note mx-2" id="edit-note-${index}" data-bs-toggle="modal" data-bs-target="#editNoteModal-${index}">Edit Note</button>
                                </div>
                                <b>Created on ${element[3]}</b>
                            </div>
                        </div>
                        </div>

                        <!-- Edit Note Modal -->
                        <div class="modal fade" id="editNoteModal-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editNoteModalLabel-${index}">Edit the Note</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                <div class="mb-3">
                                    <label for="note-title" class="form-label">Note Title</label>
                                    <input type="text" class="form-control" id="edit-note-title-${index}" aria-describedby="emailHelp">
                                </div>
                                <div class="form-floating mb-3">
                                    <textarea class="form-control" placeholder="Leave a Note here" style="height: 130px"
                                    id="edit-note-content-${index}"></textarea>
                                    <label for="note-content">Add a Note Here</label>
                                </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary editedNoteSaveBtn" id="edited-save-note-btn-${index}">Save Note</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        `;
        }
    });
    let notesElement = document.getElementById("notes");
    let pinnedNotesList = [];
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;

        notesObj.forEach(function(element,index){
            if (element[4] == "starred"){
                pinnedNotesList.push([index]);
            }
        })

        if (pinnedNotesList.length == 0){
            document.getElementsByClassName('pinnedNotesDisplayNone')[0].style.display = 'none';
            document.getElementsByClassName('pinnedNotesDisplayNone')[1].style.display = 'none';
            document.getElementsByClassName('pinnedNotesDisplayNone')[2].style.display = 'none';
            document.getElementsByClassName('pinnedNotesDisplayNone')[3].style.display = 'none';
        } else{
            document.getElementsByClassName("pinnedNotesParentDiv")[0].innerHTML = pinnedNotesHtml;
        }

    } 
    else {
        notesElement.innerHTML = `
        <div class="nothing-to-show-section">
          <img src="img/nothing-to-show.png" alt="" style="height: 15rem ;width: 25rem;">
          <h3>Your Notes Will Appear Here</h3>
        </div>`;
        
        document.getElementsByClassName('pinnedNotesDisplayNone')[0].style.display = 'none';
        document.getElementsByClassName('pinnedNotesDisplayNone')[1].style.display = 'none';
        document.getElementsByClassName('pinnedNotesDisplayNone')[2].style.display = 'none';
        document.getElementsByClassName('pinnedNotesDisplayNone')[3].style.display = 'none';
        document.getElementById("delete-all-notes-btn").style.display = 'none';
    }
}

document.getElementById("delete-all-notes-btn").addEventListener("click", () => {
    
    document.getElementById("delete-all-notes-btn").classList.add("btn-primary");
    document.getElementById("delete-all-notes-btn").classList.remove("btn-secondary");
    document.getElementById("delete-all-notes-btn").style.cursor = "pointer";

    let confirmDelete = confirm('Do You Really want to delete all your Notes');
    if (confirmDelete){
        localStorage.clear();
        location.reload();
}
})

// console.log(document.getElementsByClassName('delete-note'));

Array.from(document.getElementsByClassName('delete-note')).forEach((elementOfLoop)=>{
    elementOfLoop.addEventListener('click',function(element){
        let elementIndex = element.target.id.split('-')[2];
        let notes = localStorage.getItem("notes");
        let notesObj;
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        
        notesObj.splice(elementIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        location.reload()
    })
})

Array.from(document.getElementsByClassName('edit-note')).forEach((elementOfLoop)=>{
    elementOfLoop.addEventListener('click',function(element){
        element.preventDefault();
        let elementIndex = element.target.id.split('-')[2];
        let notes = localStorage.getItem("notes");
        let notesObj;
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        document.getElementById(`edit-note-title-${elementIndex}`).value = notesObj[elementIndex][1];
        document.getElementById(`edit-note-content-${elementIndex}`).value = notesObj[elementIndex][2];

        Array.from(document.getElementsByClassName('editedNoteSaveBtn')).forEach((SaveBtnElement)=>{
            SaveBtnElement.addEventListener('click',()=>{
                notesObj[elementIndex][1] = document.getElementById(`edit-note-title-${elementIndex}`).value;
                notesObj[elementIndex][2] = document.getElementById(`edit-note-content-${elementIndex}`).value;
                localStorage.setItem("notes", JSON.stringify(notesObj));
                location.reload();
            })
        })
    })
})

document.getElementById('searchBox').addEventListener('input',function(){
    document.getElementById('addNoteParentDiv').style.display = 'none';
    document.getElementById("delete-all-notes-btn").style.display = 'none';

    if (document.getElementById('searchBox').value == ''){
        document.getElementById('addNoteParentDiv').style.display = '';
        document.getElementById("delete-all-notes-btn").style.display = '';
        showNotes()
    }

    else{
        let notes = localStorage.getItem("notes");
        let notesObj;
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        let inputValue = document.getElementById('searchBox').value.toLowerCase();

        Array.from(document.getElementsByClassName('noteCard')).forEach((element)=>{
            let noteTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
            let noteContent = element.getElementsByTagName('p')[0].innerText.toLowerCase();
            let searchNotMatchList = [];

            let notes = localStorage.getItem("notes");
            let notesObj;
            if (notes == null) {
                notesObj = [];
            } else {
                notesObj = JSON.parse(notes);
            }

            if ( (noteTitle.includes(inputValue) || noteContent.includes(inputValue)) || (noteTitle.includes(inputValue) && noteContent.includes(inputValue)) ){
                // searchNotMatchList.push(0);
                // console.log(searchNotMatchList);
                element.style.display = '';
            }

            
            else{
                element.style.display = 'none';
                searchNotMatchList.push(0)
                // document.getElementsByClassName('pinnedNotesDisplayNone')[0].style.display = 'none';
                // document.getElementsByClassName('pinnedNotesDisplayNone')[1].style.display = 'none';
                // document.getElementsByClassName('pinnedNotesDisplayNone')[2].style.display = 'none';
                // document.getElementsByClassName('pinnedNotesDisplayNone')[3].style.display = 'none';

                // document.getElementById('notes').innerHTML += `
                // <div class="no-search-gif-parent-div">
                //     <img src="img/no-search-gig.gif" alt="" style="height: 21rem; width: 27rem;">
                // </div>
                // `;
            }

            // if(searchNotMatchList == notesObj.length && document.getElementById('searchBox').value != ''){
            //     document.getElementsByClassName('pinnedNotesDisplayNone')[0].style.display = 'none';
            //     document.getElementsByClassName('pinnedNotesDisplayNone')[1].style.display = 'none';
            //     document.getElementsByClassName('pinnedNotesDisplayNone')[2].style.display = 'none';
            //     document.getElementsByClassName('pinnedNotesDisplayNone')[3].style.display = 'none';

            //     document.getElementById('notes').innerHTML = `
            //     <div class="no-search-gif-parent-div">
            //         <img src="img/no-search-gig.gif" alt="" style="height: 21rem; width: 27rem;">
            //         <h5>No Results Founds </h5>
            //     </div>
            //     `;
            // }
            
        })

    }

})