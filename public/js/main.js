$("#repositoryCollapseBtn").click(function () {
  $(this).toggleClass("active");
  if ($(this).hasClass("active")) {
    $(this).text("Show Repositories");
  } else {
    $(this).text("Hide Repositories");
  }
});
$("#snippetCollapseBtn").click(function () {
  $(this).toggleClass("active");
  if ($(this).hasClass("active")) {
    $(this).text("Show Code Snippets");
  } else {
    $(this).text("Hide Code Snippets");
  }
});

$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function () {
  $(".jumbotron").css({ height: $(window).height() + "px" });
});

// initialize code syntax highlighting
hljs.highlightAll();

const words = document.getElementsByClassName("word");
const wordArray = [];
let currentWord = 0;

words[currentWord].style.opacity = 1;
for (let i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  const cw = wordArray[currentWord];
  const nw =
    currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
  for (let i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (let i = 0; i < nw.length; i++) {
    nw[i].className = "letter behind";
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
  setTimeout(function () {
    cw[i].className = "letter out";
  }, i * 80);
}

function animateLetterIn(nw, i) {
  setTimeout(function () {
    nw[i].className = "letter in";
  }, 340 + i * 80);
}

function splitLetters(word) {
  const content = word.innerHTML;
  word.innerHTML = "";
  const letters = [];
  for (let i = 0; i < content.length; i++) {
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);
