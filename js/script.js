/* Globals */
const studentList = document.querySelectorAll("li.student-item");
let tempList = studentList;
const itemsPerPage = 10;
const container = document.querySelector('div.page');
const studentListUl = document.querySelector('ul.student-list');

/* Helper Functions */
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

const removeIfExists = (node) => {
   if (document.querySelector(node)) {
      const child = document.querySelector(node);
      const parent = child.parentNode;
      parent.removeChild(child);
   }
}

const updateActiveLink = (page) => {
   const paginationLinks = document.querySelectorAll('.pagination ul li a');
   for (let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].className = '';
   }
   paginationLinks[page - 1].className = 'active';
}

/* Main Functions */

// displays set of students
const showPage = (list, page) => {
   const resultsFound = list.length > 0;

   if (resultsFound) {
      removeIfExists("div.no-results");
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
   } else {
      // if the no-results div doesn't exists, create one
      if (!document.querySelector("div.no-results")) {
         const div = createElement('div', 'className', 'no-results');
         const p = createElement("p", "textContent", "No results found.");
         div.appendChild(p);
         container.insertBefore(div, studentListUl);
      }
   }

}

// adds page numbers to bottom
const appendPageLinks = (list) => {
   removeIfExists("div.pagination");

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
         showPage(tempList, pageNumber);
      }
   });
}

const addSearchBar = () => {
   const pageHeader = container.firstElementChild;
   const form = createElement('form', 'className', 'student-search');
   const input = createElement('input', 'placeholder', 'Search for students...');
   const button = createElement('button', 'textContent', 'Search');
   createTree(pageHeader,form,input);
   form.appendChild(button);

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value;
      conductSearch(text);
   }); 

   input.addEventListener('keyup', (e) => {
      const text = input.value;
      conductSearch(text);
   });
}


const conductSearch = (text) => {
   tempList = [];
   for (let i = 0; i < studentList.length; i++) {
      const studentLi = studentList[i];
      const studentName = studentList[i].querySelector('h3').textContent;
      if (studentName.includes(text)) {
         studentLi.style.display = '';
         tempList.push(studentLi);
      } else {
         studentLi.style.display = 'none';
      }
   }

   // render & paginate results
   appendPageLinks(tempList);
   showPage(tempList, 1);
}
   



/* Initialize App */ 
appendPageLinks(studentList);
showPage(studentList, 1);
addSearchBar();