let pageHeight = 0
let pHeight = 0 // Previous height

let stage2 = 2000;
let stage3 = 4000;
let stage4 = 6000;

let body = document.getElementById('body')

let contents = [
  document.getElementById('content1'),
  document.getElementById('content2'),
  document.getElementById('content3')
]
let index = 0;

let paused = false;

let bgStages = ['one-two', 'two-three', 'three-two', 'two-one']

document.addEventListener('wheel', (e) => {
  if (!paused) {
    pHeight = pageHeight
    pageHeight += e.deltaY

    // console.log(pHeight, pageHeight)
    // Scroll down
    if (pHeight <= stage2 && pageHeight > stage2) {
      // change bg from one to two
      body.classList.remove(...bgStages)
      body.classList.add('one-two')
      // initiate hide animation for stage1 content
      contents[index].classList.remove(['show-up', 'show-down'])
      contents[index].classList.add('hide-up')

      paused = true;
      setTimeout(() => {
        contents[index].classList.remove('hide-up')
        contents[index].classList.add('hidden')
        index++;
        if(index < 0) index = 0
        if(index > contents.length - 1) index = contents.length - 1
        // initiate show animation for stage 2 content
        contents[index].classList.remove('hidden')
        contents[index].classList.add('show-up')
        paused = false;
      }, 2000)
    }
    if (pHeight <= stage3 && pageHeight > stage3) {
      // change bg from two to three
      body.classList.remove(...bgStages)
      body.classList.add('two-three')
      // initiate hide animation for stage2 content
      contents[index].classList.remove(['show-up', 'show-down'])
      contents[index].classList.add('hide-up')

      paused = true;
      setTimeout(() => {
        contents[index].classList.remove('hide-up')
        contents[index].classList.add('hidden')
        index++;
        if(index < 0) index = 0
        if(index > contents.length - 1) index = contents.length - 1
        // initiate show animation for stage 3 content
        contents[index].classList.remove('hidden')
        contents[index].classList.add('show-up')
        paused = false;
      }, 2000)
    }


    // Scroll up
    if (pHeight >= stage2 && pageHeight < stage2) {
      // change bg from one to two
      body.classList.remove(...bgStages)
      body.classList.add('two-one')
      // initiate hide animation for stage1 content
      // initiate show animation for stage 2 content
      contents[index].classList.remove(['show-up', 'show-down'])
      contents[index].classList.add('hide-down')
      paused = true;
      setTimeout(() => {
        contents[index].classList.remove('hide-down')
        contents[index].classList.add('hidden')
        index--;
        if(index < 0) index = 0
        if(index > contents.length - 1) index = contents.length - 1
        // initiate show animation for stage 2 content
        contents[index].classList.remove('hidden')
        contents[index].classList.add('show-down')
        paused = false;
      }, 2000)
    }
    if (pHeight >= stage3 && pageHeight < stage3) {
      // change bg from three to two
      body.classList.remove(...bgStages)
      body.classList.add('three-two')
      // initiate hide animation for stage1 content
      // initiate show animation for stage 2 content
      contents[index].classList.remove(['show-up', 'show-down'])
      contents[index].classList.add('hide-down')
      paused = true;
      setTimeout(() => {
        contents[index].classList.remove('hide-down')
        contents[index].classList.add('hidden')
        index--;
        if(index < 0) index = 0
        if(index > contents.length - 1) index = contents.length - 1
        // initiate show animation for stage 2 content
        contents[index].classList.remove('hidden')
        contents[index].classList.add('show-down')
        paused = false;
      }, 2000)
    }
  }
})

