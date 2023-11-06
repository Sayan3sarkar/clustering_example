process.on("message", (msg) => {
  const jsonRes = isPrime(msg.number);
  process.send(jsonRes);
  process.exit(0);
});

function isPrime(num) {
  let isPrime = true;

  if ([0, 1].includes(num)) {
    isPrime = false;
    end = new Date();
    return {
      isPrime,
      num,
    };
  } else {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    return {
      num,
      isPrime,
    };
  }
}
