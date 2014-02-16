# jQuery Conference 2014
[@jqcon](http://twitter.com/jqcon)


## Readme
### <span class="jqc-alert jqc-danger">All the talks were video recorded, they are __NOT__ up on the [site](http://events.jquery.org/2014/san-diego/) yet but they will be soon - some of the talks are not worth reading the slides without the video, I will update this page when the videos become available, ETA 2 weeks.
oh and I gave each talk (__not the speakers, as I am in no position to do so__) a *totally opinionated letter-grade (A+/-,B+/-)* based on technicality importance, level and how funny it was, I'm probably wrong, but that's my opinion

<br>

## Talks attended

<br>

### The State of jQuery (A-) <a href="http://www.slideshare.net/dmethvin/j-query-conference-san-diego-web-performance-31143457"><i class="fa fa-files-o"></i></a>
##### with Dave Methvin <a href="http://twitter/davemethvin"><i class="fa fa-twitter"></i></a> <a href="http://github.com/demethvin"><i class="fa fa-github-alt"></i></a> <a href="mailto:dave@jquery.com"><i class="fa fa-envelope-o"></i></a>
#### Abstract
> jQuery continues to evolve to meet the needs of web developers. House cleaning in jQuery Core 1.9 and 2.0 has whittled away the fat and cruft from the API, plus the ability to create custom builds means you don't need to load what you don't use. When performance problems arise, however, it's important to understand how your use of jQuery can affect performance. We'll bust a few myths about what makes web pages slow and use some readily available tools to identify the real performance

#### My notes:

* to get 60 frames/second browsers calculate and render in a rate of 16ms/frame, anything slower than that is visible to the user; use the dev tool to figure out what's slowing it down, examples:
* don't use `:visible` and `:hidden` selectors
* avoid `$el.width(), outerWidth(), height(), etc.` as they trigger recalculation of styles
* if your assets are injected, meaning the browser cannot prefetch them, but you know the resource urls, use something like `<link rel="prefetch" href="stripes.jpg">` and `<link rel="dns-prefetch" href="www.googleanalytics.com">`
* minimize document-wide style-class changes, use `data-*` attrs instead, or the `$el.data()`
* checkout IE11 dev tools, yes __IE__, pretty nice on figuring out bottlenecks, with nested iteration counts and such

<br>

### Measpace Chat - The Future Meat (B-) <a href="https://dl.dropboxusercontent.com/u/1913694/jquery-san-diego/index.html"><i class="fa fa-files-o"></i></a>
##### with Edna Piranha <a href="https://twitter.com/ednapiranha"><i class="fa fa-twitter"></i></a> <a href="https://github.com/ednapiranha"><i class="fa fa-github-alt"></i></a> <a href="mailto:jen@meatspac.es"><i class="fa fa-envelope-o"></i></a>
> [chat.meatspac.es](https://chat.meatspac.es/) is a chat app that mixes Websockets, webRTC, animated GIFs.
Creator Edna Piranha will talk about how it came together, the months-long beta test, the app's sudden popularity, as well as expanding to support third-party APIs and the growing Meatspace ecosystem.

#### My notes:

* Pretty cool open source app, can use it at work? pl0x!
* She said they are generating GIF client side, that's neat, didn't say how, gotta see the [source](https://github.com/meatspaces/meatspace-chat)
* no technical knowledge benefit as the speaker didn't dive in the code, but if you want to learn about __websockets__ and __webRTC__, that's good, *they are the future*, and pretty cool, google them

<br>

### A Little This, a Little _that: Understanding Scope in JavaScript (A-) <a href="http://davidql.github.io/scope_talk"><i class="fa fa-files-o"></i></a>
##### with David Aragon <a href="https://twitter.com/davidmaragon"><i class="fa fa-twitter"></i></a> <a href="https://github.com/davidql"><i class="fa fa-github-alt"></i></a>
#### Abstract
> Scope is one of the most critical concepts in JavaScript, but even seasoned front-end developers have trouble with the the meaning of `this`. It doesn’t have to be this way. Once you learn the few simple rules that govern JavaScript scope, your code will become more precise and flexible. Let’s take a deep dive into what scoping means in JavaScript. In this talk you’ll learn why scope is critical to applications running in a browser environment, what the heck all this talk of `this` and `_that` is about, as well as how to avoid some pitfalls even the experts make.

#### My notes:

* think of `this` as the subject of the sentence
* stuff that you should already know
  * `a = 1` without a `var` leaks to the global scope
  * no block scope in JS, just functional
  * use `fn.bind()`, `$.proxy()`, `_.bind()`, `fn.apply` or `fn.call` to pass a context (the last 2 are the fastest)
  * `new fn()` means new scope
  * use [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression)s to contain the scope
*  ES6 stuff, don't use in production yet, browser support is very limited
  * `let` keyword within a block (`if`, `else`, `for`, etc.) scopes the variable within the block example:
```
var a = 1;
if (true) {
    let a = 2;
}
console.log(a); // prints 1
```
  * fat arrow functions inherits the scope, kinda like using bind(this) so now
```javascript
// say you want to set a timeout before the class add
// instead of doing this,
$('.btn').click(function(){
    var _that = this;
    setTimeout(function(){
        $(_that).addClass('clicked');
    }, 1000);
});
// you can do this
$('.btn').click(() => {
    setTimeout(() => {
        // 'this' is still the .btn element, it was inherited
        $(this).addClass('clicked');
    }, 1000);
});
```

<br>

### Digging, Debugging (A) <a href="http://www.randomthink.net/presentations/jqcon-san-diego-2014-digging-debugging/presentation/"><i class="fa fa-files-o"></i></a>
##### with Brian Arnold <a href="https://twitter.com/brianarn"><i class="fa fa-twitter"></i></a> <a href="https://github.com/brianarn"><i class="fa fa-github-alt"></i></a> <a href="mailto:brianarn@gmail.com"><i class="fa fa-envelope-o"></i></a>
#### Abstract
> You're putting your application together, but now you're getting some sort of weird errors, and you're not exactly sure where the heck to start looking. Did you mess something up, or are you bringing in some plugin that might be broken in a weird way that only you've hit? Having spent the last few years debugging code that he didn't write, Brian will show you how to dig into code using the latest developer tools in today's browsers in order to find and fix (or at least isolate) what's broken. We'll be using the console along with DOM inspection and source viewing to find all the bugs!"

#### My notes:

* in the dev tools, this is a list I compiled of the stuff new to me, for the whole list, wait for the video
  * `$0` is the last inspected element
  * `inspect(elmement)` to focus on a element, i.e `inspect($0);`
  * `copy(JSON.stringify(someObject, null, '    '));` to copy an object as JSON to your clipboard
  * `console.time()` and `console.timeEnd()` instead of creating dates and doing diffs
  * `dir(element)` to make it a JS object, which you can collpase and expand in the console
  * while debugging with breakpoints, you can press and hold play button to ignore all breakpoints for a 1/2 second, say you figured out kinda what to do and you don't want to click play multiple times to continue execution
  * `console.group()` and `console.groupEnd()` to aggregate related and nested logs within functions and nested stack calls
  * DOM breakpoints are awesome, right click > break on > choose one
  * cmd+o to search within sources
  * XHR breakpointsa and Event Listeners should be used more often
  * conditional breakpoints, right click on a breakpoint, insert code, as long as it's *truthy* it will execute within the relevant scope
  * You can tell chrome to NOT to step-into sources that you don't care about while debugging, pretty neat, chome://flags > Enable Developer Tools experiments > relaunch chrome > open dev tools > click on the Gear icon > Experiments > Enable frameworks debugging support > close then reopen dev tools > gear icon> General > enable Skip stepping through sources with particular names > insert a pattern i.e `/externa/libs/jquery` or whatever regexp in there, and now Chrome will not step into jquery specific functions, but rather step over, unless the callbacks source live somewhere else, like your code. try it.

<br>

### Effective jQuery - Patterns for maintainability and performance (A-) <a href="http://jzaefferer.github.io/effective-jquery/"><i class="fa fa-files-o"></i></a>
##### with Jörn Zaefferer <a href="https://twitter.com/bassistance"><i class="fa fa-twitter"></i></a> <a href="https://github.com/jzaefferer"><i class="fa fa-github-alt"></i></a> <a href="mailto:joern.zaefferer@gmail.com"><i class="fa fa-envelope-o"></i></a>
#### Abstract
> Most people have a driver's license, but very few are race car drivers. Every web developer knows jQuery, but very few make use of all its potential. This talk will cover some basics from a new perspective, to make more effective use of the finely tuned library we all seem to know so well. For example, how to structure your markup, CSS and JS for them to work well together while promoting maintainability of all three; how to use CSS3 transitions with fallbacks; how to deal with bad APIs with Deferreds; and more.

#### My notes:

* smart dude, talk was pretty good for a junior, I didn't take notes, review the slides or wait for the video

<br />

### Hacking Front-End Apps (A) <a href="https://speakerdeck.com/slexaxton/hacking-front-end-apps"><i class="fa fa-files-o"></i></a>
##### with Alex Sexton <a href="https://twitter.com/slexaxton"><i class="fa fa-twitter"></i></a> <a href="https://github.com/SlexAxton"><i class="fa fa-github-alt"></i></a> <a href="mailto:AlexSexton@gmail.com"><i class="fa fa-envelope-o"></i></a>
#### Abstract
> Writing web applications is fun. Getting hacked is not fun. This talk will walk through several different ways that websites, especially front-end heavy ones, are being hacked. It will cover cross site scripting, and resource forgery as well as introduce some protective measures for writing secure web apps.

#### My notes, most of them are just gibberish, was pretty quick

* html() vs text(), handlebars syntax: `{{}}` vs `{{{}}}`
* [Evercookie](https://github.com/samyk/evercookie) is sick
* [whitespace attack, billy hoffman](http://searchsecurity.techtarget.com/news/1333757/Billy-Hoffman-on-AJAX-security-and-browser-attacks)
* CSS hacks :visited, to detect which sites the user visited, look up htc hacks also
* password timing attacks, check everything [1,2,3,4] [5,6,7,8]
* requestAnimationFrame + :visited =
    * back to timing issue, link: 16ms, visitedLink: 60ms
* some resources: [youprobablyshouldusercors.thumblr.com](http://youprobablyshouldusercors.thumblr.com), [enable-cors.org](http://enable-cors.org)
* use athentication when ajax
* <span class="jqc-danger">very neat solution:</span> [__Content-Security-Policy__](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)


### Real World Responsive Design Projects and Patterns (B+) <a href="https://www.dropbox.com/s/aj2dzk33nr55ccc/Responsive%20jQuery%20Patterns.pdf"><i class="fa fa-files-o"></i></a>
##### with Catherine Farman <a href="https://twitter.com/cfarm"><i class="fa fa-twitter"></i></a> <a href="https://github.com/cfarm"><i class="fa fa-github-alt"></i></a> <a href="mailto:cat@cfarman.com"><i class="fa fa-envelope-o"></i></a>
#### Abstract
> Developing responsive websites has become a core service for web design agencies, but presents a challenge in delivering nimble, lean websites that are beautiful, usable and functional at every screen size. Through client case studies, learn real-world jQuery solutions we use at Happy Cog to solve the most common responsive design challenges.

#### My notes

* everything I noted is already in the slides

<br >

### Fun with Speech (B) <a href="http://slid.es/jdimm/fun-with-speech"><i class="fa fa-files-o"></i></a>
##### with John Dimm <a href="https://twitter.com/jdimm"><i class="fa fa-twitter"></i></a> <a href="https://github.com/johndimm"><i class="fa fa-github-alt"></i></a> <a href="mailto:jdimm@yahoo.com"><i class="fa fa-envelope-o"></i></a>

#### Abstract
> Create hands-free interfaces using new HTML5 speech API's. We will look inside two examples. TalkShow is an exercise in ambient computing, using the Web Speech API and Named Entity Recognition -- it eavesdrops on your conversations and shows images of things you mention. The Translating Telephone is a web app for multilingual conference calls, combining the Web Speech API and Web Real Time Communicaton (WebRTC) with text-to-speech and online translation services.

#### My notes

* cool demos using Chrome's Web Speech API, Bing translation API, and webRTC, no tehnical knowledge

<br >

### Promises, Promises: Unlocking the Power of jQuery's Deferreds (A-) <a href="http://www.iterateme.com/blog/enclosures/jQueryPromisesAndDeferreds-jQuerySanDiego2014.pdf"><i class="fa fa-files-o"></i></a>
##### with Brian Klaas <a href="https://twitter.com/brian_klaas"><i class="fa fa-twitter"></i></a> <a href="https://github.com/brianklaas"><i class="fa fa-github-alt"></i></a>

#### Abstract
> Managing the order in which asynchronous callbacks in JavaScript occur can be a nasty business. Without a lot of overhead and management, you're never quite sure that a certain callback has succeeded or failed. One technique for handling this problem that has gained a lot of traction in the past year is to use deferreds and promises. In fact, if you're using jQuery 1.6 or later and making Ajax calls, you're already using deferreds and promises.

> In this session, we'll look at how deferreds and promises bring order to the chaos of multiple asynchronous JavaScript calls -- often known as ""callback hell."" We'll start by understanding the problem of asynchronous work in JavaScript. The solution to this problem that jQuery provides are promises. A brief explanation of promises and deferreds will then be covered to give you a solid understanding of this key construct in JavaScript application development. We'll then look at the basics of both promises and deferreds in jQuery and then move on to see how you can leverage promises when making network requests, animating a page, loading content on the fly, waiting for long-running requests to complete, and more. Finally, we'll wrap up with a brief look at promises in other environments, like Node.js, and how promises are being integrated into the core JavaScript stack across browsers and virtual machines.

#### My notes - not much as I am pretty familiar with deferreds

* `$.ajax()`'s `{success: .., error: .. }` are deprecated, and will be removed in the future, probably in jquery 3.0 i dont know, I doubt it's anytime soon.
* should use promises in animation as well, `$.when(fadeSomethingOut, fadeSomethingIn).then(function(){console.log('boom -done')});`
* there is an html5 `<progress>` tag which you can use with something like `promise.progress()`

<br >

### Transforming front-end Disaster Code™ into a Maintainable Masterpiece (A) <a href="http://www.slideshare.net/dangribbin/transforming-frontend-disaster-code"><i class="fa fa-files-o"></i></a>
##### with Dan Gribbin <a href="https://twitter.com/dangribbin"><i class="fa fa-twitter"></i></a> <a href="mailto:dgribbin@me.com"><i class="fa fa-envelope-o"></i></a>

#### Abstract
> For 5 weeks, I worked with a small team of developers to refactor the front-end of a moderately trafficked website for a ubiquitous international brand. The project’s initial launch deadlines were tight, and sacrifices were made to get the site out the door. Months down the road as features were added and changed, performance began taking a major hit, with page load times reaching 15 seconds. Some of this was attributed to poor front-end practices. Implementing new features became a somewhat of a nightmare, and morale on the team dropped. Given the opportunity to refactor and rework a portion of the site, we planned and worked for several weeks. In the end, we shaved 75% off page load times, eliminated a ton of technical debt, and set future work up for success by modularizing our code. This talk will cover some of that process. What worked for us, what didn't, how schedules and priorities between developers and clients can conflict, and how to make that better. We’ll also cover several things you can do right now to clean up your front-end code and optimize for performance.

#### My notes

* wait for the video, it's high level non-technical talk, but a good one. Managers should watch it too.

<br/>

### jQuery UI: Behind the Scenes (A-) (no slides)
##### with Scott Gonzalez <a href="https://twitter.com/scott_gonzalez"><i class="fa fa-twitter"></i></a> <a href="https://github.com/scottgonzalez"><i class="fa fa-github-alt"></i></a> <a href="mailto:scott.gonzalez@gmail.com"><i class="fa fa-envelope-o"></i></a>
#### Abstract
> jQuery UI is more than just a collection of JavaScript widgets. It's a project that aims to discover, create, and deliver experiences that excel in usability, accessibility, and ease of implementation. Join us as we take a behind-the-scenes look at the various projects and communities that are involved in creating the world's most popular JavaScript UI library.

#### My notes

* wait for the video, high level non-technical talk.
* jquery and jquery ui team strcuture
* contribution process, docs, etc.
* talked about how jquery and polymer are working to solve pointer events on touch devices

<br/>

### JavaScript and the new Virtual Machine(s) <span class="jqc-danger">(A++)</span> (no slides)
##### with Scott Hanselman <a href="https://twitter.com/shanselman"><i class="fa fa-twitter"></i></a> <a href="https://github.com/shanselman"><i class="fa fa-github-alt"></i></a> <a href="mailto:scott@hanselman.com"><i class="fa fa-envelope-o"></i></a>
#### Abstract
> How does the pervasiveness of JavaScript on the client change how we architect applications? We can create hundreds virtual machines in the cloud, but we are using the millions of visual machines that visit our sites every day? Suddenly we are scripting against thousands of Virtual Machines from the command line while creating things today with JavaScript in the browser that were impossible yesterday. LiveScript becomes JavaScript becomes ES6 and now we’re compiling C++ to JavaScript. Join Scott Hanselman as he explores the relationship between the Cloud and the Browser, many Languages and one Language, how it might all fit together and what comes next.

#### My notes

* wait for the video, seriously, it's good

<br/>

### Accessibility is a Feature You Can Build - A Guided Tour of a11y Basics (A) <a href="http://www.slideshare.net/mpiotrowicz/accessibility-a-feature-you-can-build"><i class="fa fa-files-o"></i></a>
##### with Monika Piotrowicz <a href="https://twitter.com/monsika"><i class="fa fa-twitter"></i></a> <a href="https://github.com/mpiotrowicz"><i class="fa fa-github-alt"></i></a>

#### Abstract
> Making a website or application accessible can be an overwhelming task for a lot of developers, especially if you’re not already an expert. Looking at all the complex regulations, specs, and articles on the topic, where should we begin? In this talk, I’ll walk through some of the challenges I faced when working through accessibility requirements for the first time. I’ll cover basic considerations, how design and content fit in, testing advice, and introduce Aria practices. Attendees will leave knowing some of the practical constraints and tools that can make a big difference for users, and will have a starting point of how to make their next project more accessible. By thinking about accessibility as we would any other feature, it becomes less of a scary unknown requirement, and instead something we can plan for and implement to create a more open web for all

#### My notes

* use labels, for, alt, tabindex
* relevant aria attributes (main, banner, navigation, search, complimentary, landmark, article, tablist, combox etc.)
* see slides for more info and resources

<br/>

### Unit Testing a Client-server AMD Code Base (A) (no slides; demo)
##### with Jason Strimpel <a href="https://twitter.com/StrimpelJason"><i class="fa fa-twitter"></i></a> <a href="https://github.com/jstrimpel"><i class="fa fa-github-alt"></i></a> <a href="mailto:jstrimpel@gmail.com"><i class="fa fa-envelope-o"></i></a>

#### Abstract
> Unit testing is never easy, but it is a necessary evil in software development. Unit testing an AMD code base is even more difficult. A few questions that quickly arise are – How do I mock dependencies? How do I ensure my paths have been configured? How do I generate coverage reports? This talk will answer all these questions and much more.

#### My notes

* walmartlabs built `grunt-castle`, a `grunt` plugin, pretty nice tool to absctract all the unit testing from a-z in a single place, with browser and server testing, it's not open source yet, but will be in the upcoming weeks.


<br/>

### Globalize ♥ CLDR (A-) (no slides; yet)
##### with Rafael Xavier <a href="https://twitter.com/rxaviers"><i class="fa fa-twitter"></i></a> <a href="https://github.com/rxaviers"><i class="fa fa-github-alt"></i></a> <a href="mailto:jstrimpel@gmail.com"><i class="fa fa-envelope-o"></i></a>

#### Abstract
> Internationalization is the process that provides users with a localized experience that matches their own cultural and linguistic expectations. Learn how jQuery is improving its Globalize project to leverage the official CLDR JSON data, allow users to load as much or as little data as they need, avoid duplicating data if using multiple i18n libraries that leverage CLDR, and that run in browsers or node.js.

#### My notes

* https://github.com/rxaviers/cldr
* https://github.com/jquery/globalize
* [unicode.org](http://unicode.org)

<br/>

### jQuery: Now Ideal For Low Bandwidth (A) (no slides; yet)
##### with Timmy Willison <a href="https://twitter.com/timmywil"><i class="fa fa-twitter"></i></a> <a href="https://github.com/timmywil"><i class="fa fa-github-alt"></i></a>

#### Abstract
> Prolonged load times can avert users from your beautiful site off to those other ghastly but fast-loading contrivances. Even if your site renders like a wildebeest escaping its hunter on your souped-up Mackbook Pro, the size of your dependencies can still be a concern for other devices on slower networks. This very concern has led to the fabrication of tiny javascript libraries which are slender phantoms of the amply-tested. And many third-party libraries require jQuery unnecessarily and have yet to realise they have the potential to slim down their dependencies. We'll talk about the recent changes to the jQuery source and how you can personalise jQuery to fit into that dress

#### My notes

* pretty much now you can choose module to skip, or specifically include in your custom jquery build

```
# examples

# ajax is the larges module, if you don't use it, leave it out
grunt custom:-ajax

# take out the effect module, use css, take out depracated stuff, and queue, do you even use the queue ?
grunt custom:-effect,-deprecated,-queue

grunt custom:*:deferred
grunt build:*:attributes/classes
```
* interesting peice of info:
```
jQuery Version | Size (minified, gziped)
1.4.4          |    27.1kb
1.5.2          |    29.9kb
1.7.2          |    33.6kb
1.9.1          |    32.8kb
1.10.2         |    32.8kb
1.11.0         |    33.3kb
2.1.0          |    29.3kb
```

<br/>

### JS Legos: Reusable UI Patterns in JavaScript (A) <a href="http://tybenz.com/presentation-js-legos/#/"><i class="fa fa-files-o"></i></a>
##### with Tyler Benziger <a href="https://twitter.com/tybenz"><i class="fa fa-twitter"></i></a> <a href="https://github.com/tybenz"><i class="fa fa-github-alt"></i></a>

#### Abstract
> This talk will cover how to effectively organize and compose UI components in JavaScript, HTML, and CSS, as well as give an overview of identifying UI patterns. We'll cover some common UI components and identify similarities between them. This sheds light on the construction of these components and how to effectively decouple code so that it can be reused effectively across projects.

> With a solid understanding of UI patterns, and best-practices for reusable code, rolling your own UI components is awesome and enjoyable. And for those who don't have to time to write a component framework from the ground-up this talk will give an excellent outline of what to look for in 3rd party components.

#### My notes

* good talk, watch the video
* neat, modular UI component built by Adobe, but too bad it's not open sourced :/


<br/>

### Mobile Web Compatibility on the World Wide Web (A) <a href="https://miketaylr.com/pres/jquery-sd/"><i class="fa fa-files-o"></i></a>
##### with Mike Taylor <a href="https://twitter.com/miketaylr"><i class="fa fa-twitter"></i></a> <a href="hhttps://github.com/miketaylr"><i class="fa fa-github-alt"></i></a>  <a href="mailto:miket@mozilla.com"><i class="fa fa-envelope-o"></i></a>

#### Abstract
> In this talk we'll take a look at just how messed up the world wide web can be, ranging from broken web browsers to broken web servers and everything in between. We'll also look at how jQuery (and jQuery Mobile) APIs, often working around these various busted components, have helped to shape the future of a more compatible web. Come prepared to hear some battle tales and learn some low-level details about the web stack works, despite being so broken.

#### My notes

* good talk, but what intrested me the most was why __you still need jquery__; [that's a list](https://etherpad.mozilla.org/jquery-browser-bug-analysis) of a lot of the bug jquery works around for us, despite that all the Modern browsers are matching standards, or trying to, along with, still, injecting their own behaviors, rules and apis

## For the rest of the talks
see http://events.jquery.org/2014/san-diego/








