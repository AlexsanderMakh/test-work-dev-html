import "./styles.scss";

document.addEventListener("DOMContentLoaded", () => {
  alert("JavaScript загружен и работает!");

  const phoneInputField = document.querySelector("#phone");
  const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      fetch("https://ipinfo.io/json", {
        headers: { Accept: "application/json" },
      })
        .then((resp) => resp.json())
        .then((resp) => callback(resp.country))
        .catch(() => callback("us"));
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  $("#range-slider-1").ionRangeSlider({
    skin: "round",
    min: 1,
    max: 12,
    from: 1,
    step: 1,
    grid: true,
    grid_snap: false,
    grid_num: 11,
    prettify: function (num) {
      return num + (num === 1 ? " month" : " months");
    },
    onChange: function () {
      calculateProfit();
    },
  });

  $("#range-slider-2").ionRangeSlider({
    skin: "round",
    min: 300,
    max: 15000,
    from: 2000,
    step: 100,
    grid: true,
    grid_snap: false,
    prettify: function (num) {
      return "€ " + num.toLocaleString();
    },
    onChange: function () {
      calculateProfit();
    },
  });

  function calculateProfit() {
    const slider1 = $("#range-slider-1").data("ionRangeSlider");
    const slider2 = $("#range-slider-2").data("ionRangeSlider");

    const months = slider1.result.from;
    const amount = slider2.result.from;
    const profit = (amount * months * 0.1).toFixed(0);
    $("#result").text("€ " + profit);
  }

  calculateProfit();

  $(".slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
    fade: false,
    cssEase: "linear",
  });

  const burger = document.getElementById("burger-menu");
  const navLinks = document.getElementById("nav-links");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  document.getElementById("submitBtn").addEventListener("click", (event) => {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const errorMessage = document.getElementById("error");
    errorMessage.style.display = "none";

    if (!firstName || !lastName || !email || !phone) {
      errorMessage.style.display = "block";
    } else {
      alert("Grazie per la registrazione!");
      // Здесь можно добавить код для отправки данных формы на сервер
    }
  });
});
