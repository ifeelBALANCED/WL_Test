import './style.css';

const fetchUsers = async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const res = await fetch(url);
        const users = await res.json();
        initialize(users);
        const trs = document.querySelectorAll('tbody > tr');
        trs.forEach(tr =>
            tr.addEventListener('click', evt => {
                renderModal(evt);
            })
        );
    } catch ({message}) {
        console.log(`An error has occurred: ${message}`);
    }
};

const renderModal = evt => {
    const detailedModalTitle = document.querySelector('.detailed-modal-title'),
        detailedModalBody = document.querySelector('.detailed-modal-body'),
        trValue = evt.currentTarget.innerText;
    const [num, name, username, email, site] = trValue.split('\t');
    detailedModalTitle.textContent = 'Detailed info';
    detailedModalBody.textContent = `
      № - ${num},
      Name - ${name},
      Username - ${username},
      Email - ${email},
      Website - ${site}
  `;
    showDetailedModal();
};

const initialize = users => {
    let wrapper = document.querySelector('tbody');
    users.map(({name, username, email, website, id}) => {
        wrapper.innerHTML += `
         <tr>
           <td>${id}</td>
           <td>${name}</td>
           <td>${username}</td>
           <td>${email}</td>
           <td>
              <a class="effect">${website}</a>
           </td>
         </tr>
        `;
    });
};

fetchUsers();

const openModal = () => modal.classList.add('visible');

const closeModal = () => modal.classList.remove('visible');
const openModalButtons = document.querySelectorAll('.open-modal'),
    modal = document.querySelector('.modal'),
    closeModalButtons = document.querySelectorAll('.close-modal');

openModalButtons.forEach(openBtn => {
    openBtn.addEventListener('click', openModal);
});

const onSubmit = event => {
    event.preventDefault();
    let name = document.querySelector('#name').value,
        username = document.querySelector('#username').value,
        email = document.querySelector('#email').value,
        website = document.querySelector('#website').value,
        form = document.querySelector('.modal-body'),
        tbody = document.querySelector('tbody'),
        allRows = document.querySelectorAll('tbody > tr');
    form.reset();
    if (!name || !username || !email || !website) return;

    let newTr = document.createElement('tr');
    newTr.addEventListener('click', evt => {
        renderModal(evt);
    });
    newTr.innerHTML += `
           <td>${allRows.length + 1}</td>
           <td>${name}</td>
           <td>${username}</td>
           <td>${email}</td>
           <td>
              <a class="effect">${website}</a>
           </td>
    `;
    tbody.insertBefore(newTr, tbody.lastElementChild.nextSibling);
    closeModal();
};

closeModalButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', closeModal);
});

const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', onSubmit);

const overlay = document.getElementById('overlay'),
    detailedModal = document.getElementById('detailed-modal'),
    closeBtn = document.getElementById('close-btn')

const showDetailedModal = () => {
    overlay.classList.add('is-visible');
    detailedModal.classList.add('is-visible');
}
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('is-visible');
    detailedModal.classList.remove('is-visible');
});
overlay.addEventListener('click', () => {
    overlay.classList.remove('is-visible');
    detailedModal.classList.remove('is-visible');
});
