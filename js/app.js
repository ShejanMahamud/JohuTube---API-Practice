const loadVidoes = async (ids) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/videos/category/${ids}`);
    const data = await res.json();
    
    displayVideos(data.data);

}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = ""
    if(videos.length === 0 ){
       const div =  document.createElement("div");
       div.innerHTML = `
       <div
       class="inline-flex items-center flex-col gap-5 justify-center w-full mx-auto col-start-1 col-end-5"
     >
       <img src="./assets/images/error.svg" alt="error.svg" />
       <div role="alert" class="alert alert-error">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           class="stroke-current shrink-0 h-6 w-6"
           fill="none"
           viewBox="0 0 24 24"
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             stroke-width="2"
             d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
           />
         </svg>
         <span>Error! No Vidoes Found</span>
       </div>
     </div>
       `
       videosContainer.appendChild(div);
    }
    videos.forEach(video => {
        const div = document.createElement("div");
        div.classList.add("flex","flex-col","items-start","gap-1");
        div.innerHTML = `
          <div class="w-full h-[300px]">
            <img
              src="${video.thumbnail}"
              alt="thumbnail.jpg"
              class="rounded-lg w-full h-full"
            />
          </div>
          <div class="flex items-center my-3 justify-between gap-5">
            <img
              src="${video.authors[0].profile_picture}"
              alt="profile.png"
              class="rounded-full w-10 h-10"
            />
            <p class="text-base font-semibold">
            ${video.title}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <p class="font-medium text-base text-gray-600">${video.authors[0].profile_name}</p>
            <img src="./assets/icons/verified.svg" alt="verified.svg"/>
          </div>
          <div class="flex items-center justify-between gap-3">
            <p class="text-gray-500 font-normal">${video.others.views} Views</p>
          </div>
        `
        videosContainer.appendChild(div);
    });
    
}

const convertToDate = (postedDate) => {
    // Assuming the starting date is January 1, 1970 (Unix epoch)
    const startDate = new Date("1970-01-01");

    // Number of days to add
    const daysToAdd = parseInt(postedDate);

    // Calculate the valid date
    const validDate = new Date(startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    // Extract day, month, and year
    const day = validDate.getDate();
    const month = validDate.toLocaleString('default', { month: 'short' });
    const year = validDate.getFullYear();

    return `${day} ${month} ${year}`;
};


