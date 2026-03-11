---
title: Promise Combinators in JavaScript
date: March 1,2026
tags:
  - webdev
  - javascript
description: Understand promises through Minecraft
---

### The Biscuit Clan has issued a challenge.

We are the proud warriors of the **Chai Clan** ... we cannot afford to lose.

The stakes are high. Victory is **not optional.**

![Biscuit vs Chai](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/5fba4b50-5557-446e-85fa-2aa0b332f123.webp)

So our strategy team makes a bold decision:

> _“We need potions. Lots of them.”_

The plan sounds simple… in theory.

- Some members head out on dangerous quests to gather ingredients
    
- Others stay back to prepare the brewing stands
    
- And everything must happen **at the same time**


> "Even if you don't know about the game **Minecraft** you will still be able to understand the examples."

---

If this coordination sounds tricky…

Welcome to the exact problem that **asynchronous JavaScript** is built to solve.

### What are Promises in JavaScript?

A promise represents a value that isn't available yet. JavaScript is single-threaded, meaning it handles one task at a time.

However, our apps or in this case, the teams **gathering resources** for brewing potions and those **working in the lab** are progressing slowly.

In real life, API calls, database requests or file operations.

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/ca054706-0d87-4b5c-bf41-37a981290baa.png)

If JavaScript just waited for all of these to complete our page would freeze.

So we need **asynchronous code.**

That means we can start a thing that we know is gonna take a while, like a fetch request.

Rather than waiting for that code to finish, the rest of the code will keep executing, and once the slow process is ready, JavaScript will proceed with it.

---

### Scenario of the Chai lab

In the Chai lab we sent a team member to fetch ingredients for brewing a powerful potion.

The scout member needs to find the **Nether Wart.**

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/77b3e087-4031-40f7-8012-67f3cd811f8a.jpg)

but we don’t get the result immediately.

Instead, we receive a **scroll** that will report back later with either:

- **_Success_** (ingredient found)
    
- **_Failure_** (mission failed)
    

In JavaScript, that scroll is called a **Promise**.

```javascript
// A clan member goes to fetch Nether Wart
const fetchNetherWart = new Promise((resolve, reject) => {
  console.log("Scout sent to gather Nether Wart...");

  setTimeout(() => {
    const found = true; // this can be false

    if (found) {
      resolve("Success: Nether Wart secured!");
    } else {
      reject("Failure: Scout failed to find Nether Wart.");
    }
  }, 2000);
});



fetchNetherWart
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
```

Console output:

```bash
Scout sent to gather Nether Wart...
Nether Wart secured!
```

---

We created a Promise:

```javascript
new Promise((resolve, reject) => { ... })
```

The Promise has two possible outcomes:

- `resolve()` -> mission success
    
- `reject()` -> mission failed
    

**The task runs asynchronously**

```plaintext
setTimeout(() => { ... }, 2000);
```

This simulates the scout being out in the Nether.

We don’t know exactly when he’ll return, so we simulated with 2 seconds (2000 milliseconds)

---

We consume the result:

```plaintext
.then(...)
.catch(...)
```

- `.then()` -> runs on success
    
- `.catch()` -> runs on failure
    

---

### Promise Combinators

When we sent our scout on a mission, we didn’t immediately know the outcome.

Instead, we received a scroll which in this case is a **Promise**.

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/f7abed2b-e991-43f9-8015-51fc37b13547.jpg)

That scroll can be in one of three states:

- **Pending** - the scout is still on the mission
    
- **Fulfilled** - the scout succeeded
    
- **Rejected** - the scout failed
    

So far, we’ve only been dealing with **one scout** at a time.

But in real battles…

…we rarely send just one.

---

In the Chai Clan’s potion strategy, we often send **multiple scouts simultaneously**:

- one searching for **Nether Wart**
    
- one hunting **Blaze Powder**
    
- another looking for **Ghast Tears**
    

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/702bbc0b-88b6-436e-9c01-d8eeb941ac6c.jpg)

Now the real question becomes:

> **How do we manage multiple scrolls at once?**

This is exactly where **Promise combinators** enter the play.

---

### 1. `Promise.all()` All Scouts Must Succeed

For the Chai Clan to brew the ultimate potion, **every scout must return with their assigned ingredient**.

If even a single ingredient is missing…

> 💀 the potion fails and becomes corrupted.

This is exactly how `Promise.all()` behaves.

Let's write a Promise code that identifies exactly which scout failed. We wait for each Promise to resolve and reject immediately if any one fails:

```javascript
// Nether Wart scout
const netherWartScout = new Promise((resolve, reject) => {
  console.log("Nether Wart scout dispatched...");
  const missionSuccess = true;

  setTimeout(() => {
    if (missionSuccess) {
      resolve("Success: Nether Wart secured.");
    } else {
      reject("Failure: Nether Wart scout failed the mission.");
    }
  }, 2000);
});

// Blaze Powder scout
const blazePowderScout = new Promise((resolve, reject) => {
  console.log("Blaze Powder scout dispatched...");
  const missionSuccess = true;

  setTimeout(() => {
    if (missionSuccess) {
      resolve("Success: Blaze Powder secured.");
    } else {
      reject("Failure: Blaze Powder scout failed the mission.");
    }
  }, 1500);
});

// Ghast Tear scout (THIS ONE FAILS)
const ghastTearScout = new Promise((resolve, reject) => {
  console.log("Ghast Tear scout dispatched...");
  const missionSuccess = false; // set to false

  setTimeout(() => {
    if (missionSuccess) {
      resolve("Success: Ghast Tear secured.");
    } else {
      reject("Failure: Ghast Tear scout failed the mission.");
    }
  }, 2500);
});

// Using Promise.all
Promise.all([
  netherWartScout,
  blazePowderScout,
  ghastTearScout,
])
  .then((results) => {
    console.log("Ultimate potion brewed!", results);
  })
  .catch((error) => {
    console.error("💀 Potion corrupted!");
    console.error("Report", error);
  });
```

Console output:

```shell
Nether Wart scout dispatched...
Blaze Powder scout dispatched...
Ghast Tear scout dispatched...
💀 Potion corrupted!
Report Failure: Ghast Tear scout failed the mission.
```

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/458d9097-b52e-4390-9289-483bc6df2ac7.png)

Here our **Ghast Tear** scout failed hence we got this output

But if we did everything correctly and the `missionSuccess = true` was there for every promise, the output will be:

```shell
Nether Wart scout dispatched...
Blaze Powder scout dispatched...
Ghast Tear scout dispatched...
Ultimate potion brewed! [
  'Success: Nether Wart secured.',
  'Success: Blaze Powder secured.',
  'Success: Ghast Tear secured.'
]
```

Getting an **Array** of resolved Promises.

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/4423b168-fc7a-408c-9a5f-d4b402123598.webp)

---

### 2. `Promise.allSettled()` The Full Scout Report

Now, our commander "Krrish" requires a comprehensive report of the mission. Even if some scouts failed, we need a detailed account to ensure appropriate measures are taken for next missions.

This is where `Promise.allSettled()` help us get a report

In the above code we will simply use `.allSettled()` instead of `.all()` :

```javascript
Promise.allSettled([
  netherWartScout,
  blazePowderScout,
  ghastTearScout,
]).then((results) => {
  console.log("Full Scout Report:", results);
});
```

Console output:

```shell
Nether Wart scout dispatched...
Blaze Powder scout dispatched...
Ghast Tear scout dispatched...
Full Scout Report: [
  { status: 'fulfilled', value: 'Success: Nether Wart secured.' },
  { status: 'fulfilled', value: 'Success: Blaze Powder secured.' },
  {
    status: 'rejected',
    reason: 'Failure: Ghast Tear scout failed the mission.'
  }
]
```

Obtaining an **array of objects** that include the status and outcomes of each promise, whether they are resolved or rejected.

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/0192e8c4-0aae-4d25-a9ca-c512dd8cd972.jpg)

---

### 3.`Promise.any()` First Successful Scout Wins

**Commander’s Strategy**

The Chai Clan needs **Blaze Powder urgently**.

Instead of trusting a single scout, the commander sends multiple scouts.

But this time, the rule is different:

> “I don’t care who succeeds ... just bring me ONE successful report.”

This is exactly how `Promise.any()` behaves.

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/4b374311-72ae-418f-b543-f22d1b8038ae.gif)

Let's write a Promise code with two scouts, waiting for any one Promise to resolve:

```javascript
// Scout 1 for Blaze Powder
const blazeScout1 = new Promise((resolve, reject) => {
  console.log("Blaze Powder Scout 1 dispatched...");
  const missionSuccess = true;

  setTimeout(() => {
    if (missionSuccess) {
      resolve("Success - Blaze Powder secured by Scout 1.");
    } else {
      reject("Failure - Scout 1 failed the mission.");
    }
  }, 3000);
});

// Scout 2 for Blaze Powder
const blazeScout2 = new Promise((resolve, reject) => {
  console.log("Blaze Powder Scout 2 dispatched...");
  const missionSuccess = true;

  setTimeout(() => {
    if (missionSuccess) {
      resolve("Success - Blaze Powder secured by Scout 2.");
    } else {
      reject("Failure - Scout 2 failed the mission.");
    }
  }, 1500);
});

// Promise.any — first one to RESOLVE wins
Promise.any([blazeScout1, blazeScout2])
  .then((result) => {
    console.log("Blaze Powder obtained!", result);
  })
  .catch((error) => {
    console.error("Both scouts failed!", error);
  });
```

Since Scout 2 had a duration of 1.5 seconds (1500 milliseconds), we received the success message from him, resolving the Promise.

Console output:

```shell
Blaze Powder Scout 1 dispatched...
Blaze Powder Scout 2 dispatched...
Blaze Powder obtained! Success - Blaze Powder secured by Scout 2.
```

---

### 4.`Promise.race()` Scout vs The Clock

Sometimes the Chai Clan cannot afford to wait forever.

While a scout is sent into the Nether to grind a **Ghast Tear**, the commander also activates a **timeout guard**.

The rule is simple:

> Whichever finishes first decides the outcome.

This is exactly how `Promise.race()` behaves.

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/bf26c0ec-2927-4c63-86da-f4b154283c23.gif)

---

**What Happens Here**

- The Ghast Tear scout will succeed in **3 seconds**
    
- The timeout guard will fail in **2 seconds**
    
- Since the timeout finishes first…
    

> 💀 the entire operation fails early

**Important:** `Promise.race()` does NOT care about success ... only speed.

Lets write the code for this situation:

```javascript
// Scout for Ghast Tear
const ghastTearScout = new Promise((resolve, reject) => {
  console.log("Ghast Tear scout dispatched into the Nether...");
  const missionSuccess = true;

  setTimeout(() => {
    if (missionSuccess) {
      resolve("Success - Ghast Tear obtained by scout.");
    } else {
      reject("Failure - Scout could not obtain Ghast Tear.");
    }
  }, 3000); // 3 seconds
});

// timeout guard
const expeditionTimeout = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Failure - Expedition timed out. Scout took too long in the Nether.");
  }, 2000); // 2 seconds
});

// Promise.race — scout vs the clock
Promise.race([ghastTearScout, expeditionTimeout])
  .then((result) => {
    console.log("Potion brewing can begin!", result);
  })
  .catch((error) => {
    console.error("Expedition failed!", error);
  });
```

Console output:

```shell
Ghast Tear scout dispatched into the Nether...
Expedition failed! Failure - Expedition timed out. Scout took too long in the Nether.
```

**Key Insight**

`Promise.race()` is indifferent to who succeeds.

It only matters who finishes **first**.

Even though the scout **would have succeeded** in 3 seconds, the **mission failed** at 2 seconds.

---

## The Alchemist's Cheat Sheet

| Situation                      | Use                    |
| ------------------------------ | ---------------------- |
| Need every scout to succeed    | `Promise.all()`        |
| Need full report of all scouts | `Promise.allSettled()` |
| Fastest result wins            | `Promise.race()`       |
| First success is enough        | `Promise.any()`        |

I hope you now understand the role of **Promises and Combinators**. I used the Minecraft example because it closely aligns with my understanding...

Chai clan successfully made the ultimate potions and won the match...

![](https://cdn.hashnode.com/uploads/covers/6950f5ef28c8359b6b890933/bac8503c-5ba1-4ae5-8e0b-293dee8249a1.webp)

**Thank You for reading!**