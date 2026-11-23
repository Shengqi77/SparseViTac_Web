const tasks = [
  ["flowers", "Flower arrangement", "ALOHA", 55],
  ["tofu", "Tofu collection", "ALOHA", 85],
  ["board", "Blackboard cleaning", "ALOHA", 80],
  ["plug", "Plug insertion", "Flexiv", 75],
  ["earphones", "Earphone insertion", "Flexiv", 60],
  ["peg", "Peg insertion", "Flexiv", 65]
];
const player = document.querySelector("#demo");
const buttons = document.querySelector("#choices");
for (const [id, title, platform, rate] of tasks) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = title;
  button.setAttribute("aria-pressed", String(id === "flowers"));
  button.onclick = () => {
    for (const item of buttons.children) item.setAttribute("aria-pressed", String(item === button));
    player.pause();
    player.poster = "assets/" + id + ".jpg";
    player.src = "assets/" + id + ".mp4";
    document.querySelector("#description").textContent = title + " · " + platform;
    player.play().catch(() => {});
  };
  buttons.append(button);
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = "<span>" + title + "</span><span class='track' aria-hidden='true'><i style='width:" + rate + "%'></i></span><b>" + rate + "%</b>";
  document.querySelector("#bars").append(row);
}
