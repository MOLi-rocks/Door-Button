const rpio = require('rpio');
const rp = require('request');
let timer;

rpio.open(11, rpio.INPUT, rpio.PULL_DOWN);

rpio.poll(11, check);

function open() {
  rp.post({url: 'http://localhost:3087/switch' }, (err, res, body) => {
    console.log(body);
  });
}

// button up -> HIGH
// button press -> LOW
function change(pin) {
  var status = rpio.read(11);

  if (status === rpio.HIGH)
    open();
}

function check(pin) {
  if (timer) {
     clearTimeout(timer);
  }

  timer = setTimeout( () => {
    change(pin);
  }, 300);
}
