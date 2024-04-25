const sidebarSection = document.querySelector('.sidebar-section');
const rBtn = document.querySelector('.r-btn');
const rightBtn = document.querySelector('.right-btn');

rBtn.addEventListener('click', function() {
  sidebarSection.classList.toggle('slide');
  // Toggle the 'shift' class to move the button along with the sidebar
  rightBtn.classList.toggle('shift');
});


////////////////

const slider = document.getElementById("myRange");
const output = document.getElementById("sliderValue");

// Display the default slider value
output.innerHTML = `$ ${slider.value}`;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = `$ ${this.value}`;
};



const daysSlider = document.getElementById('daysSlider');
const daysCount = document.getElementById('daysCount');

daysSlider.oninput = function() {
  daysCount.textContent = this.value;
};
