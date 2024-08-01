document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: Complete");
        initApp();
    }
});

const initApp = () => {
    let num = document.querySelector(".view").childElementCount;
    console.log(num);
    addItem();
    //deleteItem();
    deleteItem2();
    //fetchDadJoke();
  
}

const addItems = () => {
    let num = document.querySelector(".view").childElementCount;

    const view = document.querySelector(".view");
    const item =document.createElement("div");
    const heading = document.createElement("h2");
    const content = document.createElement("p");

    item.classList.add("item");
    content.classList.add("content");

    heading.textContent = `Joke N:${num + 1} `;
    content.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sit, nam ullam recusandae porro reprehenderit?";

    item.append(heading);
    item.append(content);

    view.append(item);

    console.log(num);
}

const addItem = async () => {
    const button = document.querySelector("button");
    button.addEventListener("click", async (event) => {
        let num = document.querySelector(".view").childElementCount;

        const view = document.querySelector(".view");
        const item =document.createElement("div");
        const itemHeader = document.createElement("div");
        const heading = document.createElement("h2");
        const deleteBtn = document.createElement("button");
        const img = document.createElement("img");
        const content = document.createElement("p");
    
        item.classList.add("item");
        itemHeader.classList.add("item-header");
        deleteBtn.classList.add("dlt-btn");
        content.classList.add("content");         
        heading.textContent = `Joke N:${num} `;
        img.src = "img/314864_trash_can_icon.png";
        img.alt = "Delete this joke";
        img.title = "Delete this joke";
        img.width = "32";
        img.height = "32";
        content.textContent = await fetchDadJoke();

        deleteBtn.addEventListener("click", (event) => {
            item.remove();

            const items = view.querySelectorAll(".item");
            let i = 0;
           
            items.forEach((item) => {
                const heading = item.querySelector("h2");
                i ++;
                heading.textContent = `Joke N:${i}`;
            })
           
        })

        deleteBtn.append(img);
        
        itemHeader.append(heading);
        itemHeader.append(deleteBtn);

        item.append(itemHeader);
        item.append(content);
    
        view.append(item);
    
        console.log(num);
    })
}

const fetchDadJoke = async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
    const jsonResponse = await response.json();

    return jsonResponse.joke;
}

const deleteItem = () => {
    const item = document.querySelector(".item");
    const button = item.querySelector(".dlt-btn");

    button.addEventListener("click", (event) => {
        item.remove();
    })
}

const deleteItem2 = () => {
    const items = document.querySelectorAll(".item");
    items.forEach((item) => {
        const button = item.querySelector(".dlt-btn");

        button.addEventListener("click", (event) => {
            item.remove();
        })

        // those two versions didn't work as intended. We couldn't add the eventListeners to all items, so we came with a new approach: we will create the eventListener when creating the item, so we moved the logic of this function to addItem()
    })
}

