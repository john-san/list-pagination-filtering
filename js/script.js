/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
// var to store student list
const studentList = document.querySelectorAll("li.student-item");
console.log(studentList.length);
// var to store number of items to show on each page, max of 10 per page
const itemsPerPage = 10;



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
const showPage = (list, page) => {
   const startIdx = (page * itemsPerPage) - (itemsPerPage + 1);
   const endIdx = (page * itemsPerPage) - 1;

   // loop over list
   for (let i = 0; i < list.length; i++) {
      // if within indexes, display
      const li = list[i];
      if (i >= startIdx && i <= endIdx) {
         // console.log('show');
         li.style.display = '';
      } else {
         // console.log('hide');
         li.style.display = 'none';
      }
   }
      
   // end loop
}

showPage(studentList, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   // container div
   const container = document.querySelector('div.page');
   // create div
   const div = document.createElement('div');
   // add class .pagination to div
   div.className = 'pagination';
   // create ul
   const ul = document.createElement('ul');
   // append to div
   div.appendChild(ul);
   // var to store total list items.  Math.ceil(list.length / itemsPerPage)  
   const totalLi = Math.ceil(list.length / itemsPerPage);
   
   // for loop on totalLi
   for (let i = 1; i <= totalLi; i++) {
      const li = document.createElement('li');
      // create li
      // create a
      const a = document.createElement('a');
      // a's attribute  href='#'
      a.href = '#';
      // a's textContent = number
      a.textContent = i;
      // append a to li
      li.appendChild(a);
      // append li to ul
      ul.appendChild(li);
   // end for loop
   }

   container.appendChild(div);
}

appendPageLinks(studentList);



// Remember to delete the comments that came with this file, and replace them with your own code comments.