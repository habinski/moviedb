<template>
  <footer>
    <a href>
      <img class="poweredby" src="@/assets/poweredby.svg" alt="Powered by TMdb" />
    </a>
    <div>
      <h5 class="basics-block">THE BASICS</h5>
      <a href="#">About</a>
      <a href="#">Contact me</a>
    </div>
    <div class="legal-block">
      <h5>Legal</h5>
      <a href="#">Terms of Use</a>
      <a href="#">Privacy Policy</a>
    </div>
    <a href>
      <img class="footerlogo" src="@/assets/footerlogo.svg" alt="Created by" />
    </a>
  </footer>
</template>


<style lang="scss" scoped>
footer {
  background: linear-gradient(100deg, #131313 40%, #696969 95%);
  min-height: 300px;
  width: 100%;
  margin-top: 55px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
}
div,
img {
  margin: 20% 50px 20% 50px;
  display: grid;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    transition: 0.3s;
  }
  h5 {
    margin-bottom: 10px;
    font-size: 22px;
  }
  img {
    width: 200px;
  }
}
a:hover {
  opacity: 0.7;
}
@media (max-width: 600px) {
  footer {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    row-gap: 20px;
    div {
      margin: 25px;
    }
  }
}
@media (min-width: 600px) and (max-width: 1000px) {
  footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // grid-template-rows: 1fr, 1fr;
    row-gap: 20px;
    div {
      margin: 25px;
    }
  }
}
</style>
