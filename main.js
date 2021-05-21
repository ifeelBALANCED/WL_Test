import './style.css';

const detailedCall = () => {
    const trs = document.querySelectorAll('tbody > tr');
    trs.forEach(tr => {
        tr.addEventListener('click', evt => {
            renderModal(evt);
        });
        const last = tr.lastElementChild;
        last.addEventListener('click', evt => {
            evt.stopPropagation();
            tr.remove();
        });
    });
}

const modalContent = (num, name, username, email, site) => `
      № - ${num},
      Name - ${name},
      Username - ${username},
      Email - ${email},
      Website - ${site}
`
const fetchUsers = async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const res = await fetch(url);
        const users = await res.json();
        initialize(users);
        detailedCall()
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
    detailedModalBody.textContent = modalContent(num, name, username, email, site);
    showDetailedModal();
};

const usersContent = (name, username, email, website, id) => `
         <tr>
           <td>${id}</td>
           <td>${name}</td>
           <td>${username}</td>
           <td>${email}</td>
           <td>
              <a class="effect">${website}</a>
           </td>
           <td>Delete</td>
         </tr>
`
const initialize = users => {
    let wrapper = document.querySelector('tbody');
    users.map(({name, username, email, website, id}) => {
        wrapper.innerHTML += usersContent(name, username, email, website, id);
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
        idx = 0;
    form.reset();
    if (!name || !username || !email || !website) return;

    let newTr = document.createElement('tr');
    newTr.innerHTML += usersContent(name, username, email, website, new Date().getUTCSeconds());

    newTr.addEventListener('click', evt => {
        renderModal(evt);
    });

    newTr.lastElementChild.addEventListener('click', evt => {
        evt.stopPropagation();
        newTr.remove();
    });

    tbody.insertBefore(newTr, tbody.lastElementChild.nextSibling);
    closeModal();
};

const sortTable = n => {
    let table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        cnt = 0;
    table = document.querySelector('.styled-table');
    switching = true;
    dir = 'asc';
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName('tr');
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('td')[n];
            y = rows[i + 1].getElementsByTagName('td')[n];
            if (dir === 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            cnt++;
        } else {
            if (cnt === 0 && dir === 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
    }
};
const sortNumber = () => {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector('.styled-table');
    switching = true;
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName('tr');
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('td')[0];
            y = rows[i + 1].getElementsByTagName('td')[0];
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
};
const tableHeaders = document.querySelectorAll(
    'thead > tr > th:not(th:first-child):not(th:last-child)'
);
const tableNumber = document.querySelectorAll('thead > tr > th:first-child');
tableHeaders.forEach(header => {
    header.addEventListener('click', () => sortTable(0));
});
tableNumber.forEach(number => {
    number.addEventListener('click', () => sortNumber());
});
closeModalButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', closeModal);
});

const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', onSubmit);

const overlay = document.getElementById('overlay'),
    detailedModal = document.getElementById('detailed-modal'),
    closeBtn = document.getElementById('close-btn');

const showDetailedModal = () => {
    overlay.classList.add('is-visible');
    detailedModal.classList.add('is-visible');
};
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('is-visible');
    detailedModal.classList.remove('is-visible');
});
overlay.addEventListener('click', () => {
    overlay.classList.remove('is-visible');
    detailedModal.classList.remove('is-visible');
});
