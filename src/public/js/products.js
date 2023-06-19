var cId = document.getElementById("miInput").value;
var ppId = document.getElementById("miInput2").value;

console.log("xxx ppid ", ppId);
//req.session.cId =cId;addToCartForm



const addToCartForms = document.querySelectorAll('[id^="addToCartForm-"]');
const logout= document.getElementById("logout");
const remove= document.getElementById("remove");

console.log("remove " , remove);
//const remove = document.querySelectorAll('[id^="remove-"]');



addToCartForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //const cId = form.querySelector("#cid").value;
    const pId = form.getAttribute("id").split("-")[1];

    const pTitle = form.closest("div").querySelector("h5").textContent;

    fetch(`/api/carts/${cId}/product/${pId}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Product added to cart",
          text: `You added 1 unit of ${pTitle}`,
          toast: true,
          position: "top-right",
          icon: "success",
        
        });
      })
      .catch((error) => console.log(error));
  });
});

logout.addEventListener("click",(e)=>{
  fetch(`/api/sessions/logout`, {
    method: "GET",
  }) .then(() => {
    Swal.fire({
      title: "Logout successful",
      text: `Redirecting  the login`,
      allowOutsideClick: false,
      confirmButton: false,
      icon: "success",
      timer: 3000,
      //timerProgressBar: true,
      customClass: {
        popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
        confirmButton: "!bg-blue-600 !px-5",
        timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
      },
      willClose: () => {
        window.location.href = "/";
      }
      
    });
  })
  .catch((error) => console.log(error));

});


/*

remove.addEventListener("click",(e)=>{
  fetch(`/api/products/${ppId}`, {
    method: "DELETE",
  }) .then(() => {
    Swal.fire({
      title: "Remove to cart ",
      text: `Only be deleted if you are an administrator`,
      allowOutsideClick: false,
      confirmButton: false,
      icon: "success",
      timer: 3000,
      //timerProgressBar: true,
      customClass: {
        popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
        confirmButton: "!bg-blue-600 !px-5",
        timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
      },
      willClose: () => {
        window.location.href = "/products";
      }
      
    });
  })
  .catch((error) => console.log(error));

});
*/


///////////////////////////////////////////////////////////////

const removeFromCartForms = document.querySelectorAll(
  '[id^="removeFromCartForm-"]'
);

const cartId = document.getElementById("miInput").textContent;

removeFromCartForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const productId = form.getAttribute("id").split("-")[1];
    // const prodTitle = form
    //   .closest(".max-w-4xl")
    //   .querySelector("h5").textContent;
 
    //alert(productId)
    fetch(`/api/products/${ppId}`, {
      method: "DELETE",
    })
      .then(() => {
        Swal.fire({
          title: "Remove to cart ",
          text: `Only be deleted if you are an administrator`,
          allowOutsideClick: false,
          confirmButton: false,
          icon: "success",
          timer: 3000,
        
        });
        setTimeout(() => {
          location.reload();
        }, 4000);
      })
      .catch((error) => console.log(error));
  });
});