const togglePlayerControl = (player, playerControl) => {
  if (player.paused) {
    player.play();
    playerControl.classList.remove(`player-control--play`);
    playerControl.classList.add(`player-control--pause`);
    return;
  }
  player.pause();
  playerControl.classList.remove(`player-control--pause`);
  playerControl.classList.add(`player-control--play`);
};

export {togglePlayerControl};
