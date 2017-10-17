<div class="layer">
  <div class="main" id="main">
    <h1 class="main-h1">this is a layer <%= name %></h1>
    <p>一个组件</p>
    <img src="${ require('../../images/4.png') }" alt="">
    <ul>
      <% for (var i = 0; i < arr.length; i++) { %>
        <li><%= arr[i] %></li>
      <% } %>
    </ul>
  </div>
</div>
