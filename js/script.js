// Globals
const studentList = document.querySelectorAll("li.student-item");
const itemsPerPage = 10;
const container = document.querySelector('div.page');

// re-usable helpers
const createElement = (el, prop, val, prop2 = null, val2 = null) => {
   const element = document.createElement(el);
   element[prop] = val;
   if (prop2 !== null && val2 !== null) {
      element[prop2] = val2;
   }
   return element;
}
const createTree = (...nodes) => {
   for (let i = 0; i < nodes.length - 1; i++) {
     const parent = nodes[i];
     const child = nodes[i + 1];
     parent.appendChild(child);
   }
}

// helper function that updates active page number
const updateActiveLink = (page) => {
   const paginationLinks = document.querySelectorAll('.pagination ul li a');
   for (let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].className = '';
   }
   paginationLinks[page - 1].className = 'active';
}

// displays set of students
const showPage = (list, page) => {
   updateActiveLink(page);

   const startIdx = (page * itemsPerPage) - (itemsPerPage);
   const endIdx = (page * itemsPerPage);

   for (let i = 0; i < list.length; i++) {
      const li = list[i];
      if (i >= startIdx && i < endIdx) {
         li.style.display = '';
      } else {
         li.style.display = 'none';
      }
   }
}

// adds page numbers to bottom
const appendPageLinks = (list) => {
   const div = createElement('div', 'className', 'pagination');
   const ul = document.createElement('ul');

   const totalLi = Math.ceil(list.length / itemsPerPage);
   for (let i = 1; i <= totalLi; i++) {
      const li = document.createElement('li');
      const a = createElement('a', 'href', '#', 'textContent', i);
      createTree(ul, li, a);
   }

   createTree(container, div, ul);

   // runs showPage when a page number is clicked 
   div.addEventListener('click', (e) => {
      if (e.target.tagName === "A") {
         const a = e.target;
         const pageNumber = a.textContent;
         showPage(studentList, pageNumber);
      }
   });
}

const addSearchBar = () => {
   const pageHeader = container.firstElementChild;
   const div = createElement('div', 'className', 'student-search');
   const input = createElement('input', 'placeholder', 'Search for students...');
   const button = createElement('button', 'textContent', 'Search');
   div.appendChild(input);
   div.appendChild(button);
   pageHeader.append(div);
}




// initialize app
appendPageLinks(studentList);
showPage(studentList, 1);
addSearchBar();