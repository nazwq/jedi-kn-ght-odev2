const task = document.querySelector('#task') // kullanıcıdan alınacak veriyi değişkene tanımladık
let list = document.querySelector('#list') // kullanıcıdan alınacak veriyi <li> etiketi ile HTML aktarmak için tanımlama yaptık
let focs = document.querySelector('#liveToastBtn')


// her bir kullanıcı verisi için oluşturulacak kaldırma butonu eklenmesi

document.querySelectorAll("#list > li").forEach((element) => {
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`;
    deleteBtn.classList.add("removeBtn")
    element.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", removeElement);
  });
// butonun kaldırma işlemi yapması için fonksiyon
function removeElement() {
  this.parentElement.remove(); 
}


document.querySelectorAll("#list > li").forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle("done")
    })
  })

function newElement() {
    if (task.value.length > 0 && task.value != "hiçbir şey") { // burada verinin sıfır olmaması ve hiçbirşey yazılmaması için if koşulu kullandık
        let liDOM = document.createElement('li'); // li tag ı yarattık
        liDOM.innerHTML = `${task.value}` // linin içine veriyi yazdırdık
        list.appendChild(liDOM) // bunu listeye append ettik (ekledik)
        $('.success').toast("show") // succes etiketi ile olumlu mesajı verdik
        let deleteBtn = document.createElement("button"); // silme butonu ekledik
        deleteBtn.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`; // butona fontawesome dan şekil ekledik
        deleteBtn.classList.add("removeBtn") // butona görev verdik
        liDOM.appendChild(deleteBtn); // butonu listeye append ettik
        deleteBtn.addEventListener("click", removeElement); // silme fonksiyonunu butona gömdük
        deleteBtn.addEventListener("click", removeStorage); // stroage a kaydetmek için fonksiyonu newElement fonksionunda kullanıyoruz ki işlemi buton a basıldığında yapılsın daha sonra tanımlayacaz
        addStorage() 
        
        liDOM.addEventListener("click", () => {
            liDOM.classList.toggle("done")
          })
        

    }
    else  {
        $('.error').toast("show") // eğer adam akıllı mesaj girilmediyse error ile hata mesajı vermesini sağladık
        
    }
    
}
task.addEventListener("keydown", (event) => { // enter a basıldığında ekle işlemi yapmak için bi fonksiyon keydown kullandık
    if (event.key === "Enter") {
      focs.click()
    }
  })

focs.addEventListener("click", () => {
    task.focus()
  })

  let localArray;

  if (localStorage.getItem("livalue")) {
    localArray = JSON.parse(localStorage.getItem("livalue"))
  } else {
    localArray = [];
  }

  function addStorage() {
    localArray.push(task.value);    
    localStorage.setItem("livalue", JSON.stringify(localArray))
  }

    localArray.forEach((element) => {
    let liDOM = document.createElement("li")
    liDOM.innerHTML = element;
    list.appendChild(liDOM)

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`;
    deleteBtn.classList.add("removeBtn")
    liDOM.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", removeElement); 
    deleteBtn.addEventListener("click", removeStorage);

    liDOM.addEventListener("click", () => {
        liDOM.classList.toggle("done")
      })
    })

    function removeStorage() {
        let indexNo= localArray.indexOf(this.parentElement.textContent) 
        localArray.splice(indexNo,1)
        localStorage.setItem("livalue",JSON.stringify(localArray))
        }
        