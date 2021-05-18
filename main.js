import './style.css'


const fetchUsers = async () => {
    try {
        const url = "https://jsonplaceholder.typicode.com/users";
        const res = await fetch(url);
        const users = await res.json();
        initialize(users)
        const trs = document.querySelectorAll('tbody > tr')
        trs.forEach(tr => tr.addEventListener('click', (evt) => {
            const modalBody = document.querySelector('.modal-body'),
                trValue = evt.currentTarget.innerText
            const [num, name, username, email, site] = trValue.split('\t')
            modalBody.textContent = `
            № - ${num},
            Name - ${name},
            Username - ${username},
            Email - ${email},
            Website - ${site}
            `
            openModal()
        }))
    } catch ({message}) {
        console.log(`An error has occurred: ${message}`)
    }
};

const initialize = users => {
    let wrapper = document.querySelector("tbody");
    users.forEach(
        ({name, username, email, website, id}) => {
            wrapper.innerHTML += `
         <tr>
           <td>${id}</td>
           <td>${name}</td>
           <td>${username}</td>
           <td>${email}</td>
           <td>
              <a class="effect">${website}</a>
           </td>
           <td>
              <i class="fas fa-user-times"></i>
           </td>
         </tr>
        `
        }
    );
}


fetchUsers();


const modal = document.querySelector(".modal"),
    closeModalButtons = document.querySelectorAll(".close-modal");

const openModal = () => modal.classList.add("visible");

const closeModal = () => modal.classList.remove("visible");

closeModalButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", closeModal);
});
