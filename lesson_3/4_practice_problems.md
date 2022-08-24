# 1.
- Every object created with a factory function has a full copy of all the methods, which is redundant and could place a heavy load on system memory.
- There is no way to inspect an object and learn whether it was created with a factory function or which factory function created it. That effectively makes it impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics.

# 2.
```js
function makeObj() {
  return {
    propA = 10,
    propA = 20,
  };
}
```

# 3.
```js
function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    
    total() {
      return this.phone + this.internet;
    }
  };
}
```

# 4.
```js
function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,

    total() {
      return this.amount || this.phone + this.internet;
    }
  };
}
```

# 5.
```js
function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],
    
    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      this.payments = this.payments.concat(payments);
    },

    paymentTotal() {
      let paymentTotal = 0;
      this.payments.forEach(payment => paymentTotal += payment.total());
      return paymentTotal;
    },

    amountDue() {
      return this.total() - this.paymentTotal();
    }
  };
}
```