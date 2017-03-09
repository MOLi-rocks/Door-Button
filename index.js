import rpio from 'rpio';
import rp from 'request';

let timer;

rpio.open(15, rpio.INPUT, rpio.PULL_DOWN);

open() {
  rp.post({url: 'http://localhost:3087/open' }, (err, res, body) => {
    console.log(body);
  }); 
}

// button up -> HIGH
// button press -> LOW
change(pin) {
  var status = rpio.read(pin);
  if (status === rpio.HIGH)
    open();
}

check(pin) {
  // console.log(rpio.read(pin));
  if (timer) {
     clearTimeout(timer);
  }
  timer = setTimeout(pin => {change(pin);}, 300);
}

rpio.poll(15, check);
