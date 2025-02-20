
function getProductDetails() {
    let product = {
        name: document.querySelector("h1")?.innerText || "No title found",
        price: document.querySelector(".price")?.innerText || "No price found",
        description: document.querySelector("meta[name='description']")?.content || "No description found",
        image: document.querySelector("img")?.src || ""
    };

    chrome.storage.local.get({ wishlist: [] }, (data) => {
        let updatedWishlist = [...data.wishlist, product];
        chrome.storage.local.set({ wishlist: updatedWishlist }, () => {
            console.log("Product saved!", product);
            alert("Product added to your wishlist!");
        });
    });
}

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "save_product") {
        getProductDetails();
    }
});

getProductDetails();
