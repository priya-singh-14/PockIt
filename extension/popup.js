document.addEventListener("DOMContentLoaded", () => {
    let wishlistEl = document.getElementById("wishlist");

    chrome.storage.local.get({ wishlist: [] }, (data) => {
        data.wishlist.forEach((item) => {
            let li = document.createElement("li");
            li.innerHTML = ` ${item.name} <img src="${item.image}" width="200"> ${item.price}`;
            wishlistEl.appendChild(li);
        });
    });
});
